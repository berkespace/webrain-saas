'use client'

import { useEffect, useRef } from 'react'

interface BarcodeProps {
  value: string
  width?: number
  height?: number
  className?: string
}

export function Barcode({ value, width = 200, height = 60, className = '' }: BarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateBarcode = async () => {
      if (!canvasRef.current) return

      try {
        // Barkod kütüphanesini dinamik olarak import et
        const JsBarcode = await import('jsbarcode')
        
        JsBarcode.default(canvasRef.current, value, {
          format: 'CODE128',
          width: 2,
          height: height,
          displayValue: true,
          fontSize: 12,
          margin: 10
        })
      } catch (error) {
        console.error('Barkod oluşturma hatası:', error)
        // Fallback: Basit barkod çizimi
        drawSimpleBarcode(canvasRef.current, value, width, height)
      }
    }

    if (value) {
      generateBarcode()
    }
  }, [value, width, height])

  const drawSimpleBarcode = (canvas: HTMLCanvasElement, value: string, width: number, height: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#000000'
    
    // Basit barkod çizimi
    const barWidth = 2
    const spacing = 1
    let x = 10
    
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i)
      const bars = char.toString(2).padStart(8, '0')
      
      for (let j = 0; j < bars.length; j++) {
        if (bars[j] === '1') {
          ctx.fillRect(x, 10, barWidth, height - 20)
        }
        x += barWidth + spacing
      }
      x += 5 // Karakter arası boşluk
    }
    
    // Metin ekle
    ctx.fillStyle = '#000000'
    ctx.font = '12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(value, width / 2, height - 5)
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={width}
      height={height}
    />
  )
}
