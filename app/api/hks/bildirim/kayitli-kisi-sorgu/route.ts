import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/BildirimService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    const { tcKimlikVergiNolar } = await req.json()
    
    if (!tcKimlikVergiNolar || !Array.isArray(tcKimlikVergiNolar) || tcKimlikVergiNolar.length === 0) {
      return Response.json({ 
        ok: false, 
        error: 'TC Kimlik/Vergi No listesi gerekli', 
        items: [] 
      }, { status: 400 })
    }

    // BildirimServisKayitliKisiSorgu için SOAP envelope
    const tcKimlikVergiNolarXml = tcKimlikVergiNolar.map(tc => `<a:string>${tc}</a:string>`).join('')
    
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_KayitliKisiSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:TcKimlikVergiNolar>
          ${tcKimlikVergiNolarXml}
        </a:TcKimlikVergiNolar>
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_KayitliKisiSorguIstek>
  </soap:Body>
</soap:Envelope>`

    const soapAction = 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisKayitliKisiSorgu'
    
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
      k.includes('BildirimServisKayitliKisiSorgu') || k.includes('BaseResponseMessageOf_KayitliKisiSorguCevap')
    )
    
    if (!responseKey) {
      throw new Error('SOAP response key bulunamadı')
    }
    
    const responseData = soapBody[responseKey]
    const sonuc = responseData?.['a:Sonuc'] || responseData?.Sonuc
    const islemKodu = responseData?.['a:IslemKodu'] || responseData?.IslemKodu
    
    if (!sonuc || !sonuc?.['a:TcKimlikVergiNolar'] && !sonuc?.TcKimlikVergiNolar) {
      return Response.json({ 
        ok: false, 
        error: 'Kayıtlı kişi sorgu sonucu alınamadı', 
        islemKodu,
        items: [] 
      }, { status: 500 })
    }
    
    const tcKimlikVergiNolarData = sonuc?.['a:TcKimlikVergiNolar'] || sonuc?.TcKimlikVergiNolar
    const tcKimlikVergiNolarArray = Array.isArray(tcKimlikVergiNolarData) ? tcKimlikVergiNolarData : (tcKimlikVergiNolarData ? [tcKimlikVergiNolarData] : [])
    
    const items = tcKimlikVergiNolarArray.map((kisi: any) => ({
      tcKimlikVergiNo: kisi?.['b:TcKimlikVergiNo'] ?? kisi?.TcKimlikVergiNo ?? '',
      kayitliKisiMi: kisi?.['b:KayitliKisiMi'] ?? kisi?.KayitliKisiMi ?? false,
      sifatlari: kisi?.['b:Sifatlari']?.['b:int'] ?? kisi?.Sifatlari ?? []
    }))
    
    return Response.json({
      ok: true,
      count: items.length,
      islemKodu,
      items
    })
    
  } catch (error: any) {
    console.error('HKS Kayıtlı Kişi Sorgu API hatası:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 })
  }
}