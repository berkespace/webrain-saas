// HKS (Hal Kayıt Sistemi) Web Servisleri Entegrasyonu
// Ticaret Bakanlığı HKS web servisleri

import { XMLParser } from 'fast-xml-parser';

// HKS Web Service Configuration
const HKS_CONFIG = {
  bildirimServiceUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
  genelServiceUrl: 'https://hks.hal.gov.tr/WebServices/GenelService.svc',
  username: process.env.HKS_USERNAME || '',
  password: process.env.HKS_PASSWORD || '',
  webservice: process.env.HKS_WEBSERVICE || '',
  servicePassword: process.env.HKS_WEBSERVICE || '!1QAZWSX' // HKS_WEBSERVICE değerini ServicePassword olarak kullan
};

// Debug: Environment variables kontrolü
console.log('HKS Config:', {
  username: HKS_CONFIG.username ? 'SET' : 'NOT SET',
  password: HKS_CONFIG.password ? 'SET' : 'NOT SET',
  webservice: HKS_CONFIG.webservice ? 'SET' : 'NOT SET',
  servicePassword: HKS_CONFIG.servicePassword
});

export interface HksKunye {
  id: string
  kunyeNo: string
  hayvanTuru: string
  irk: string
  cinsiyet: string
  dogumTarihi: string
  sahipAdi: string
  sahipTc: string
  kayitTarihi: string
  durum: string
}

export interface HksKunyeDetay extends HksKunye {
  dogumYeri: string
  sahipAdres: string
  notlar: string
  geçmişİşlemler: Array<{
    tarih: string
    işlem: string
    açıklama: string
  }>
}

export interface HksServiceStatus {
  bildirimService: {
    url: string
    status: string
    lastCheck: string
  }
  genelService: {
    url: string
    status: string
    lastCheck: string
  }
}

// SOAP Request Builder - HKS Kılavuzuna göre
function buildSoapRequest(serviceUrl: string, method: string, parameters: any): string {
  // Objeleri XML'e çeviren recursive fonksiyon
  function objectToXml(obj: any, key: string = ''): string {
    if (typeof obj === 'object' && obj !== null) {
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        return ''; // Boş obje için boş string döndür
      }
      return keys
        .map(k => `<${k}>${objectToXml(obj[k], k)}</${k}>`)
        .join('');
    }
    return obj.toString();
  }

  const soapBody = Object.keys(parameters)
    .map(key => `<${key}>${objectToXml(parameters[key], key)}</${key}>`)
    .join('');

  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.gtb.gov.tr//WebServices">
  <soap:Body>
    <tns:${method}>
      <tns:UserName>${HKS_CONFIG.username}</tns:UserName>
      <tns:Password>${HKS_CONFIG.password}</tns:Password>
      <tns:ServicePassword>${HKS_CONFIG.servicePassword}</tns:ServicePassword>
      ${soapBody}
    </tns:${method}>
  </soap:Body>
</soap:Envelope>`;

  // Debug: SOAP request'i logla
  console.log('SOAP Request:', {
    method,
    serviceUrl,
    soapAction: `http://hks.hal.gov.tr/WebServices/IBildirimService/${method}`,
    requestBody: soapRequest.substring(0, 500) + '...'
  });

  return soapRequest;
}

// SOAP Response Parser
function parseSoapResponse(xmlResponse: string, method: string): any {
  try {
    // Debug: Response'u logla
    console.log('SOAP Response:', {
      method,
      responseLength: xmlResponse.length,
      responsePreview: xmlResponse.substring(0, 500) + '...'
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text"
    });
    
    const parsed = parser.parse(xmlResponse);
    const soapBody = parsed['soap:Envelope']?.['soap:Body'];
    
    // Debug: Parsed response'u logla
    console.log('Parsed SOAP Body:', soapBody);
    
    if (soapBody?.[`tns:${method}Response`]) {
      return soapBody[`tns:${method}Response`];
    }
    
    return null;
  } catch (error) {
    console.error('SOAP Response parsing error:', error);
    return null;
  }
}

export class HksService {
  private static readonly BILDIRIM_SERVICE_URL = 'https://hks.hal.gov.tr/WebServices/BildirimService.svc?wsdl'
  private static readonly GENEL_SERVICE_URL = 'https://hks.hal.gov.tr/WebServices/GenelService.svc?wsdl'
  
  // HKS servislerine bağlantı testi
  static async testConnection(): Promise<HksServiceStatus> {
    try {
      console.log('HKS testConnection başlıyor...');
      
      // BildirimService test
      console.log('BildirimService test ediliyor...');
      const bildirimStatus = await this.testBildirimService()
      console.log('BildirimService test sonucu:', bildirimStatus);
      
      // GenelService test
      console.log('GenelService test ediliyor...');
      const genelStatus = await this.testGenelService()
      console.log('GenelService test sonucu:', genelStatus);
      
      const result = {
        bildirimService: {
          url: this.BILDIRIM_SERVICE_URL,
          status: bildirimStatus ? 'Bağlantı başarılı' : 'Bağlantı başarısız',
          lastCheck: new Date().toISOString()
        },
        genelService: {
          url: this.GENEL_SERVICE_URL,
          status: genelStatus ? 'Bağlantı başarılı' : 'Bağlantı başarısız',
          lastCheck: new Date().toISOString()
        }
      };
      
      console.log('HKS testConnection sonucu:', result);
      return result;
    } catch (error) {
      console.error('HKS bağlantı testi hatası:', error)
      throw new Error('HKS servislerine bağlanılamadı')
    }
  }

  // BildirimService bağlantı testi - Bildirim Türleri Listesi ile (PHP örneğine göre)
  private static async testBildirimService(): Promise<boolean> {
    try {
      const soapRequest = buildSoapRequest(
        HKS_CONFIG.bildirimServiceUrl,
        'BildirimTurleriListesi',
        {
          UserName: HKS_CONFIG.username,
          Password: HKS_CONFIG.password,
          ServicePassword: HKS_CONFIG.servicePassword,
          Istek: {}
        }
      );

      console.log('BildirimService test başlıyor...');
      
      const response = await fetch(`${HKS_CONFIG.bildirimServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://www.gtb.gov.tr//WebServices/IBildirimService/BildirimTurleriListesi`
        },
        body: soapRequest
      });

      console.log('BildirimService response status:', response.status);
      console.log('BildirimService response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('BildirimService HTTP hatası:', response.status, errorText);
        return false;
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'BildirimTurleriListesi');
      
      if (parsedResponse?.BildirimTurleriListesiResult) {
        const result = parsedResponse.BildirimTurleriListesiResult;
        return result.IslemKodu === '1';
      }
      
      return false;
    } catch (error) {
      console.error('BildirimService test hatası:', error)
      return false
    }
  }

  // GenelService bağlantı testi - İller Listesi ile (PHP örneğine göre)
  private static async testGenelService(): Promise<boolean> {
    try {
      const soapRequest = buildSoapRequest(
        HKS_CONFIG.genelServiceUrl,
        'GenelServisIller',
        {
          UserName: HKS_CONFIG.username,
          Password: HKS_CONFIG.password,
          ServicePassword: HKS_CONFIG.servicePassword,
          Istek: {}
        }
      );

      const response = await fetch(`${HKS_CONFIG.genelServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://www.gtb.gov.tr//WebServices/IGenelService/GenelServisIller`
        },
        body: soapRequest
      });

      if (!response.ok) {
        return false;
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'GenelServisIller');
      
      if (parsedResponse?.GenelServisIllerResult) {
        const result = parsedResponse.GenelServisIllerResult;
        return result.IslemKodu === '1';
      }
      
      return false;
    } catch (error) {
      console.error('GenelService test hatası:', error)
      return false
    }
  }

  // Bildirimcinin Yaptığı Bildirimleri Sorgulama Servisi - PHP örneğine göre
  static async getKunyeListesi(params: {
    page: number
    limit: number
    search: string
  }): Promise<{ kunyeler: HksKunye[], total: number }> {
    try {
      // BildirimSorguIstek parametreleri (PHP örneğine göre)
      const parameters: any = {
        Istek: {
          KunyeTuru: 1,
          KunyeNo: 0,
          BaslangicTarihi: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 ay önce
          BitisTarihi: new Date().toISOString().split('T')[0], // Bugün
          KalanMiktariSifirdanBuyukOlanlar: true
        }
      };
      
      // Arama parametreleri
      if (params.search) {
        // Künye No ile arama
        if (params.search.startsWith('TR') || /^\d+$/.test(params.search)) {
          parameters.Istek.KunyeNo = params.search;
        }
      }

      const soapRequest = buildSoapRequest(
        HKS_CONFIG.bildirimServiceUrl,
        'BaseRequestMessageOf_BildirimSorguIstek',
        parameters
      );

      const response = await fetch(`${HKS_CONFIG.bildirimServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://hks.hal.gov.tr/WebServices/IBildirimService/BaseRequestMessageOf_BildirimSorguIstek`
        },
        body: soapRequest
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'BaseRequestMessageOf_BildirimSorguIstek');

      // HKS response kontrolü (PHP örneğine göre)
      if (parsedResponse?.BaseRequestMessageOf_BildirimSorguIstekResult) {
        const result = parsedResponse.BaseRequestMessageOf_BildirimSorguIstekResult;
        
        // İşlem kodu kontrolü
        if (result.IslemKodu !== '1') {
          throw new Error(`HKS Hatası: ${result.HataKodlari || 'Bilinmeyen hata'}`);
        }

        // Bildirimler array'ini kontrol et
        const bildirimler = Array.isArray(result.Bildirimler) 
          ? result.Bildirimler 
          : result.Bildirimler ? [result.Bildirimler] : [];
        
        return {
          kunyeler: bildirimler.map((item: any, index: number) => ({
            id: item.Id || index.toString(),
            kunyeNo: item.KunyeNo || '',
            hayvanTuru: item.UrunAdi || item.MalAdi || '',
            irk: item.UrunCinsi || '',
            cinsiyet: item.Cinsiyet || '',
            dogumTarihi: item.UretimTarihi || item.BildirimTarihi || '',
            sahipAdi: item.MalinSahibiAdi || item.SahipAdi || '',
            sahipTc: item.MalinSahibiTcKimlikNo || item.SahipTc || '',
            kayitTarihi: item.BildirimTarihi || '',
            durum: item.Durum || 'Aktif'
          })),
          total: bildirimler.length
        };
      } else {
        throw new Error('Künye listesi alınamadı');
      }
    } catch (error) {
      console.error('Künye listesi çekme hatası:', error)
      throw error; // Gerçek hatayı fırlat
    }
  }

  // Künye detayı çekme - Bildirimcinin Yaptığı Bildirimleri Sorgulama Servisi ile (PHP örneğine göre)
  static async getKunyeDetay(kunyeNo: string): Promise<HksKunyeDetay> {
    try {
      // BildirimSorguIstek parametreleri (PHP örneğine göre)
      const parameters: any = {
        Istek: {
          KunyeTuru: 1,
          KunyeNo: kunyeNo, // Belirli künye no için
          BaslangicTarihi: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 yıl önce
          BitisTarihi: new Date().toISOString().split('T')[0], // Bugün
          KalanMiktariSifirdanBuyukOlanlar: false // Tüm kayıtları getir
        }
      };

      const soapRequest = buildSoapRequest(
        HKS_CONFIG.bildirimServiceUrl,
        'BaseRequestMessageOf_BildirimSorguIstek',
        parameters
      );

      const response = await fetch(`${HKS_CONFIG.bildirimServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://hks.hal.gov.tr/WebServices/IBildirimService/BaseRequestMessageOf_BildirimSorguIstek`
        },
        body: soapRequest
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'BaseRequestMessageOf_BildirimSorguIstek');

      if (parsedResponse?.BaseRequestMessageOf_BildirimSorguIstekResult) {
        const result = parsedResponse.BaseRequestMessageOf_BildirimSorguIstekResult;
        
        // İşlem kodu kontrolü
        if (result.IslemKodu !== '1') {
          throw new Error(`HKS Hatası: ${result.HataKodlari || 'Bilinmeyen hata'}`);
        }

        const bildirimler = Array.isArray(result.Bildirimler) 
          ? result.Bildirimler 
          : result.Bildirimler ? [result.Bildirimler] : [];

        if (bildirimler.length === 0) {
          throw new Error('Künye detayı bulunamadı');
        }

        // İlk bildirimi detay olarak kullan
        const item = bildirimler[0];
        
        return {
          id: item.Id || '1',
          kunyeNo: item.KunyeNo || kunyeNo,
          hayvanTuru: item.UrunAdi || item.MalAdi || '',
          irk: item.UrunCinsi || '',
          cinsiyet: item.Cinsiyet || '',
          dogumTarihi: item.UretimTarihi || item.BildirimTarihi || '',
          dogumYeri: item.UretimIlAdi || '',
          sahipAdi: item.MalinSahibiAdi || '',
          sahipTc: item.MalinSahibiTcKimlikNo || '',
          sahipAdres: item.MalinSahibiAdres || '',
          kayitTarihi: item.BildirimTarihi || '',
          durum: item.Durum || 'Aktif',
          notlar: item.Notlar || '',
          geçmişİşlemler: bildirimler.map((bildirim: any) => ({
            tarih: bildirim.BildirimTarihi || '',
            işlem: bildirim.BildirimTuru || '',
            açıklama: `${bildirim.UrunAdi || bildirim.MalAdi} - ${bildirim.Miktar} ${bildirim.Birim}`
          }))
        };
      } else {
        throw new Error('Künye detayı alınamadı');
      }
    } catch (error) {
      console.error('Künye detayı çekme hatası:', error)
      throw error; // Gerçek hatayı fırlat
    }
  }


  // Mock data fonksiyonları (geliştirme aşamasında) - HKS'ye uygun
  private static getMockKunyeListesi(params: { page: number, limit: number, search: string }): { kunyeler: HksKunye[], total: number } {
    const mockKunyeler: HksKunye[] = [
      {
        id: '1',
        kunyeNo: 'TR001234567890',
        hayvanTuru: 'Domates',
        irk: 'Sera Domatesi',
        cinsiyet: '',
        dogumTarihi: '2024-01-15',
        sahipAdi: 'Ahmet Yılmaz',
        sahipTc: '12345678901',
        kayitTarihi: '2024-01-20',
        durum: 'Aktif'
      },
      {
        id: '2',
        kunyeNo: 'TR001234567891',
        hayvanTuru: 'Salatalık',
        irk: 'Hıyar',
        cinsiyet: '',
        dogumTarihi: '2024-02-10',
        sahipAdi: 'Mehmet Demir',
        sahipTc: '12345678902',
        kayitTarihi: '2024-02-15',
        durum: 'Aktif'
      },
      {
        id: '3',
        kunyeNo: 'TR001234567892',
        hayvanTuru: 'Patlıcan',
        irk: 'Klasik Patlıcan',
        cinsiyet: '',
        dogumTarihi: '2024-03-05',
        sahipAdi: 'Fatma Kaya',
        sahipTc: '12345678903',
        kayitTarihi: '2024-03-10',
        durum: 'Aktif'
      },
      {
        id: '4',
        kunyeNo: 'TR001234567893',
        hayvanTuru: 'Biber',
        irk: 'Dolmalık Biber',
        cinsiyet: '',
        dogumTarihi: '2024-03-15',
        sahipAdi: 'Ali Özkan',
        sahipTc: '12345678904',
        kayitTarihi: '2024-03-20',
        durum: 'Aktif'
      },
      {
        id: '5',
        kunyeNo: 'TR001234567894',
        hayvanTuru: 'Soğan',
        irk: 'Kuru Soğan',
        cinsiyet: '',
        dogumTarihi: '2024-04-01',
        sahipAdi: 'Ayşe Çelik',
        sahipTc: '12345678905',
        kayitTarihi: '2024-04-05',
        durum: 'Aktif'
      }
    ]

    // Arama filtresi uygula
    let filteredKunyeler = mockKunyeler
    if (params.search) {
      filteredKunyeler = mockKunyeler.filter(kunye => 
        kunye.kunyeNo.toLowerCase().includes(params.search.toLowerCase()) ||
        kunye.sahipAdi.toLowerCase().includes(params.search.toLowerCase()) ||
        kunye.sahipTc.includes(params.search)
      )
    }

    // Sayfalama uygula
    const startIndex = (params.page - 1) * params.limit
    const endIndex = startIndex + params.limit
    const paginatedKunyeler = filteredKunyeler.slice(startIndex, endIndex)

    return {
      kunyeler: paginatedKunyeler,
      total: filteredKunyeler.length
    }
  }

  private static getMockKunyeDetay(kunyeNo: string): HksKunyeDetay {
    return {
      id: '1',
      kunyeNo: kunyeNo,
      hayvanTuru: 'Domates',
      irk: 'Sera Domatesi',
      cinsiyet: '',
      dogumTarihi: '2024-01-15',
      dogumYeri: 'Antalya',
      sahipAdi: 'Ahmet Yılmaz',
      sahipTc: '12345678901',
      sahipAdres: 'Antalya Merkez, Kepez Mahallesi, No: 123',
      kayitTarihi: '2024-01-20',
      durum: 'Aktif',
      notlar: 'Organik tarım sertifikalı, kalite kontrolü yapılmış',
      geçmişİşlemler: [
        {
          tarih: '2024-01-20',
          işlem: 'Satın Alım',
          açıklama: 'Domates - 1000 KG'
        },
        {
          tarih: '2024-01-25',
          işlem: 'Sevk Etme',
          açıklama: 'Domates - 500 KG'
        },
        {
          tarih: '2024-02-01',
          işlem: 'Satış',
          açıklama: 'Domates - 300 KG'
        },
        {
          tarih: '2024-02-05',
          işlem: 'Sevk Etme',
          açıklama: 'Domates - 200 KG'
        }
      ]
    }
  }
}
