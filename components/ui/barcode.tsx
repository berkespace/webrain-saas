'use client'

import { useEffect, useRef, useState } from 'react'

interface BarcodeProps {
  value: string
  width?: number
  height?: number
  className?: string
}

export function Barcode({ value, width = 200, height = 60, className = '' }: BarcodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [barcodeDataUrl, setBarcodeDataUrl] = useState<string>('')

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

        // Canvas'ı data URL'e çevir (yazdırma için)
        const dataUrl = canvasRef.current.toDataURL('image/png')
        setBarcodeDataUrl(dataUrl)
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
    <div className="barcode-container">
      <style jsx>{`
        .barcode-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        @media print {
          .barcode-container {
            display: block !important;
            text-align: center;
            max-width: 80mm !important;
            width: 100% !important;
          }
          
          .barcode-container canvas {
            display: none !important;
          }
          
          .barcode-container .print-only {
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
          .barcode-container .print-only {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Canvas - ekran için */}
      <canvas
        ref={canvasRef}
        className={className}
        width={width}
        height={height}
        style={{
          display: 'block',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      
      {/* Image - yazdırma için */}
      {barcodeDataUrl && (
        <img
          src={barcodeDataUrl}
          alt="Barcode"
          width={width}
          height={height}
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
