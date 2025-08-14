'use client'

import { QRCode } from './qr-code'
import { Barcode } from './barcode'

interface ThermalReceiptProps {
  data: {
    fisNo: string
    tarih: string
    saticiTipi: string
    saticiAdi: string
    urunAdi: string
    brutKg: number
    daraKg: number
    girisKg: number
    cikmaFireKg?: number
    netKg?: number
    ambalajAdi?: string
    kasaSayisi?: number
    paletAdi?: string
    paletSayisi?: number
    notlar?: string
    malKabulcuAdi: string
  }
  type: 'BILGI_FISI' | 'SON_FIS'
  className?: string
}

export function ThermalReceipt({ data, type, className = '' }: ThermalReceiptProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const qrValue = `${data.fisNo}|${data.tarih}|${data.saticiTipi}|${data.urunAdi}`

  return (
    <div className={`bg-white text-black font-mono text-xs thermal-receipt ${className}`}>
      <style jsx>{`
        .thermal-receipt {
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 0;
          font-family: 'Courier New', monospace;
          line-height: 1.2;
          box-sizing: border-box;
        }
        
        @media print {
          * {
            box-sizing: border-box !important;
          }
          
          .thermal-receipt {
            width: 80mm !important;
            max-width: 80mm !important;
            min-width: 80mm !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 10px !important;
            line-height: 1.1 !important;
            transform: none !important;
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
          }
          
          .qr-code, .barcode {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            max-width: 80mm !important;
            width: 100% !important;
          }
          
          .qr-code canvas, .barcode canvas {
            display: none !important;
          }
          
          .qr-code .print-only, .barcode .print-only {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            max-width: 80mm !important;
            width: 100% !important;
            height: auto !important;
          }
          
          /* 80mm termal yazıcı için özel ayarlar */
          @page {
            size: 80mm auto;
            margin: 0;
            padding: 0;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 80mm !important;
            max-width: 80mm !important;
            overflow: visible !important;
          }
          
          /* Tüm div'lerin genişliğini sınırla */
          div {
            max-width: 80mm !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          /* Header ve diğer bölümler için özel kurallar */
          .receipt-header, .receipt-section {
            max-width: 80mm !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 8px 4px !important;
            font-size: 10px !important;
            line-height: 1.1 !important;
          }
          
          /* Text boyutlarını küçült */
          .text-lg {
            font-size: 14px !important;
          }
          
          .text-sm {
            font-size: 11px !important;
          }
          
          .text-xs {
            font-size: 9px !important;
          }
        }
        
        @media screen {
          .qr-code, .barcode {
            display: block;
          }
          .print-only {
            display: none !important;
          }
        }
      `}</style>
      {/* Header */}
      <div className="text-center py-2 border-b border-black receipt-header">
        <div className="text-lg font-bold">WEBRAIN</div>
        <div className="text-sm">Tarım Ürünleri Yönetim Sistemi</div>
        <div className="text-xs text-gray-600"></div>
      </div>

      {/* Fiş Tipi */}
      <div className="text-center py-2 border-b border-black receipt-section">
        <div className="text-lg font-bold">
          {type === 'BILGI_FISI' ? 'BİLGİ FİŞİ' : 'SON FİŞ'}
        </div>
        <div className="text-xs text-gray-600">
          {type === 'BILGI_FISI' ? 'Üretici için kopya' : 'Ürün son evrakı'}
        </div>
      </div>

      {/* Fiş Numarası ve Tarih */}
      <div className="py-2 border-b border-black receipt-section">
        <div className="flex justify-between">
          <span>Fiş No:</span>
          <span className="font-bold">{data.fisNo}</span>
        </div>
        <div className="flex justify-between">
          <span>Tarih:</span>
          <span>{formatDate(data.tarih)}</span>
        </div>
        <div className="flex justify-between">
          <span>Saat:</span>
          <span>{formatTime(data.tarih)}</span>
        </div>
      </div>

      {/* Satıcı Bilgileri */}
      <div className="py-2 border-b border-black receipt-section">
        <div className="font-bold mb-1">SATICI BİLGİLERİ</div>
        <div className="text-xs">
          <div>Tip: {data.saticiTipi}</div>
          <div className="font-bold">{data.saticiAdi}</div>
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="py-2 border-b border-black receipt-section">
        <div className="font-bold mb-1">ÜRÜN BİLGİLERİ</div>
        <div className="text-xs">
          <div className="font-bold">{data.urunAdi}</div>
          {data.ambalajAdi && (
            <div>Ambalaj: {data.ambalajAdi} x {data.kasaSayisi}</div>
          )}
          {data.paletAdi && data.paletSayisi && (
            <div>Palet: {data.paletAdi} x {data.paletSayisi}</div>
          )}
        </div>
      </div>

      {/* Ağırlık Bilgileri */}
      <div className="py-2 border-b border-black receipt-section">
        <div className="font-bold mb-1">AĞIRLIK BİLGİLERİ</div>
        <div className="text-xs">
          <div className="flex justify-between">
            <span>Brüt KG:</span>
            <span className="font-bold">{data.brutKg.toFixed(2)} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Dara KG:</span>
            <span>{data.daraKg.toFixed(2)} kg</span>
          </div>
          <div className="flex justify-between">
            <span>Giriş KG:</span>
            <span className="font-bold">{data.girisKg.toFixed(2)} kg</span>
          </div>
          {type === 'SON_FIS' && data.cikmaFireKg !== undefined && (
            <div className="flex justify-between">
              <span>Çıkma/Fire KG:</span>
              <span>{data.cikmaFireKg.toFixed(2)} kg</span>
            </div>
          )}
          {type === 'SON_FIS' && data.netKg !== undefined && (
            <div className="flex justify-between">
              <span>Net KG:</span>
              <span className="font-bold text-lg">{data.netKg.toFixed(2)} kg</span>
            </div>
          )}
        </div>
      </div>

      {/* Notlar */}
      {data.notlar && (
        <div className="py-2 border-b border-black receipt-section">
          <div className="font-bold mb-1">NOTLAR</div>
          <div className="text-xs">{data.notlar}</div>
        </div>
      )}

      {/* Mal Kabulcu */}
      <div className="py-2 border-b border-black receipt-section">
        <div className="text-xs">
          <div>Mal Kabulcu:</div>
          <div className="font-bold">{data.malKabulcuAdi}</div>
        </div>
      </div>

      {/* Barkod */}
      <div className="py-2 border-b border-black text-center barcode receipt-section">
        <div className="text-xs mb-2">Barkod</div>
        <div className="flex justify-center">
          <Barcode value={data.fisNo} width={200} height={40} />
        </div>
        <div className="text-xs mt-2 text-gray-600">
          Fiş No: {data.fisNo}
        </div>
      </div>

      {/* QR Kod */}
      <div className="py-2 border-b border-black text-center qr-code receipt-section">
        <div className="text-xs mb-2">QR Kod</div>
        <div className="flex justify-center">
          <QRCode value={qrValue} size={80} />
        </div>
        <div className="text-xs mt-2 text-gray-600">
          {type === 'BILGI_FISI' 
            ? 'Ürün işlendiğinde bu QR kod ile düzenleme ekranına gidin'
            : 'Bu fiş ürünün son evrakıdır'
          }
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 receipt-section">
        <div className="text-xs text-gray-600">
          {type === 'BILGI_FISI' 
            ? 'Bu fişi saklayın, ürün işlendiğinde gerekli olacak'
            : 'Ürün işlemi tamamlandı'
          }
        </div>
        <div className="text-xs mt-1">
          {new Date().toLocaleDateString('tr-TR')} - {new Date().toLocaleTimeString('tr-TR')}
        </div>
      </div>
    </div>
  )
}
