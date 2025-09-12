import 'server-only';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const HKS_CONFIG = {
      bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
      username: process.env.HKS_USERNAME ?? '',
      password: process.env.HKS_PASSWORD ?? '',
      servicePassword: process.env.HKS_SERVICE_PASSWORD ?? '',
    };

    if (!HKS_CONFIG.username || !HKS_CONFIG.password || !HKS_CONFIG.servicePassword) {
      return Response.json({ ok: false, error: 'ENV_MISSING' }, { status: 500 });
    }

    // WSDL referansına göre doğru SOAP envelope
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_BelgeTipleriIstek xmlns="http://www.gtb.gov.tr//WebServices">
      <Istek xmlns="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
        <BelgeTipleriIstek xmlns="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
        </BelgeTipleriIstek>
      </Istek>
      <Password>${HKS_CONFIG.password}</Password>
      <ServicePassword>${HKS_CONFIG.servicePassword}</ServicePassword>
      <UserName>${HKS_CONFIG.username}</UserName>
    </BaseRequestMessageOf_BelgeTipleriIstek>
  </soap:Body>
</soap:Envelope>`;
    
    const r = await fetch(HKS_CONFIG.bildirimUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisBelgeTipleriListesi',
      },
      body: envelope,
    });

    const txt = await r.text();
    if (!r.ok) return Response.json({ ok: false, status: r.status, raw: txt.slice(0, 2000) }, { status: 500 });

    // XML parsing
    const { XMLParser } = await import('fast-xml-parser');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: true,
    });
    
    const parsed = parser.parse(txt);
    const soapEnvelope = parsed['s:Envelope'] || parsed['soap:Envelope'];
    const body = soapEnvelope?.['s:Body'] || soapEnvelope?.['soap:Body'];
    const response = body?.['BaseResponseMessageOf_BelgeTipleriCevap'];
    
    if (!response) {
      return Response.json({ ok: false, error: 'INVALID_RESPONSE', raw: txt.slice(0, 2000) }, { status: 500 });
    }

    // Hata kontrolü
    if (response.HataKodlari && !response.HataKodlari['@_i:nil']) {
      return Response.json({ 
        ok: false, 
        islemKodu: response.IslemKodu, 
        hataKodlari: response.HataKodlari, 
        raw: txt.slice(0, 2000) 
      }, { status: 500 });
    }

    const sonuc = response.Sonuc;
    if (sonuc?.HataKodu && Number(sonuc.HataKodu) !== 0) {
      return Response.json({ 
        ok: false, 
        hataKodu: sonuc.HataKodu, 
        mesaj: sonuc.Mesaj, 
        raw: txt.slice(0, 2000) 
      }, { status: 500 });
    }

    const belgeTipleri = sonuc?.['a:BelgeTipleri'] || sonuc?.BelgeTipleri;
    const belgeTipleriArray = Array.isArray(belgeTipleri) ? belgeTipleri : (belgeTipleri ? [belgeTipleri] : []);
    
    const arr = [];
    for (const item of belgeTipleriArray) {
      const dtoXml = item?.['b:BelgeTipiDTO'] || item;
      if (dtoXml && typeof dtoXml === 'object') {
        if (Array.isArray(dtoXml)) {
          arr.push(...dtoXml);
        } else {
          arr.push(dtoXml);
        }
      }
    }

    const items = arr.map((b: any, i: number) => ({
      id: b?.['b:Id'] ?? b?.Id ?? i + 1,
      ad: b?.['b:BelgeTipiAdi'] ?? b?.BelgeTipiAdi ?? '',
    }));

    return Response.json({ ok: true, count: items.length, items });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
