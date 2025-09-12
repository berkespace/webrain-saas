import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/GenelService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    const { ilId } = await req.json()
    
    if (!ilId) {
      return Response.json({ 
        ok: false, 
        error: 'İl ID gerekli', 
        items: [] 
      }, { status: 400 })
    }

    // GenelServisIlceler için SOAP envelope
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_IlcelerIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Genel.ServiceContract">
      <Istek>
        <a:IlId>${ilId}</a:IlId>
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_IlcelerIstek>
  </soap:Body>
</soap:Envelope>`

    const soapAction = 'http://www.gtb.gov.tr//WebServices/IGenelService/GenelServisIlceler'
    
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
      k.includes('GenelServisIlceler') || k.includes('BaseResponseMessageOf_IlcelerCevap')
    )
    
    if (!responseKey) {
      throw new Error('SOAP response key bulunamadı')
    }
    
    const responseData = soapBody[responseKey]
    const sonuc = responseData?.['a:Sonuc'] || responseData?.Sonuc
    const islemKodu = responseData?.['a:IslemKodu'] || responseData?.IslemKodu
    
    if (!sonuc || !sonuc?.['a:Ilceler'] && !sonuc?.Ilceler) {
      return Response.json({ 
        ok: false, 
        error: 'İlçe listesi alınamadı', 
        islemKodu,
        items: [] 
      }, { status: 500 })
    }
    
    const ilceler = sonuc?.['a:Ilceler'] || sonuc?.Ilceler
    const ilcelerArray = Array.isArray(ilceler) ? ilceler : (ilceler ? [ilceler] : [])
    
    const items = ilcelerArray.map((ilce: any) => ({
      id: ilce?.['b:Id'] ?? ilce?.Id ?? '',
      ad: ilce?.['b:IlceAdi'] ?? ilce?.IlceAdi ?? '',
    }))
    
    return Response.json({
      ok: true,
      count: items.length,
      islemKodu,
      items
    })
    
  } catch (error: any) {
    console.error('HKS İlçe Listesi API hatası:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 })
  }
}
