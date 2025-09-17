import { parseSoap } from '@/app/lib/hks-soap';
import { XMLParser } from 'fast-xml-parser';

function toArray<T>(item: T | T[] | undefined): T[] {
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

export async function mapBildirimciyeYapilan(xml: string) {
  const parsed = await parseSoap(xml, 'BildirimServisBildirimciyeYapilanBildirimListesi');
  
  if (!parsed.ok) {
    throw new Error(parsed.error || 'SOAP parsing failed');
  }

  const { islemKodu, hataKodlari, sonuc } = parsed;

  if (hataKodlari && !hataKodlari['@_i:nil']) {
    const msg = Array.isArray(hataKodlari) 
      ? hataKodlari.map((h: any) => `${h.Mesaj ?? ''}[${h.HataKodu ?? ''}]`).join(' | ')
      : 'HKS hata döndü';
    throw new Error(msg || 'HKS hata döndü');
  }
  
  if (!sonuc) return { islemKodu, items: [] };

  // BildirimServisBildirimciyeYapilanBildirimListesi de aynı yapıyı kullanıyor
  // sorgu API'si gibi mapping yapalım
  const bildirimler = sonuc?.['a:Bildirimler'] || sonuc?.Bildirimler;
  const bildirimlerArray = Array.isArray(bildirimler) ? bildirimler : (bildirimler ? [bildirimler] : []);
  
  // Parse each b:BildirimSorguDTO XML string (sorgu API'si gibi)
  const arr = [];
  for (const item of bildirimlerArray) {
    const dtoXml = item?.['b:BildirimSorguDTO'];
    if (dtoXml && typeof dtoXml === 'string') {
      // Parse the XML string to get the actual data
      const parser = new XMLParser({ 
        ignoreAttributes: false, 
        attributeNamePrefix: '@_', 
        textNodeName: '#text',
        parseAttributeValue: false,
        parseTagValue: true
      });
      const parsed = parser.parse(dtoXml);
      const dto = parsed['b:BildirimSorguDTO'] || parsed;
      arr.push(dto);
    } else if (dtoXml && typeof dtoXml === 'object') {
      // If it's already an object, use it directly
      if (Array.isArray(dtoXml)) {
        arr.push(...dtoXml);
      } else {
        arr.push(dtoXml);
      }
    }
  }

  const items = arr.map((b: any, i: number) => ({
    // Temel bilgiler
    id: String(b?.['b:KunyeNo'] ?? b?.KunyeNo ?? i + 1),
    kunyeNo: b?.['b:KunyeNo'] ?? b?.KunyeNo ?? '',
    
    // Ürün bilgileri
    malinKodNo: b?.['b:MalinKodNo'] ?? b?.MalinKodNo ?? '',
    malinAdi: b?.['b:MalinAdi'] ?? b?.MalinAdi ?? '',
    malinCinsKodNo: b?.['b:MalinCinsKodNo'] ?? b?.MalinCinsKodNo ?? '',
    malinCinsi: b?.['b:MalinCinsi'] ?? b?.MalinCinsi ?? '',
    malinMiktari: b?.['b:MalinMiktari'] ?? b?.MalinMiktari ?? '',
    malinSatisFiyati: b?.['b:MalinSatisFiyati'] ?? b?.MalinSatisFiyati ?? '',
    malinTuruKodNo: b?.['b:MalinTuruKodNo'] ?? b?.MalinTuruKodNo ?? '',
    malinTuru: b?.['b:MalinTuru'] ?? b?.MalinTuru ?? '',
    
    // Miktar ve birim bilgileri
    miktarBirimId: b?.['b:MiktarBirimId'] ?? b?.MiktarBirimId ?? '',
    miktarBirimiAd: b?.['b:MiktarBirimiAd'] ?? b?.MiktarBirimiAd ?? '',
    kalanMiktar: b?.['b:KalanMiktar'] ?? b?.KalanMiktar ?? '',
    
    // Bildirim bilgileri
    bildirimTarihi: b?.['b:BildirimTarihi'] ?? b?.BildirimTarihi ?? '',
    bildirimTuru: b?.['b:BildirimTuru'] ?? b?.BildirimTuru ?? '',
    bildirimciTcKimlikVergiNo: b?.['b:BildirimciTcKimlikVergiNo'] ?? b?.BildirimciTcKimlikVergiNo ?? '',
    
    // Kişi bilgileri
    malinSahibiTcKimlikVergiNo: b?.['b:MalinSahibiTcKimlikVergiNo'] ?? b?.MalinSahibiTcKimlikVergiNo ?? '',
    ureticiTcKimlikVergiNo: b?.['b:UreticiTcKimlikVergiNo'] ?? b?.UreticiTcKimlikVergiNo ?? '',
    
    // Araç ve belge bilgileri
    aracPlakaNo: b?.['b:AracPlakaNo'] ?? b?.AracPlakaNo ?? '',
    belgeNo: b?.['b:BelgeNo'] ?? b?.BelgeNo ?? '',
    belgeTipi: b?.['b:BelgeTipi'] ?? b?.BelgeTipi ?? '',
    
    // Sıfat ve yer bilgileri
    sifat: b?.['b:Sifat'] ?? b?.Sifat ?? '',
    gidecekYerTuruId: b?.['b:GidecekYerTuruId'] ?? b?.GidecekYerTuruId ?? '',
    gidecekIsyeriId: b?.['b:GidecekIsyeriId'] ?? b?.GidecekIsyeriId ?? '',
    
    // Diğer bilgiler
    uniqueId: b?.['b:UniqueId'] ?? b?.UniqueId ?? '',
    analizStatus: b?.['b:AnalizStatus'] ?? b?.AnalizStatus ?? '',
    rusumMiktari: b?.['b:RusumMiktari'] ?? b?.RusumMiktari ?? '',
    
    // Geriye uyumluluk için eski alanlar (deprecated)
    urunAdi: b?.['b:MalinAdi'] ?? b?.MalinAdi ?? '',
    urunTuru: b?.['b:MalinTuru'] ?? b?.MalinTuru ?? '',
    urunCinsi: b?.['b:MalinCinsi'] ?? b?.MalinCinsi ?? '',
    miktar: b?.['b:MalinMiktari'] ?? b?.MalinMiktari ?? '',
    birimId: b?.['b:MiktarBirimId'] ?? b?.MiktarBirimId ?? '',
    birimAd: b?.['b:MiktarBirimiAd'] ?? b?.MiktarBirimiAd ?? '',
    fiyat: b?.['b:MalinSatisFiyati'] ?? b?.MalinSatisFiyati ?? '',
    bildirimciTc: b?.['b:BildirimciTcKimlikVergiNo'] ?? b?.BildirimciTcKimlikVergiNo ?? '',
    malinSahibiTc: b?.['b:MalinSahibiTcKimlikVergiNo'] ?? b?.MalinSahibiTcKimlikVergiNo ?? '',
    ureticiTc: b?.['b:UreticiTcKimlikVergiNo'] ?? b?.UreticiTcKimlikVergiNo ?? '',
    aracPlaka: b?.['b:AracPlakaNo'] ?? b?.AracPlakaNo ?? '',
    sifati: b?.['b:Sifat'] ?? b?.Sifat ?? '',
    malinKodNo: b?.['b:MalinKodNo'] ?? b?.MalinKodNo ?? '',
    malinCinsKodNo: b?.['b:MalinCinsKodNo'] ?? b?.MalinCinsKodNo ?? '',
    malinTuruKodNo: b?.['b:MalinTuruKodNo'] ?? b?.MalinTuruKodNo ?? '',
    durum: 'Aktif', // Default status
  }));

  return { islemKodu, items };
}
