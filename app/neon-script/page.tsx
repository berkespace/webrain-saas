'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Database, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface SeedStats {
  users: number
  komisyoncular: number
  ozelFirmalar: number
  urunler: number
  mustahsiller: number
  ureticiler: number
  ambalajlar: number
  malKabulRecords: number
}

interface SeedResponse {
  success: boolean
  message: string
  stats?: SeedStats
  error?: string
  details?: string
  timestamp: string
}

export default function NeonScriptPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SeedResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSeedDatabase = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/neon-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data: SeedResponse = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Bilinmeyen hata')
        setResult(data)
      }
    } catch (err) {
      setError('API çağrısı sırasında hata oluştu')
      console.error('Seed hatası:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = () => {
    if (loading) return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    if (result?.success) return <CheckCircle className="h-6 w-6 text-green-500" />
    if (error) return <AlertCircle className="h-6 w-6 text-red-500" />
    return <Database className="h-6 w-6 text-gray-500" />
  }

  const getStatusText = () => {
    if (loading) return 'Veritabanı seed ediliyor...'
    if (result?.success) return 'Veritabanı başarıyla seed edildi!'
    if (error) return 'Seed işlemi başarısız'
    return 'Veritabanını seed etmek için butona tıklayın'
  }

  const getStatusColor = () => {
    if (loading) return 'text-blue-600'
    if (result?.success) return 'text-green-600'
    if (error) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌟 Neon Veritabanı Kurulum
          </h1>
          <p className="text-xl text-gray-600">
            Vercel deployment için Neon veritabanını otomatik olarak hazırlayın
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Veritabanı Seed İşlemi
            </CardTitle>
            <CardDescription>
              Bu işlem Neon veritabanını temizleyip tüm gerekli verileri oluşturacak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getStatusIcon()}
                <span className={`font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>

              <Button
                onClick={handleSeedDatabase}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Veritabanı Seed Ediliyor...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Veritabanını Seed Et
                  </>
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Hata:</strong> {error}
                    {result?.details && (
                      <div className="mt-2 text-sm">
                        <strong>Detay:</strong> {result.details}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {result?.success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Başarılı!</strong> {result.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {result?.success && result.stats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Oluşturulan Veriler
              </CardTitle>
              <CardDescription>
                Veritabanında başarıyla oluşturulan kayıt sayıları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.stats.users}</div>
                  <div className="text-sm text-blue-600">👤 Kullanıcı</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.stats.komisyoncular}</div>
                  <div className="text-sm text-green-600">🏪 Komisyoncu</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{result.stats.ozelFirmalar}</div>
                  <div className="text-sm text-purple-600">🏢 Özel Firma</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{result.stats.urunler}</div>
                  <div className="text-sm text-orange-600">🥬 Ürün</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">{result.stats.mustahsiller}</div>
                  <div className="text-sm text-teal-600">👨‍🌾 Müstahsil</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">{result.stats.ureticiler}</div>
                  <div className="text-sm text-indigo-600">👨‍🌾 Üretici</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">{result.stats.ambalajlar}</div>
                  <div className="text-sm text-pink-600">📦 Ambalaj</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{result.stats.malKabulRecords}</div>
                  <div className="text-sm text-yellow-600">📝 Mal Kabul</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Kurulum Adımları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Neon Veritabanı Oluştur</h4>
                  <p className="text-sm text-gray-600">
                    <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Neon Dashboard
                    </a>
                    'da yeni proje oluşturun
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Connection String Kopyala</h4>
                  <p className="text-sm text-gray-600">
                    Proje detaylarından Prisma formatında connection string'i kopyalayın
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Vercel Environment Variable Ekle</h4>
                  <p className="text-sm text-gray-600">
                    Vercel dashboard'da <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code> olarak ekleyin
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Veritabanını Seed Et</h4>
                  <p className="text-sm text-gray-600">
                    Yukarıdaki butona tıklayarak veritabanını otomatik olarak hazırlayın
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            <strong>Not:</strong> Bu işlem mevcut verileri silecek ve yeni veriler oluşturacaktır.
          </p>
          <p className="mt-1">
            Sadece production deployment için kullanın.
          </p>
        </div>
      </div>
    </div>
  )
}
