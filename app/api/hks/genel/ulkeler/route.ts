import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const HKS_URL = 'https://hks.hal.gov.tr/WebServices/GenelService.svc'
const USERNAME = process.env.HKS_USERNAME || ''
const PASSWORD = process.env.HKS_PASSWORD || ''
const SERVICE_PASSWORD = process.env.HKS_SERVICE_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    // HKS servisi şu anda erişilebilir değil, mock data döndür
    const mockUlkeler = [
      { id: '1', ad: 'Türkiye' },
      { id: '2', ad: 'Almanya' },
      { id: '3', ad: 'Fransa' },
      { id: '4', ad: 'İtalya' },
      { id: '5', ad: 'İspanya' },
      { id: '6', ad: 'Hollanda' },
      { id: '7', ad: 'Belçika' },
      { id: '8', ad: 'Avusturya' },
      { id: '9', ad: 'İsviçre' },
      { id: '10', ad: 'Polonya' }
    ]
    
    return Response.json({
      ok: true,
      count: mockUlkeler.length,
      islemKodu: 'MOCK_DATA',
      items: mockUlkeler
    })
    
  } catch (error: any) {
    console.error('HKS Ülke Listesi API hatası:', error)
    return Response.json({ 
      ok: false, 
      error: String(error?.message || error), 
      items: [] 
    }, { status: 500 })
  }
}
