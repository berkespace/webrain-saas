'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

interface TestResult {
  name: string
  status: 'success' | 'error' | 'warning' | 'pending'
  message: string
  duration?: number
}

export default function NetworkTestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [testing, setTesting] = useState(false)

  const runTests = async () => {
    setTesting(true)
    setResults([])

    const tests: TestResult[] = []

    // Test 1: NextAuth Providers
    const start1 = Date.now()
    try {
      const response = await fetch('/api/auth/providers', {
        method: 'GET',
        cache: 'no-store'
      })
      const duration1 = Date.now() - start1
      
      if (response.ok) {
        tests.push({
          name: 'NextAuth Providers',
          status: 'success',
          message: 'Bağlantı başarılı',
          duration: duration1
        })
      } else {
        tests.push({
          name: 'NextAuth Providers',
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`,
          duration: duration1
        })
      }
    } catch (error) {
      tests.push({
        name: 'NextAuth Providers',
        status: 'error',
        message: `Bağlantı hatası: ${(error as Error).message}`,
        duration: Date.now() - start1
      })
    }
    setResults([...tests])

    // Test 2: Database Connection
    const start2 = Date.now()
    try {
      const response = await fetch('/api/test-db', {
        method: 'GET',
        cache: 'no-store'
      })
      const duration2 = Date.now() - start2
      
      if (response.ok) {
        tests.push({
          name: 'Veritabanı Bağlantısı',
          status: 'success',
          message: 'Veritabanı erişimi başarılı',
          duration: duration2
        })
      } else {
        tests.push({
          name: 'Veritabanı Bağlantısı',
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`,
          duration: duration2
        })
      }
    } catch (error) {
      tests.push({
        name: 'Veritabanı Bağlantısı',
        status: 'error',
        message: `Bağlantı hatası: ${(error as Error).message}`,
        duration: Date.now() - start2
      })
    }
    setResults([...tests])

    // Test 3: API Timeout Test
    const start3 = Date.now()
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 saniye timeout
      
      const response = await fetch('/api/auth/providers', {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store'
      })
      
      clearTimeout(timeoutId)
      const duration3 = Date.now() - start3
      
      tests.push({
        name: 'Timeout Test (10s)',
        status: 'success',
        message: `Bağlantı ${duration3}ms'de tamamlandı`,
        duration: duration3
      })
    } catch (error) {
      tests.push({
        name: 'Timeout Test (10s)',
        status: 'error',
        message: `Timeout hatası: ${(error as Error).message}`,
        duration: Date.now() - start3
      })
    }
    setResults([...tests])

    // Test 4: Network Info
    const start4 = Date.now()
    try {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const duration4 = Date.now() - start4
      
      if (connection) {
        tests.push({
          name: 'Ağ Bilgileri',
          status: 'success',
          message: `Bağlantı türü: ${connection.effectiveType || 'Bilinmiyor'}, Hız: ${connection.downlink || 'Bilinmiyor'} Mbps`,
          duration: duration4
        })
      } else {
        tests.push({
          name: 'Ağ Bilgileri',
          status: 'warning',
          message: 'Ağ bilgileri alınamadı',
          duration: duration4
        })
      }
    } catch (error) {
      tests.push({
        name: 'Ağ Bilgileri',
        status: 'warning',
        message: `Ağ bilgileri hatası: ${(error as Error).message}`,
        duration: Date.now() - start4
      })
    }
    setResults([...tests])

    setTesting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Başarılı</Badge>
      case 'error':
        return <Badge variant="destructive">Hata</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Uyarı</Badge>
      default:
        return <Badge variant="outline">Bekliyor</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ağ Bağlantı Testi</h1>
        <p className="text-muted-foreground mt-2">
          Şirket ağında yaşanan bağlantı sorunlarını teşhis etmek için bu testleri çalıştırın.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Kontrolü</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runTests} 
            disabled={testing}
            className="w-full"
          >
            {testing ? 'Testler Çalışıyor...' : 'Testleri Başlat'}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Sonuçları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h3 className="font-medium">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {result.duration && (
                      <span className="text-sm text-muted-foreground">
                        {result.duration}ms
                      </span>
                    )}
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Şirket Ağı Sorun Giderme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Olası Çözümler:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Şirket proxy ayarlarını kontrol edin</li>
              <li>Firewall kurallarını kontrol edin</li>
              <li>DNS ayarlarını kontrol edin</li>
              <li>VPN bağlantısını kapatmayı deneyin</li>
              <li>Farklı bir tarayıcı kullanmayı deneyin</li>
              <li>Şirket IT departmanı ile iletişime geçin</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Teknik Bilgiler:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>User Agent: {navigator.userAgent}</p>
              <p>Platform: {navigator.platform}</p>
              <p>Online: {navigator.onLine ? 'Evet' : 'Hayır'}</p>
              <p>Timestamp: {new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
