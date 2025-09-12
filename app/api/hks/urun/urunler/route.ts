import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/UrunService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    // HKS servisi şu anda erişilebilir değil, mock data döndür
    const mockUrunler = [
      { id: '1', ad: 'Domates' },
      { id: '2', ad: 'Salatalık' },
      { id: '3', ad: 'Biber' },
      { id: '4', ad: 'Patlıcan' },
      { id: '5', ad: 'Soğan' },
      { id: '6', ad: 'Sarımsak' },
      { id: '7', ad: 'Havuç' },
      { id: '8', ad: 'Patates' },
      { id: '9', ad: 'Lahana' },
      { id: '10', ad: 'Marul' },
      { id: '11', ad: 'Ispanak' },
      { id: '12', ad: 'Maydanoz' },
      { id: '13', ad: 'Dereotu' },
      { id: '14', ad: 'Nane' },
      { id: '15', ad: 'Fesleğen' }
    ]
    
    return Response.json({
      ok: true,
      count: mockUrunler.length,
      islemKodu: 'MOCK_DATA',
      items: mockUrunler
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
