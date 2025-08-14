'use client'

import { useEffect, useRef, useState } from 'react'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 128, className = '' }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return

      try {
        // QR kod kütüphanesini dinamik olarak import et
        const QRCodeLib = await import('qrcode')
        
        // Canvas'a QR kod çiz
        await QRCodeLib.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })

        // Canvas'ı data URL'e çevir (yazdırma için)
        const dataUrl = canvasRef.current.toDataURL('image/png')
        setQrDataUrl(dataUrl)
      } catch (error) {
        console.error('QR kod oluşturma hatası:', error)
      }
    }

    if (value) {
      generateQR()
    }
  }, [value, size])

  return (
    <div className="qr-code-container">
      <style jsx>{`
        .qr-code-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        @media print {
          .qr-code-container {
            display: block !important;
            text-align: center;
            max-width: 80mm !important;
            width: 100% !important;
          }
          
          .qr-code-container canvas {
            display: none !important;
          }
          
          .qr-code-container .print-only {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-width: 80mm !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 auto !important;
          }
        }
        
        @media screen {
          .qr-code-container .print-only {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Canvas - ekran için */}
      <canvas
        ref={canvasRef}
        className={className}
        width={size}
        height={size}
        style={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      
      {/* Image - yazdırma için */}
      {qrDataUrl && (
        <img
          src={qrDataUrl}
          alt="QR Code"
          width={size}
          height={size}
          style={{
            display: 'none',
            maxWidth: '100%',
            height: 'auto'
          }}
          className="print-only"
        />
      )}
    </div>
  )
}
