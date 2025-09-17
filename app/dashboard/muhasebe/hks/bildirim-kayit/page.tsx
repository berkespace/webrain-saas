'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, User, Package, Search, CheckCircle, Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Cari {
  tcKimlikVergiNo: string;
  unvan: string;
  sifat: string;
}

interface KayitliKisi {
  tcKimlikVergiNo: string;
  kayitliKisiMi: boolean;
  sifatlari: number[];
}

interface HalIciIsyeri {
  id: string;
  isyeriAdi: string;
  tcKimlikVergiNo: string;
  halId: string;
  halAdi: string;
}

interface MalinNiteligi {
  id: string;
  ad: string;
}

interface UrunBirimi {
  id: string;
  ad: string;
}

interface UretimSekli {
  id: string;
  ad: string;
}

interface UrunCinsi {
  id: string;
  ad: string;
  uretimSekliId: string;
  urunId: string;
  urunKodu: string;
  ithalmi: boolean;
}

interface Urun {
  id: string;
  ad: string;
}

interface StokKunye {
  kunyeNo: string;
  malinAdi: string;
  malinCinsi: string;
  malinTuru: string;
  malinMiktari: string;
  miktarBirimiAd: string;
  kalanMiktar: string;
  malinSatisFiyati: string;
  bildirimTuru: string;
  bildirimciTcKimlikVergiNo: string;
  bildirimciUnvan: string;
  malinSahibiTcKimlikVergiNo: string;
  ureticiTcKimlikVergiNo: string;
  aracPlakaNo: string;
  belgeNo: string;
  belgeTipi: string;
  sifat: string;
  gidecekYerTuruId: string;
  gidecekIsyeriId: string;
  uniqueId: string;
  analizStatus: string;
  rusumMiktari: string;
  rusumBorcu?: string;
  ortalamaFiyat?: string;
}

interface SecilenKunye {
  kunye: StokKunye;
  miktar: number;
  fiyat: number;
}

interface UrunSatir {
  id: string;
  urunId: string;
  urunAdi: string;
  urunCinsiId: string;
  urunCinsiAdi: string;
  malinNiteligiId: string;
  malinNiteligiAdi: string;
  uretimSekliId: string;
  uretimSekliAdi: string;
  miktar: number;
  birim: string;
  fiyat: number;
  secilenKunyeler: SecilenKunye[];
  toplamMiktar: number;
  satisKunyeNo: string;
  basarili: boolean;
}

export default function HKSBildirimKayitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cariler, setCariler] = useState<Cari[]>([]);
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [stokKunyeler, setStokKunyeler] = useState<StokKunye[]>([]);
  const [urunSatirlari, setUrunSatirlari] = useState<UrunSatir[]>([]);
  const [seciliCari, setSeciliCari] = useState<Cari | null>(null);
  const [kunyeModalOpen, setKunyeModalOpen] = useState(false);
  const [seciliUrunSatir, setSeciliUrunSatir] = useState<UrunSatir | null>(null);
  const [carilerLoading, setCarilerLoading] = useState(false);
  const [stokLoading, setStokLoading] = useState(false);
  
  // Yeni state'ler
  const [manuelTcNo, setManuelTcNo] = useState('');
  const [kayitliKisi, setKayitliKisi] = useState<KayitliKisi | null>(null);
  const [halIciIsyerleri, setHalIciIsyerleri] = useState<HalIciIsyeri[]>([]);
  const [malinNitelikleri, setMalinNitelikleri] = useState<MalinNiteligi[]>([]);
  const [urunBirimleri, setUrunBirimleri] = useState<UrunBirimi[]>([]);
  const [uretimSekilleri, setUretimSekilleri] = useState<UretimSekli[]>([]);
  const [urunCinsleri, setUrunCinsleri] = useState<UrunCinsi[]>([]);
  const [sifatlar, setSifatlar] = useState<{id: string, ad: string}[]>([]);
  

  // Safe fetch wrapper
  const safeFetch = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error: any) {
      console.error('Fetch error:', error)
      throw error
    }
  }

  const loadCariler = async () => {
    setCarilerLoading(true);
    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const data = await safeFetch('/api/hks/cariler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baslangic: startDate.toISOString().split('T')[0],
          bitis: endDate.toISOString().split('T')[0]
        })
      });
      
      if (data.ok && data.items) {
        setCariler(data.items);
        toast.success(`${data.count} adet cari yüklendi`);
      } else {
        toast.error('Cariler yüklenemedi');
      }
    } catch (error: any) {
      console.error('Cariler yüklenemedi:', error?.message);
      toast.error('Cariler yüklenemedi: ' + error?.message);
    } finally {
      setCarilerLoading(false);
    }
  }

  const manuelKisiSorgu = async () => {
    if (!manuelTcNo.trim()) {
      toast.error('Lütfen TC/Vergi No girin');
      return;
    }

    try {
      // Paralel olarak hem kişi sorgusu hem de hal içi işyeri sorgusu yap
      const [kisiData, halIciData] = await Promise.all([
        safeFetch('/api/hks/bildirim/manuel-kisi-sorgu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tcKimlikVergiNolar: [manuelTcNo.trim()]
          })
        }),
        safeFetch('/api/hks/genel/hal-ici-isyeri', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tcKimlikVergiNo: manuelTcNo.trim()
          })
        })
      ]);
      
      // Kişi sorgusu sonucu
      if (kisiData.ok && kisiData.items && kisiData.items.length > 0) {
        const kisi = kisiData.items[0];
        setKayitliKisi(kisi);
        
        if (kisi.kayitliKisiMi) {
          toast.success('Kişi HKS sisteminde kayıtlı');
          // Sıfatları yükle
          loadSifatlar();
        } else {
          toast.error('Kişi HKS sisteminde kayıtlı değil');
        }
      } else {
        toast.error('Kişi sorgulanamadı - HKS servisi boş döndü');
      }

      // Hal içi işyeri sorgusu sonucu
      if (halIciData.ok && halIciData.items && halIciData.items.length > 0) {
        setHalIciIsyerleri(halIciData.items);
        toast.success(`${halIciData.count} adet hal içi işyeri bulundu`);
      } else {
        setHalIciIsyerleri([]);
        toast.info('Hal içi işyeri bulunamadı');
      }
    } catch (error: any) {
      console.error('Manuel kişi sorgu hatası:', error?.message);
      toast.error('Kişi sorgulanamadı: ' + error?.message);
    }
  }

  const loadSifatlar = async () => {
    try {
      const data = await safeFetch('/api/hks/bildirim/sifatlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (data.ok && data.items) {
        setSifatlar(data.items);
      } else {
        toast.error('Sıfatlar yüklenemedi');
        setSifatlar([]);
      }
    } catch (error: any) {
      console.error('Sıfatlar yüklenemedi:', error?.message);
      toast.error('Sıfatlar yüklenemedi: ' + error?.message);
      setSifatlar([]);
    }
  }

  const loadMalinNitelikleri = async () => {
    try {
      const data = await safeFetch('/api/hks/urun/malin-niteligi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (data.ok && data.items) {
        setMalinNitelikleri(data.items);
      }
    } catch (error: any) {
      console.error('Malın nitelikleri yüklenemedi:', error?.message);
    }
  }

  const loadUrunBirimleri = async () => {
    try {
      const data = await safeFetch('/api/hks/urun/urun-birimleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (data.ok && data.items) {
        setUrunBirimleri(data.items);
      }
    } catch (error: any) {
      console.error('Ürün birimleri yüklenemedi:', error?.message);
    }
  }

  const loadUretimSekilleri = async () => {
    try {
      const data = await safeFetch('/api/hks/urun/uretim-sekilleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (data.ok && data.items) {
        setUretimSekilleri(data.items);
      }
    } catch (error: any) {
      console.error('Üretim şekilleri yüklenemedi:', error?.message);
    }
  }

  const loadUrunCinsleri = async (urunId: string) => {
    try {
      const data = await safeFetch('/api/hks/urun/urun-cinsleri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urunId })
      });
      
      if (data.ok && data.items) {
        setUrunCinsleri(data.items);
      }
    } catch (error: any) {
      console.error('Ürün cinsleri yüklenemedi:', error?.message);
    }
  }

  const loadUrunler = async () => {
    try {
      const data = await safeFetch('/api/hks/urun/urunler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (data.ok && data.items) {
        setUrunler(data.items);
      } else {
        toast.error('Ürünler yüklenemedi');
        setUrunler([]);
      }
    } catch (error: any) {
      console.error('Ürünler yüklenemedi:', error?.message);
      toast.error('Ürünler yüklenemedi: ' + error?.message);
      setUrunler([]);
    }
  }

  const loadStokKunyeler = async () => {
    setStokLoading(true);
    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const data = await safeFetch('/api/hks/stok/kunyeler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baslangic: startDate.toISOString().split('T')[0],
          bitis: endDate.toISOString().split('T')[0],
          kunyeNo: 0,
          KalanMiktariSifirdanBuyukOlanlar: true
        })
      });
      
      if (data.ok && data.items) {
        setStokKunyeler(data.items);
      } else {
        toast.error('Stok künyeleri yüklenemedi');
      }
    } catch (error: any) {
      console.error('Stok künyeleri yüklenemedi:', error?.message);
      toast.error('Stok künyeleri yüklenemedi: ' + error?.message);
    } finally {
      setStokLoading(false);
    }
  }

  const addUrunSatir = () => {
    const newSatir: UrunSatir = {
      id: Date.now().toString(),
      urunId: '',
      urunAdi: '',
      urunCinsiId: '',
      urunCinsiAdi: '',
      malinNiteligiId: '',
      malinNiteligiAdi: '',
      uretimSekliId: '',
      uretimSekliAdi: '',
      miktar: 0,
      birim: 'Kg',
      fiyat: 0,
      secilenKunyeler: [],
      toplamMiktar: 0,
      satisKunyeNo: '',
      basarili: false
    };
    setUrunSatirlari(prev => [...prev, newSatir]);
  }

  const removeUrunSatir = (id: string) => {
    setUrunSatirlari(prev => prev.filter(satir => satir.id !== id));
  }

  const updateUrunSatir = (id: string, field: keyof UrunSatir, value: any) => {
    setUrunSatirlari(prev => prev.map(satir => 
      satir.id === id ? { ...satir, [field]: value } : satir
    ));
  }

  const openKunyeModal = (satir: UrunSatir) => {
    setSeciliUrunSatir(satir);
    setKunyeModalOpen(true);
  }

  const selectKunye = (kunye: StokKunye, miktar: number, fiyat: number) => {
    if (!seciliUrunSatir) return;

    const secilenKunye: SecilenKunye = {
      kunye,
      miktar,
      fiyat
    };

    const updatedSatir = {
      ...seciliUrunSatir,
      secilenKunyeler: [...seciliUrunSatir.secilenKunyeler, secilenKunye],
      toplamMiktar: seciliUrunSatir.secilenKunyeler.reduce((sum, sk) => sum + sk.miktar, 0) + miktar
    };

    updateUrunSatir(seciliUrunSatir.id, 'secilenKunyeler', updatedSatir.secilenKunyeler);
    updateUrunSatir(seciliUrunSatir.id, 'toplamMiktar', updatedSatir.toplamMiktar);

    setKunyeModalOpen(false);
    setSeciliUrunSatir(null);
  }

  const removeKunye = (satirId: string, kunyeNo: string) => {
    setUrunSatirlari(prev => prev.map(satir => {
      if (satir.id === satirId) {
        const newKunyeler = satir.secilenKunyeler.filter(sk => sk.kunye.kunyeNo !== kunyeNo);
        const newToplamMiktar = newKunyeler.reduce((sum, sk) => sum + sk.miktar, 0);
        return {
          ...satir,
          secilenKunyeler: newKunyeler,
          toplamMiktar: newToplamMiktar
        };
      }
      return satir;
    }));
  }


  useEffect(() => {
    loadCariler()
    loadUrunler()
    loadStokKunyeler()
    loadMalinNitelikleri()
    loadUrunBirimleri()
    loadUretimSekilleri()
  }, [])

  const handleSubmit = async () => {
    if (!seciliCari) {
      toast.error('Lütfen bir cari seçin');
      return;
    }

    if (urunSatirlari.length === 0) {
      toast.error('Lütfen en az bir ürün ekleyin');
      return;
    }

    setLoading(true);
    try {
      // Bildirim kayıt verilerini hazırla - HKS çalışma prensiplerine uygun
      const bildirimler = urunSatirlari.flatMap(satir => 
        satir.secilenKunyeler.map(sk => ({
          uniqueId: `BILDIRIM_${Date.now()}_${sk.kunye.kunyeNo}`,
          bildirimciSifat: '6', // Tüccar Hal İçi
          bildirimTuru: '195', // Satış
          kisiSifat: seciliCari.sifat,
          kisiTcKimlikVergiNo: seciliCari.tcKimlikVergiNo,
          kisiAdSoyadUnvan: seciliCari.unvan,
          kisiEmail: '', // Eposta bilgisi hariç diğer bilgiler zorunlu
          kisiGsmNumarasi: '05551234567', // Zorunlu alan
          yurtDisiMi: false,
          // Çalışma prensiplerine göre kayıtlı olmayan kişi için ek bilgiler
          kisiAdres: 'Test Adres',
          kisiIlId: 6, // Antalya
          kisiIlceId: 1, // Kepez
          kisiBeldeId: 1,
          referansKunyeNo: sk.kunye.kunyeNo,
          malinMiktari: sk.miktar,
          malinSatisFiyat: sk.fiyat,
          gidecekYerIsletmeTuruId: '8', // Hal Dışı İşyeri
          gidecekIsyeriId: 0,
          gidecekUlkeId: 0,
          gidecekYerIlId: 6, // Antalya (zorunlu alan)
          gidecekYerIlceId: 1, // Kepez (zorunlu alan) 
          gidecekYerBeldeId: 1, // Zorunlu alan
          belgeNo: `FATURA_${Date.now()}`, // Satış için belge numarası gerekli
          belgeTipi: 207, // Fatura (kullanıcının verdiği mapping'e göre)
          aracPlakaNo: '' // Plaka bilgisi zorunlu değil, belgeNo veya aracPlakaNo'dan biri yeterli
        }))
      );

      const data = await safeFetch('/api/hks/bildirim/kaydet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bildirimler })
      });

      if (data.ok && data.items) {
        // Başarılı künyeleri güncelle
        data.items.forEach((sonuc: any) => {
          const satir = urunSatirlari.find(s => 
            s.secilenKunyeler.some(sk => sk.kunye.kunyeNo === sonuc.referansKunyeNo)
          );
          if (satir) {
            updateUrunSatir(satir.id, 'satisKunyeNo', sonuc.YeniKunyeNo);
            updateUrunSatir(satir.id, 'basarili', true);
          }
        });

        toast.success(`${data.count} adet bildirim başarıyla kaydedildi!`);
      } else {
        toast.error('Bildirim kaydedilemedi');
      }
    } catch (error: any) {
      console.error('Bildirim kayıt hatası:', error);
      toast.error('Bildirim kaydedilemedi: ' + error?.message);
    } finally {
      setLoading(false);
    }
  }

  const renderKunyeModal = () => (
    <Dialog open={kunyeModalOpen} onOpenChange={setKunyeModalOpen}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Künye Seçimi - {seciliUrunSatir?.urunAdi}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Ürün Bilgileri</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Ürün:</span>
                <p className="font-medium">{seciliUrunSatir?.urunAdi}</p>
              </div>
              <div>
                <span className="text-gray-600">İstenen Miktar:</span>
                <p className="font-medium">{seciliUrunSatir?.miktar} {seciliUrunSatir?.birim}</p>
              </div>
              <div>
                <span className="text-gray-600">Seçilen Miktar:</span>
                <p className="font-medium">{seciliUrunSatir?.toplamMiktar} {seciliUrunSatir?.birim}</p>
              </div>
              <div>
                <span className="text-gray-600">Kalan Miktar:</span>
                <p className="font-medium text-red-600">
                  {(seciliUrunSatir?.miktar || 0) - (seciliUrunSatir?.toplamMiktar || 0)} {seciliUrunSatir?.birim}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Künye No</TableHead>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead>Ürün Cinsi</TableHead>
                  <TableHead>Kalan Miktar</TableHead>
                  <TableHead>Birim</TableHead>
                  <TableHead>Satış Fiyatı</TableHead>
                  <TableHead>Ortalama Fiyat</TableHead>
                  <TableHead>Rüsum Borcu</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stokKunyeler
                  .filter(kunye => kunye.malinAdi === seciliUrunSatir?.urunAdi)
                  .map((kunye) => (
                    <TableRow key={kunye.kunyeNo}>
                      <TableCell className="font-medium">{kunye.kunyeNo}</TableCell>
                      <TableCell>{kunye.malinAdi}</TableCell>
                      <TableCell>{kunye.malinCinsi}</TableCell>
                      <TableCell>{kunye.kalanMiktar}</TableCell>
                      <TableCell>{kunye.miktarBirimiAd}</TableCell>
                      <TableCell>{kunye.malinSatisFiyati} ₺</TableCell>
                      <TableCell>
                        {kunye.ortalamaFiyat ? `${kunye.ortalamaFiyat} ₺` : '-'}
                      </TableCell>
                      <TableCell>
                        {kunye.rusumBorcu ? `${kunye.rusumBorcu} ₺` : '-'}
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => {
                            const miktar = Math.min(
                              parseFloat(kunye.kalanMiktar),
                              (seciliUrunSatir?.miktar || 0) - (seciliUrunSatir?.toplamMiktar || 0)
                            );
                            if (miktar > 0) {
                              selectKunye(kunye, miktar, seciliUrunSatir?.fiyat || 0);
                            }
                          }}
                          size="sm"
                          variant="outline"
                          disabled={
                            (seciliUrunSatir?.miktar || 0) - (seciliUrunSatir?.toplamMiktar || 0) <= 0
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Seç
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )


  return (
    <div className="mt-10 ml-10 mr-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HKS - Bildirim Kayıt</h1>
          <p className="text-muted-foreground mt-2">Stoktaki künyeleri kullanarak bildirim kaydı oluşturun</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard/muhasebe/hks')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Panel - Cari Seçimi */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Müşteri Seçimi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Manuel Kişi Sorgulama */}
              <div className="space-y-3">
                <Label>Manuel Kişi Sorgulama</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="TC/Vergi No girin"
                    value={manuelTcNo}
                    onChange={(e) => setManuelTcNo(e.target.value)}
                  />
                  <Button 
                    onClick={manuelKisiSorgu}
                    variant="outline"
                    size="sm"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Sorgula
                  </Button>
                </div>
                
                {(kayitliKisi || halIciIsyerleri.length > 0) && (
                  <div className="space-y-3">
                    {/* Kişi Bilgileri */}
                    {kayitliKisi && (
                      <div className={`border rounded-lg p-3 ${
                        kayitliKisi.kayitliKisiMi ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <h4 className={`font-semibold mb-2 ${
                          kayitliKisi.kayitliKisiMi ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {kayitliKisi.kayitliKisiMi ? 'Kayıtlı Kişi' : 'Kayıtlı Değil'}
                        </h4>
                        <div className="text-sm space-y-1">
                          <p><span className="text-gray-600">TC/Vergi No:</span> {kayitliKisi.tcKimlikVergiNo}</p>
                          {kayitliKisi.kayitliKisiMi && (
                            <div>
                              <span className="text-gray-600">Sıfatları:</span>
                              <div className="mt-1">
                                {kayitliKisi.sifatlari.map((sifatId, index) => {
                                  const sifat = sifatlar.find(s => s.id === sifatId.toString());
                                  return (
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                                      {sifat?.ad || `Sıfat ${sifatId}`}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {kayitliKisi.kayitliKisiMi && (
                          <Button 
                            onClick={() => {
                              const sifat = sifatlar.find(s => kayitliKisi.sifatlari.includes(parseInt(s.id)));
                              setSeciliCari({
                                tcKimlikVergiNo: kayitliKisi.tcKimlikVergiNo,
                                unvan: `TC: ${kayitliKisi.tcKimlikVergiNo}`,
                                sifat: sifat?.id || kayitliKisi.sifatlari[0].toString()
                              });
                            }}
                            size="sm"
                            className="mt-2 w-full"
                          >
                            Bu Kişiyi Seç
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Hal İçi İşyeri Bilgileri */}
                    {halIciIsyerleri.length > 0 && (
                      <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
                        <h4 className="font-semibold mb-2 text-blue-800">
                          Hal İçi İşyeri ({halIciIsyerleri.length})
                        </h4>
                        <div className="space-y-2">
                          {halIciIsyerleri.map((isyeri, index) => (
                            <div key={index} className="bg-white p-2 rounded border">
                              <div className="text-sm space-y-1">
                                <p><span className="text-gray-600">İşyeri:</span> <span className="font-medium">{isyeri.isyeriAdi}</span></p>
                                <p><span className="text-gray-600">Hal:</span> {isyeri.halAdi}</p>
                                <p><span className="text-gray-600">Hal ID:</span> {isyeri.halId}</p>
                              </div>
                              <Button 
                                onClick={() => {
                                  setSeciliCari({
                                    tcKimlikVergiNo: isyeri.tcKimlikVergiNo,
                                    unvan: isyeri.isyeriAdi,
                                    sifat: '6' // Tüccar Hal İçi
                                  });
                                }}
                                size="sm"
                                className="mt-2 w-full"
                                variant="outline"
                              >
                                Bu İşyerini Seç
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mevcut Cariler */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={loadCariler} 
                    disabled={carilerLoading}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {carilerLoading ? 'Yükleniyor...' : 'Carileri Yükle'}
                  </Button>
                </div>
                
                {cariler.length > 0 && (
                  <div className="space-y-2 mt-3">
                    <Label>Mevcut Cariler</Label>
                    <Select 
                      value={seciliCari?.tcKimlikVergiNo || ''} 
                      onValueChange={(value) => {
                        const cari = cariler.find(c => c.tcKimlikVergiNo === value);
                        setSeciliCari(cari || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cari seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {cariler.map((cari) => (
                          <SelectItem key={cari.tcKimlikVergiNo} value={cari.tcKimlikVergiNo}>
                            {cari.unvan}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {seciliCari && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800 mb-2">Seçilen Cari</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Unvan:</span> {seciliCari.unvan}</p>
                    <p><span className="text-gray-600">TC/Vergi No:</span> {seciliCari.tcKimlikVergiNo}</p>
                    <p><span className="text-gray-600">Sıfat:</span> {seciliCari.sifat}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Orta Panel - Ürün Datagrid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Ürün Listesi
                </div>
                <Button onClick={addUrunSatir} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ürün Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {urunSatirlari.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Henüz ürün eklenmedi</p>
                  <p className="text-sm">Yukarıdaki "Ürün Ekle" butonuna tıklayarak ürün ekleyebilirsiniz</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {urunSatirlari.map((satir) => (
                    <div key={satir.id} className={`border rounded-lg p-4 ${
                      satir.basarili ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}>
                      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
                        <div>
                          <Label>Ürün</Label>
                          <Select 
                            value={satir.urunId} 
                            onValueChange={(value) => {
                              const urun = urunler.find(u => u.id === value);
                              updateUrunSatir(satir.id, 'urunId', value);
                              updateUrunSatir(satir.id, 'urunAdi', urun?.ad || '');
                              // Ürün cinslerini yükle
                              loadUrunCinsleri(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Ürün seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {urunler.map((urun) => (
                                <SelectItem key={urun.id} value={urun.id}>
                                  {urun.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Ürün Cinsi</Label>
                          <Select 
                            value={satir.urunCinsiId} 
                            onValueChange={(value) => {
                              const cins = urunCinsleri.find(c => c.id === value);
                              updateUrunSatir(satir.id, 'urunCinsiId', value);
                              updateUrunSatir(satir.id, 'urunCinsiAdi', cins?.ad || '');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Cins seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {urunCinsleri.map((cins) => (
                                <SelectItem key={cins.id} value={cins.id}>
                                  {cins.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Malın Niteliği</Label>
                          <Select 
                            value={satir.malinNiteligiId} 
                            onValueChange={(value) => {
                              const nitelik = malinNitelikleri.find(n => n.id === value);
                              updateUrunSatir(satir.id, 'malinNiteligiId', value);
                              updateUrunSatir(satir.id, 'malinNiteligiAdi', nitelik?.ad || '');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nitelik seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {malinNitelikleri.map((nitelik) => (
                                <SelectItem key={nitelik.id} value={nitelik.id}>
                                  {nitelik.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Üretim Şekli</Label>
                          <Select 
                            value={satir.uretimSekliId} 
                            onValueChange={(value) => {
                              const sekil = uretimSekilleri.find(s => s.id === value);
                              updateUrunSatir(satir.id, 'uretimSekliId', value);
                              updateUrunSatir(satir.id, 'uretimSekliAdi', sekil?.ad || '');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Şekil seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {uretimSekilleri.map((sekil) => (
                                <SelectItem key={sekil.id} value={sekil.id}>
                                  {sekil.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Miktar</Label>
                          <Input
                            type="number"
                            value={satir.miktar}
                            onChange={(e) => updateUrunSatir(satir.id, 'miktar', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        
                        <div>
                          <Label>Birim</Label>
                          <Select 
                            value={satir.birim} 
                            onValueChange={(value) => updateUrunSatir(satir.id, 'birim', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Birim seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {urunBirimleri.map((birim) => (
                                <SelectItem key={birim.id} value={birim.ad}>
                                  {birim.ad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Fiyat</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={satir.fiyat}
                            onChange={(e) => updateUrunSatir(satir.id, 'fiyat', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => openKunyeModal(satir)}
                            disabled={!satir.urunId || satir.miktar <= 0}
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Künye Seç
                          </Button>
                          
                          <Button 
                            onClick={() => removeUrunSatir(satir.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Seçilen Künyeler */}
                      {satir.secilenKunyeler.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="font-semibold mb-2">Seçilen Künyeler:</h5>
                          <div className="space-y-2">
                            {satir.secilenKunyeler.map((sk, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="font-medium">Künye: {sk.kunye.kunyeNo}</span>
                                  <span>Miktar: {sk.miktar} {satir.birim}</span>
                                  <span>Fiyat: {sk.fiyat} ₺</span>
                                </div>
                                <Button 
                                  onClick={() => removeKunye(satir.id, sk.kunye.kunyeNo)}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-600">Toplam Seçilen: </span>
                            <span className="font-medium">{satir.toplamMiktar} {satir.birim}</span>
                            <span className="text-gray-600 ml-4">Kalan: </span>
                            <span className="font-medium text-red-600">
                              {satir.miktar - satir.toplamMiktar} {satir.birim}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Satış Künye No */}
                      {satir.basarili && satir.satisKunyeNo && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-green-800">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-semibold">Başarılı!</span>
                            </div>
                            <p className="text-sm mt-1">
                              <span className="text-gray-600">Satış Künye No:</span> 
                              <span className="font-medium ml-2">{satir.satisKunyeNo}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading || !seciliCari || urunSatirlari.length === 0}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Bildirimleri Kaydet'}
        </Button>
      </div>

      {/* Künye Seçim Modal */}
      {renderKunyeModal()}
    </div>
  )
}
