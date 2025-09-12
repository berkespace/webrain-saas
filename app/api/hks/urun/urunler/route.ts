import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/UrunService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    // UrunServiceUrunler için SOAP envelope
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_UrunlerIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Urun.ServiceContract">
      <Istek />
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_UrunlerIstek>
  </soap:Body>
</soap:Envelope>`

    const soapAction = 'http://www.gtb.gov.tr//WebServices/IUrunService/UrunServiceUrunler'
    
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
      k.includes('UrunServiceUrunler') || k.includes('BaseResponseMessageOf_UrunlerCevap')
    )
    
    if (!responseKey) {
      throw new Error('SOAP response key bulunamadı')
    }
    
    const responseData = soapBody[responseKey]
    const sonuc = responseData?.['a:Sonuc'] || responseData?.Sonuc
    const islemKodu = responseData?.['a:IslemKodu'] || responseData?.IslemKodu
    
    if (!sonuc || !sonuc?.['a:Urunler'] && !sonuc?.Urunler) {
      return Response.json({ 
        ok: false, 
        error: 'Ürün listesi alınamadı', 
        islemKodu,
        items: [] 
      }, { status: 500 })
    }
    
    const urunler = sonuc?.['a:Urunler'] || sonuc?.Urunler
    const urunlerArray = Array.isArray(urunler) ? urunler : (urunler ? [urunler] : [])
    
    const items = urunlerArray.map((urun: any) => ({
      id: urun?.['b:Id'] ?? urun?.Id ?? '',
      ad: urun?.['b:UrunAdi'] ?? urun?.UrunAdi ?? '',
    }))
    
    return Response.json({
      ok: true,
      count: items.length,
      islemKodu,
      items
    })
    
  } catch (error: any) {
    console.error('HKS Ürün Listesi API hatası:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 })
  }
}
