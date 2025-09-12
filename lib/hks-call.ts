const HKS_URL = 'https://hks.hal.gov.tr/WebServices/BildirimService.svc';
const SOAP_ACTION =
  'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBildirimciyeYapilanBildirimListesi';

const USERNAME = process.env.HKS_USERNAME!;
const PASSWORD = process.env.HKS_PASSWORD!;
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD!; // HKS dokümanındaki "ServicePassword"

function fmt(dt: Date) {
  // WCF'ye "yyyy-MM-ddTHH:mm:ss" gönder (Z'siz)
  const pad = (n:number)=>String(n).padStart(2,'0');
  return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
}

function buildEnvelope({
  BaslangicTarihi,
  BitisTarihi,
  KunyeNo = 0,
  KunyeTuru = 1,
  KalanMiktariSifirdanBuyukOlanlar = true,
  Sifat,
}: {
  BaslangicTarihi: Date;
  BitisTarihi: Date;
  KunyeNo?: number | string;
  KunyeTuru?: number;
  KalanMiktariSifirdanBuyukOlanlar?: boolean;
  Sifat?: number | string;
}) {
  // DİKKAT: wrapper + namespace'ler kritik. a: prefix'i ServiceContract için şart.
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_BildirimSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:BaslangicTarihi>${fmt(BaslangicTarihi)}</a:BaslangicTarihi>
        <a:BitisTarihi>${fmt(BitisTarihi)}</a:BitisTarihi>
        <a:KalanMiktariSifirdanBuyukOlanlar>${KalanMiktariSifirdanBuyukOlanlar}</a:KalanMiktariSifirdanBuyukOlanlar>
        <a:KunyeNo>${KunyeNo}</a:KunyeNo>
        <a:KunyeTuru>${KunyeTuru}</a:KunyeTuru>
        ${Sifat ? `<a:Sifat>${Sifat}</a:Sifat>` : ''}
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_BildirimSorguIstek>
  </soap:Body>
</soap:Envelope>`;
}

function buildBildirimciyeEnvelope({
  BaslangicTarihi,
  BitisTarihi,
  KunyeNo = 0,
  Sifat,
}: {
  BaslangicTarihi: Date;
  BitisTarihi: Date;
  KunyeNo?: number | string;
  Sifat?: number | string;
}) {
  // BildirimciyeYapilanBildirimListesi için özel envelope
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_BildirimSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:BaslangicTarihi>${fmt(BaslangicTarihi)}</a:BaslangicTarihi>
        <a:BitisTarihi>${fmt(BitisTarihi)}</a:BitisTarihi>
        <a:KunyeNo>${KunyeNo}</a:KunyeNo>
        <a:KunyeTuru>1</a:KunyeTuru>
        ${Sifat ? `<a:Sifat>${Sifat}</a:Sifat>` : ''}
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_BildirimSorguIstek>
  </soap:Body>
</soap:Envelope>`;
}

export async function callBildirimciyeYapilanBildirimListesi(params: {
  BaslangicTarihi: Date;
  BitisTarihi: Date;
  KunyeNo?: number | string;
  Sifat?: number | string;
}) {
  const envelope = buildBildirimciyeEnvelope(params);
  const res = await fetch(HKS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: SOAP_ACTION,
    },
    body: envelope,
  });
  if (!res.ok) {
    const t = await res.text().catch(()=>'');
    throw new Error(`HTTP ${res.status} ${res.statusText} ${t.slice(0,200)}`);
  }
  return res.text();
}
