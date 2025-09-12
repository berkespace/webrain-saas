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

    // HKS servisi şu anda erişilebilir değil, mock data döndür
    const items = tcKimlikVergiNolar.map((tc: string) => {
      // Bizim vergi numaramız için özel mock
      if (tc === '4640538224') {
        return {
          tcKimlikVergiNo: tc,
          kayitliKisiMi: true,
          sifatlari: [6] // Tüccar Hal İçi
        }
      }
      
      // Diğer TC'ler için genel mock
      return {
        tcKimlikVergiNo: tc,
        kayitliKisiMi: Math.random() > 0.5, // %50 şans
        sifatlari: Math.random() > 0.5 ? [2, 6] : [6] // İhracat + Tüccar veya sadece Tüccar
      }
    })
    
    return Response.json({
      ok: true,
      count: items.length,
      islemKodu: 'MOCK_DATA',
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