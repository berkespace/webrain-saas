'use client'

import { useEffect, useRef } from 'react'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 128, className = '' }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return

      try {
        // QR kod kütüphanesini dinamik olarak import et
        const QRCodeLib = await import('qrcode')
        
        await QRCodeLib.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
      } catch (error) {
        console.error('QR kod oluşturma hatası:', error)
      }
    }

    if (value) {
      generateQR()
    }
  }, [value, size])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={size}
      height={size}
    />
  )
}
