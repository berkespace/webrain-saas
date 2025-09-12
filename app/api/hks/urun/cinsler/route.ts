import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/UrunService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    const { urunId } = await req.json()
    
    if (!urunId) {
      return Response.json({ 
        ok: false, 
        error: 'Ürün ID gerekli', 
        items: [] 
      }, { status: 400 })
    }

    // UrunServiceUrunCinsleri için SOAP envelope
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_UrunCinsleriIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Urun.ServiceContract">
      <Istek>
        <a:UrunId>${urunId}</a:UrunId>
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_UrunCinsleriIstek>
  </soap:Body>
</soap:Envelope>`

    const soapAction = 'http://www.gtb.gov.tr//WebServices/IUrunService/UrunServiceUrunCinsleri'
    
    const response = await fetch(HKS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': soapAction,
      },
      body: envelope,
    })

    const xml = await response.text()
    
    // XML'i parse et
    const { XMLParser } = await import('fast-xml-parser')
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text'
    })
    
    const parsed = parser.parse(xml)
    
    // Response'u bul
    const soapBody = parsed['soap:Envelope']?.['soap:Body']
    const responseKey = Object.keys(soapBody || {}).find(k => 
      k.includes('UrunServiceUrunCinsleri') || k.includes('BaseResponseMessageOf_UrunCinsleriCevap')
    )
    
    if (!responseKey) {
      throw new Error('SOAP response key bulunamadı')
    }
    
    const responseData = soapBody[responseKey]
    const sonuc = responseData?.['a:Sonuc'] || responseData?.Sonuc
    const islemKodu = responseData?.['a:IslemKodu'] || responseData?.IslemKodu
    
    if (!sonuc || !sonuc?.['a:UrunCinsleri'] && !sonuc?.UrunCinsleri) {
      return Response.json({ 
        ok: false, 
        error: 'Ürün cinsleri listesi alınamadı', 
        islemKodu,
        items: [] 
      }, { status: 500 })
    }
    
    const urunCinsleri = sonuc?.['a:UrunCinsleri'] || sonuc?.UrunCinsleri
    const urunCinsleriArray = Array.isArray(urunCinsleri) ? urunCinsleri : (urunCinsleri ? [urunCinsleri] : [])
    
    const items = urunCinsleriArray.map((cins: any) => ({
      id: cins?.['b:Id'] ?? cins?.Id ?? '',
      ad: cins?.['b:UrunCinsiAdi'] ?? cins?.UrunCinsiAdi ?? '',
      urunId: cins?.['b:UrunId'] ?? cins?.UrunId ?? '',
      uretimSekliId: cins?.['b:UretimSekliId'] ?? cins?.UretimSekliId ?? '',
      urunKodu: cins?.['b:UrunKodu'] ?? cins?.UrunKodu ?? '',
      ithalmi: cins?.['b:Ithalmi'] ?? cins?.Ithalmi ?? false,
    }))
    
    return Response.json({
      ok: true,
      count: items.length,
      islemKodu,
      items
    })
    
  } catch (error: any) {
    console.error('HKS Ürün Cinsleri API hatası:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 })
  }
}
