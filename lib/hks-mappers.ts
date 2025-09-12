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
    id: String(b?.['b:KunyeNo'] ?? b?.KunyeNo ?? i + 1),
    kunyeNo: b?.['b:KunyeNo'] ?? b?.KunyeNo ?? '',
    urunAdi: b?.['b:MalinAdi'] ?? b?.MalinAdi ?? '',
    urunTuru: b?.['b:MalinTuru'] ?? b?.MalinTuru ?? '',
    urunCinsi: b?.['b:MalinCinsi'] ?? b?.MalinCinsi ?? '',
    miktar: b?.['b:MalinMiktari'] ?? b?.MalinMiktari ?? '',
    kalanMiktar: b?.['b:KalanMiktar'] ?? b?.KalanMiktar ?? '',
    birimId: b?.['b:MiktarBirimId'] ?? b?.MiktarBirimId ?? '',
    birimAd: b?.['b:MiktarBirimiAd'] ?? b?.MiktarBirimiAd ?? '',
    fiyat: b?.['b:MalinSatisFiyati'] ?? b?.MalinSatisFiyati ?? '',
    bildirimTarihi: b?.['b:BildirimTarihi'] ?? b?.BildirimTarihi ?? '',
    bildirimTuru: b?.['b:BildirimTuru'] ?? b?.BildirimTuru ?? '',
    bildirimciTc: b?.['b:BildirimciTcKimlikVergiNo'] ?? b?.BildirimciTcKimlikVergiNo ?? '',
    malinSahibiTc: b?.['b:MalinSahibiTcKimlikVergiNo'] ?? b?.MalinSahibiTcKimlikVergiNo ?? '',
    ureticiTc: b?.['b:UreticiTcKimlikVergiNo'] ?? b?.UreticiTcKimlikVergiNo ?? '',
    aracPlaka: b?.['b:AracPlakaNo'] ?? b?.AracPlakaNo ?? '',
    belgeNo: b?.['b:BelgeNo'] ?? b?.BelgeNo ?? '',
    belgeTipi: b?.['b:BelgeTipi'] ?? b?.BelgeTipi ?? '',
    sifati: b?.['b:Sifat'] ?? b?.Sifat ?? '',
    gidecekIsyeriId: b?.['b:GidecekIsyeriId'] ?? b?.GidecekIsyeriId ?? '',
    gidecekYerTuruId: b?.['b:GidecekYerTuruId'] ?? b?.GidecekYerTuruId ?? '',
    analizStatus: b?.['b:AnalizStatus'] ?? b?.AnalizStatus ?? '',
    rusumMiktari: b?.['b:RusumMiktari'] ?? b?.RusumMiktari ?? '',
    uniqueId: b?.['b:UniqueId'] ?? b?.UniqueId ?? '',
    malinKodNo: b?.['b:MalinKodNo'] ?? b?.MalinKodNo ?? '',
    malinCinsKodNo: b?.['b:MalinCinsKodNo'] ?? b?.MalinCinsKodNo ?? '',
    malinTuruKodNo: b?.['b:MalinTuruKodNo'] ?? b?.MalinTuruKodNo ?? '',
    durum: 'Aktif', // Default status
  }));

  return { islemKodu, items };
}
