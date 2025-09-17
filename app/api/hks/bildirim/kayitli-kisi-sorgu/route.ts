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
    const tcKimlikVergiNolarData = tcKimlikVergiNolar.map(tc => `<a:string>${tc}</a:string>`).join('')
    
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_KayitliKisiSorguIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:TcKimlikVergiNolar>
          ${tcKimlikVergiNolarData}
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
    console.log('HKS Kayıtlı Kişi Sorgu Response:', xml.slice(0, 1000))

    // XML'i parse et
    const { XMLParser } = await import('fast-xml-parser')
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text'
    })

    const parsed = parser.parse(xml)
    console.log('Parsed XML:', JSON.stringify(parsed, null, 2).slice(0, 1000))

    // Response'u bul
    const soapBody = parsed['s:Envelope']?.['s:Body'] || parsed['soap:Envelope']?.['soap:Body']
    const responseKey = Object.keys(soapBody || {}).find(k =>
      k.includes('BildirimServisKayitliKisiSorgu') || k.includes('BaseResponseMessageOf_KayitliKisiSorguCevap')
    )

    if (!responseKey) {
      console.log('SOAP response key bulunamadı. Available keys:', Object.keys(soapBody || {}))
      return Response.json({
        ok: false,
        error: 'SOAP response key bulunamadı',
        availableKeys: Object.keys(soapBody || {}),
        raw: xml.slice(0, 2000)
      }, { status: 500 })
    }

    const responseData = soapBody[responseKey]
    const sonuc = responseData?.['a:Sonuc'] || responseData?.Sonuc
    const islemKodu = responseData?.['a:IslemKodu'] || responseData?.IslemKodu

    if (!sonuc) {
      return Response.json({
        ok: false,
        error: 'Kayıtlı kişi listesi alınamadı',
        islemKodu,
        items: []
      }, { status: 500 })
    }

    const tcKimlikVergiNolarList = sonuc?.['a:TcKimlikVergiNolar'] || sonuc?.TcKimlikVergiNolar
    
    // Eğer TcKimlikVergiNolar boş ise, gelen TC numaralarını işle
    if (!tcKimlikVergiNolarList || Object.keys(tcKimlikVergiNolarList).length === 0) {
      const items = tcKimlikVergiNolar.map((tc: string) => ({
        tcKimlikVergiNo: tc,
        kayitliKisiMi: false,
        sifatlari: []
      }))
      
      return Response.json({
        ok: true,
        count: items.length,
        islemKodu,
        items
      })
    }
    
    const tcKimlikVergiNolarArray = Array.isArray(tcKimlikVergiNolarList) ? tcKimlikVergiNolarList : (tcKimlikVergiNolarList ? [tcKimlikVergiNolarList] : [])

    const items = tcKimlikVergiNolarArray.map((item: any) => ({
      tcKimlikVergiNo: item?.['b:TcKimlikVergiNo'] ?? item?.TcKimlikVergiNo ?? '',
      kayitliKisiMi: item?.['b:KayitliKisiMi'] ?? item?.KayitliKisiMi ?? false,
      sifatlari: item?.['b:Sifatlari']?.['c:int'] ?? item?.Sifatlari ?? []
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