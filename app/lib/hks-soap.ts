'use server';
import { XMLParser } from 'fast-xml-parser';

const HKS = {
  bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
  genelUrl: 'https://hks.hal.gov.tr/WebServices/GenelService.svc',
  ns: 'http://www.gtb.gov.tr//WebServices',
  u: process.env.HKS_USERNAME ?? '',
  p: process.env.HKS_PASSWORD ?? '',
  sp: process.env.HKS_SERVICE_PASSWORD ?? '',
};

// IBildirimService tarafı (WCF Order=0..3)
const ORDER: Record<string, string[]> = {
  // Bildirim service:
  BildirimServisBildirimTurleri: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisSifatListesi: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisBelgeTipleriListesi: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisReferansKunyeler: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisKayitliKisiSorgu: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisTopluKunye: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisBildirimEtiket: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisBildirimcininYaptigiBildirimListesi: ['Istek','Password','ServicePassword','UserName'],
  BildirimServisBildirimciyeYapilanBildirimListesi: ['Istek','Password','ServicePassword','UserName'],

  // GenelService tarafında genelde User/Pass önde olabiliyor; emin değilsek Bildirim'deki sırayı kullanalım:
  GenelServisIller: ['Istek','Password','ServicePassword','UserName'],
  
  // SOAP body element names:
  BaseRequestMessageOf_BildirimSorguIstek: ['Istek','Password','ServicePassword','UserName'],
  BaseRequestMessageOf_IllerIstek: ['Istek','Password','ServicePassword','UserName'],
  BaseRequestMessageOf_BildirimTurleriIstek: ['Istek','Password','ServicePassword','UserName'],
};

function toXml(obj: any): string {
  if (obj == null) return '';
  if (typeof obj !== 'object') return String(obj);
  return Object.keys(obj)
    .map(k => `<tns:${k}>${toXml(obj[k])}</tns:${k}>`)
    .join('');
}

export async function buildSoapEnvelope(method: string, parts: Record<string, any>) {
  const order = ORDER[method] ?? ['Istek','Password','ServicePassword','UserName'];
  const body = order
    .map(name => (name in parts) ? `<tns:${name}>${toXml(parts[name])}</tns:${name}>` : '')
    .join('');

  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${HKS.ns}">
  <soap:Body>
    <tns:${method}>
      ${body}
    </tns:${method}>
  </soap:Body>
</soap:Envelope>`;
}

export async function soapAction(iface: 'IGenelService'|'IBildirimService', method: string) {
  return `${HKS.ns}/${iface}/${method}`;
}

// Bu servis iki farklı shape ile görülebilir; ikisini de destekle:
export async function parseSoap(raw: string, method: string) {
  const parser = new XMLParser({ 
    ignoreAttributes: false, 
    attributeNamePrefix: '@_', 
    textNodeName: '#text',
    parseAttributeValue: false,
    parseTagValue: false
  });
  const parsed = parser.parse(raw);
  const env = parsed['s:Envelope'] || parsed['soap:Envelope'] || parsed['Envelope'];
  const body = env?.['s:Body'] || env?.['soap:Body'] || env?.['Body'];
  if (!body) return { ok:false, error:'NO_SOAP_BODY', raw };

  // 1) WCF tarzı: <MethodResponse><HataKodlari/><IslemKodu/><Sonuc/></MethodResponse>
  // HKS uses BaseResponseMessageOf_* pattern
  const respKey = Object.keys(body).find(k => 
    k.endsWith(`${method}Response`) || 
    k.includes('Response') ||
    k.includes('BaseResponseMessageOf_') ||
    k.includes('Cevap') ||
    k.includes('BildirimSorguCevap') || // BildirimServisBildirimciyeYapilanBildirimListesi için
    k.includes('BaseResponseMessageOf_BildirimSorguCevap') // Tam isim
  );
  const resp = respKey ? body[respKey] : null;

  if (resp && (resp.HataKodlari !== undefined || resp.IslemKodu !== undefined || resp.Sonuc !== undefined)) {
    return {
      ok:true,
      type:'WCF',
      hataKodlari: resp.HataKodlari ?? null,
      islemKodu: resp.IslemKodu ?? null,
      sonuc: resp.Sonuc ?? null,
      raw,
    };
  }

  // 2) Alternatif eski pattern: <MethodResponse><MethodResult>...</MethodResult></MethodResponse>
  const alt = resp && Object.keys(resp).find(k => k.endsWith('Result'));
  if (resp && alt) {
    return { ok:true, type:'RESULT', result: resp[alt], raw };
  }

  return { ok:false, error:'UNRECOGNIZED_RESPONSE', raw };
}