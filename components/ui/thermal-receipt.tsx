'use client'

import { QRCode } from './qr-code'

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
    <div className={`bg-white text-black font-mono text-xs ${className}`} style={{ width: '80mm', maxWidth: '80mm' }}>
      {/* Header */}
      <div className="text-center py-2 border-b border-black">
        <div className="text-lg font-bold">WEBRAIN</div>
        <div className="text-sm">Tarım Ürünleri Yönetim Sistemi</div>
        <div className="text-xs text-gray-600">80mm Termal Yazıcı</div>
      </div>

      {/* Fiş Tipi */}
      <div className="text-center py-2 border-b border-black">
        <div className="text-lg font-bold">
          {type === 'BILGI_FISI' ? 'BİLGİ FİŞİ' : 'SON FİŞ'}
        </div>
        <div className="text-xs text-gray-600">
          {type === 'BILGI_FISI' ? 'Üretici için kopya' : 'Ürün son evrakı'}
        </div>
      </div>

      {/* Fiş Numarası ve Tarih */}
      <div className="py-2 border-b border-black">
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
      <div className="py-2 border-b border-black">
        <div className="font-bold mb-1">SATICI BİLGİLERİ</div>
        <div className="text-xs">
          <div>Tip: {data.saticiTipi}</div>
          <div className="font-bold">{data.saticiAdi}</div>
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="py-2 border-b border-black">
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
      <div className="py-2 border-b border-black">
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
        <div className="py-2 border-b border-black">
          <div className="font-bold mb-1">NOTLAR</div>
          <div className="text-xs">{data.notlar}</div>
        </div>
      )}

      {/* Mal Kabulcu */}
      <div className="py-2 border-b border-black">
        <div className="text-xs">
          <div>Mal Kabulcu:</div>
          <div className="font-bold">{data.malKabulcuAdi}</div>
        </div>
      </div>

      {/* QR Kod */}
      <div className="py-2 border-b border-black text-center">
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
      <div className="text-center py-2">
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
