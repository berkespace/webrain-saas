import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_ENDPOINT = 'https://hks.hal.gov.tr/WebServices/BildirimService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    // BildirimServisSifatListesi için SOAP envelope
    const envelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BaseRequestMessageOf_SifatIstek xmlns="http://www.gtb.gov.tr//WebServices" xmlns:a="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract">
      <Istek>
        <a:SifatIstek xmlns="http://schemas.datacontract.org/2004/07/GTB.HKS.Bildirim.ServiceContract" />
      </Istek>
      <Password>${PASSWORD}</Password>
      <ServicePassword>${SERVICE_PASSWORD}</ServicePassword>
      <UserName>${USERNAME}</UserName>
    </BaseRequestMessageOf_SifatIstek>
  </soap:Body>
</soap:Envelope>`

    const response = await fetch(HKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimServisSifatListesi'
      },
      body: envelope
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const xml = await response.text()
    
    // XML'i parse et
    const { parseSoap } = await import('@/app/lib/hks-soap')
    const parsed = await parseSoap(xml, 'BildirimServisSifatListesi')
    
    if (!parsed) {
      throw new Error('SOAP parsing failed')
    }

    const islemKodu = parsed.IslemKodu
    const sonuc = parsed.Sonuc

    if (!sonuc) {
      return Response.json({ 
        ok: false, 
        error: 'Sıfat listesi alınamadı',
        islemKodu 
      })
    }

    const sifatlar = sonuc.Sifatlar || []
    const sifatlarArray = Array.isArray(sifatlar) ? sifatlar : [sifatlar]

    const items = sifatlarArray.map((sifat: any) => ({
      id: sifat.Id || sifat.id || '',
      ad: sifat.SifatAdi || sifat.sifatAdi || sifat.ad || '',
      aciklama: `${sifat.SifatAdi || sifat.sifatAdi || sifat.ad || ''} sıfatı`
    })).filter(item => item.id && item.ad)

    return Response.json({ 
      ok: true, 
      count: items.length, 
      islemKodu, 
      items 
    })

  } catch (error: any) {
    console.error('HKS Sifat Listesi Error:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error),
      items: []
    }, { status: 500 })
  }
}