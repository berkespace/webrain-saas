'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { QrCode, Camera, X } from 'lucide-react'

interface QRScannerProps {
  onScan: (data: string) => void
  onClose: () => void
  isOpen: boolean
}

export function QRScanner({ onScan, onClose, isOpen }: QRScannerProps) {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera')
  const [manualInput, setManualInput] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (isOpen && scanMode === 'camera') {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, scanMode])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      console.error('Kamera erişim hatası:', error)
      setScanMode('manual')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualInput.trim()) {
      onScan(manualInput.trim())
      setManualInput('')
    }
  }

  const handleCameraScan = (data: string) => {
    onScan(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-foreground">QR Kod / Barkod Tarama</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={scanMode === 'camera' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScanMode('camera')}
            className="flex-1"
          >
            <Camera className="mr-2 h-4 w-4" />
            Kamera
          </Button>
          <Button
            variant={scanMode === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScanMode('manual')}
            className="flex-1"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Manuel
          </Button>
        </div>

        {scanMode === 'camera' ? (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-100 rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-primary border-dashed rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-primary">
                  <QrCode className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">QR kodu bu alana hizalayın</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center">
              Kamera ile QR kod veya barkod tarayın
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleManualSubmit}>
              <div className="space-y-2">
                <Label htmlFor="manualInput">Fiş Numarası veya QR Kod Verisi</Label>
                <Input
                  id="manualInput"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Fiş no girin veya QR kod verisini yapıştırın"
                  className="font-mono"
                />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={!manualInput.trim()}>
                <QrCode className="mr-2 h-4 w-4" />
                Tarama Yap
              </Button>
            </form>
            <p className="text-xs text-gray-600 text-center">
              Fiş numarasını manuel olarak girin veya QR kod verisini yapıştırın
            </p>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>• Kamera ile otomatik tarama yapabilirsiniz</p>
          <p>• Manuel olarak fiş numarası girebilirsiniz</p>
          <p>• QR kod verisi ile direkt düzenleme ekranına gidebilirsiniz</p>
        </div>
      </div>
    </div>
  )
}
