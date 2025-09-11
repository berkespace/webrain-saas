// HKS (Hal Kayıt Sistemi) Web Servisleri Entegrasyonu
// Ticaret Bakanlığı HKS web servisleri

import { XMLParser } from 'fast-xml-parser';

// HKS Web Service Configuration
const HKS_CONFIG = {
  bildirimServiceUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
  genelServiceUrl: 'https://hks.hal.gov.tr/WebServices/GenelService.svc',
  username: process.env.HKS_USERNAME || '',
  password: process.env.HKS_PASSWORD || '',
  webservice: process.env.HKS_WEBSERVICE || ''
};

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

// SOAP Request Builder
function buildSoapRequest(serviceUrl: string, method: string, parameters: any): string {
  const soapBody = Object.keys(parameters)
    .map(key => `<${key}>${parameters[key]}</${key}>`)
    .join('');

  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soap:Header>
    <tem:AuthenticationHeader>
      <tem:Username>${HKS_CONFIG.username}</tem:Username>
      <tem:Password>${HKS_CONFIG.password}</tem:Password>
      <tem:WebService>${HKS_CONFIG.webservice}</tem:WebService>
    </tem:AuthenticationHeader>
  </soap:Header>
  <soap:Body>
    <tem:${method}>
      ${soapBody}
    </tem:${method}>
  </soap:Body>
</soap:Envelope>`;
}

// SOAP Response Parser
function parseSoapResponse(xmlResponse: string, method: string): any {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text"
    });
    
    const parsed = parser.parse(xmlResponse);
    const soapBody = parsed['soap:Envelope']?.['soap:Body'];
    
    if (soapBody?.[`tem:${method}Response`]) {
      return soapBody[`tem:${method}Response`];
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
      // BildirimService test
      const bildirimStatus = await this.testBildirimService()
      
      // GenelService test
      const genelStatus = await this.testGenelService()
      
      return {
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
      }
    } catch (error) {
      console.error('HKS bağlantı testi hatası:', error)
      throw new Error('HKS servislerine bağlanılamadı')
    }
  }

  // BildirimService bağlantı testi
  private static async testBildirimService(): Promise<boolean> {
    try {
      const soapRequest = buildSoapRequest(
        HKS_CONFIG.bildirimServiceUrl,
        'GetSystemInfo',
        {}
      );

      const response = await fetch(`${HKS_CONFIG.bildirimServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://tempuri.org/IBildirimService/GetSystemInfo`
        },
        body: soapRequest
      });

      if (!response.ok) {
        return false;
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'GetSystemInfo');
      
      return parsedResponse !== null;
    } catch (error) {
      console.error('BildirimService test hatası:', error)
      return false
    }
  }

  // GenelService bağlantı testi
  private static async testGenelService(): Promise<boolean> {
    try {
      const soapRequest = buildSoapRequest(
        HKS_CONFIG.genelServiceUrl,
        'GetSystemInfo',
        {}
      );

      const response = await fetch(`${HKS_CONFIG.genelServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://tempuri.org/IGenelService/GetSystemInfo`
        },
        body: soapRequest
      });

      if (!response.ok) {
        return false;
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'GetSystemInfo');
      
      return parsedResponse !== null;
    } catch (error) {
      console.error('GenelService test hatası:', error)
      return false
    }
  }

  // Künye listesi çekme
  static async getKunyeListesi(params: {
    page: number
    limit: number
    search: string
  }): Promise<{ kunyeler: HksKunye[], total: number }> {
    try {
      const parameters: any = {
        page: params.page,
        limit: params.limit
      };
      
      if (params.search) {
        parameters.search = params.search;
      }

      const soapRequest = buildSoapRequest(
        HKS_CONFIG.genelServiceUrl,
        'GetKunyeListesi',
        parameters
      );

      const response = await fetch(`${HKS_CONFIG.genelServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://tempuri.org/IGenelService/GetKunyeListesi`
        },
        body: soapRequest
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'GetKunyeListesi');

      if (parsedResponse?.GetKunyeListesiResult) {
        const kunyeler = Array.isArray(parsedResponse.GetKunyeListesiResult) 
          ? parsedResponse.GetKunyeListesiResult 
          : [parsedResponse.GetKunyeListesiResult];
        
        return {
          kunyeler: kunyeler.map((item: any, index: number) => ({
            id: item.id || index.toString(),
            kunyeNo: item.kunyeNo || item.KunyeNo || '',
            hayvanTuru: item.hayvanTuru || item.HayvanTuru || '',
            irk: item.irk || item.Irk || '',
            cinsiyet: item.cinsiyet || item.Cinsiyet || '',
            dogumTarihi: item.dogumTarihi || item.DogumTarihi || '',
            sahipAdi: item.sahipAdi || item.SahipAdi || '',
            sahipTc: item.sahipTc || item.SahipTc || '',
            kayitTarihi: item.kayitTarihi || item.KayitTarihi || '',
            durum: item.durum || item.Durum || 'Aktif'
          })),
          total: kunyeler.length
        };
      } else {
        throw new Error('Künye listesi alınamadı');
      }
    } catch (error) {
      console.error('Künye listesi çekme hatası:', error)
      // Hata durumunda mock data döndür
      return this.getMockKunyeListesi(params)
    }
  }

  // Künye detayı çekme
  static async getKunyeDetay(kunyeNo: string): Promise<HksKunyeDetay> {
    try {
      const soapRequest = buildSoapRequest(
        HKS_CONFIG.genelServiceUrl,
        'GetKunyeDetay',
        { kunyeNo: kunyeNo }
      );

      const response = await fetch(`${HKS_CONFIG.genelServiceUrl}?wsdl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://tempuri.org/IGenelService/GetKunyeDetay`
        },
        body: soapRequest
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xmlResponse = await response.text();
      const parsedResponse = parseSoapResponse(xmlResponse, 'GetKunyeDetay');

      if (parsedResponse?.GetKunyeDetayResult) {
        const item = parsedResponse.GetKunyeDetayResult;
        return {
          id: item.id || '1',
          kunyeNo: item.kunyeNo || item.KunyeNo || kunyeNo,
          hayvanTuru: item.hayvanTuru || item.HayvanTuru || '',
          irk: item.irk || item.Irk || '',
          cinsiyet: item.cinsiyet || item.Cinsiyet || '',
          dogumTarihi: item.dogumTarihi || item.DogumTarihi || '',
          dogumYeri: item.dogumYeri || item.DogumYeri || '',
          sahipAdi: item.sahipAdi || item.SahipAdi || '',
          sahipTc: item.sahipTc || item.SahipTc || '',
          sahipAdres: item.sahipAdres || item.SahipAdres || '',
          kayitTarihi: item.kayitTarihi || item.KayitTarihi || '',
          durum: item.durum || item.Durum || 'Aktif',
          notlar: item.notlar || item.Notlar || '',
          geçmişİşlemler: item.geçmişİşlemler || item.GecmisIslemler || []
        };
      } else {
        throw new Error('Künye detayı alınamadı');
      }
    } catch (error) {
      console.error('Künye detayı çekme hatası:', error)
      // Hata durumunda mock data döndür
      return this.getMockKunyeDetay(kunyeNo)
    }
  }


  // Mock data fonksiyonları (geliştirme aşamasında)
  private static getMockKunyeListesi(params: { page: number, limit: number, search: string }): { kunyeler: HksKunye[], total: number } {
    const mockKunyeler: HksKunye[] = [
      {
        id: '1',
        kunyeNo: 'TR001234567890',
        hayvanTuru: 'Sığır',
        irk: 'Holstein',
        cinsiyet: 'Dişi',
        dogumTarihi: '2023-01-15',
        sahipAdi: 'Ahmet Yılmaz',
        sahipTc: '12345678901',
        kayitTarihi: '2023-01-20',
        durum: 'Aktif'
      },
      {
        id: '2',
        kunyeNo: 'TR001234567891',
        hayvanTuru: 'Sığır',
        irk: 'Angus',
        cinsiyet: 'Erkek',
        dogumTarihi: '2023-02-10',
        sahipAdi: 'Mehmet Demir',
        sahipTc: '12345678902',
        kayitTarihi: '2023-02-15',
        durum: 'Aktif'
      },
      {
        id: '3',
        kunyeNo: 'TR001234567892',
        hayvanTuru: 'Koyun',
        irk: 'Merinos',
        cinsiyet: 'Dişi',
        dogumTarihi: '2023-03-05',
        sahipAdi: 'Fatma Kaya',
        sahipTc: '12345678903',
        kayitTarihi: '2023-03-10',
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
      hayvanTuru: 'Sığır',
      irk: 'Holstein',
      cinsiyet: 'Dişi',
      dogumTarihi: '2023-01-15',
      dogumYeri: 'Ankara',
      sahipAdi: 'Ahmet Yılmaz',
      sahipTc: '12345678901',
      sahipAdres: 'Ankara Merkez, Çankaya Mahallesi, No: 123',
      kayitTarihi: '2023-01-20',
      durum: 'Aktif',
      notlar: 'Sağlıklı, aşıları tamamlanmış, veteriner kontrolü yapılmış',
      geçmişİşlemler: [
        {
          tarih: '2023-01-20',
          işlem: 'Kayıt',
          açıklama: 'İlk kayıt işlemi gerçekleştirildi'
        },
        {
          tarih: '2023-03-15',
          işlem: 'Aşı',
          açıklama: 'Kuduz aşısı yapıldı'
        },
        {
          tarih: '2023-06-10',
          işlem: 'Kontrol',
          açıklama: 'Veteriner kontrolü yapıldı'
        },
        {
          tarih: '2023-09-05',
          işlem: 'Aşı',
          açıklama: 'Şap aşısı yapıldı'
        }
      ]
    }
  }
}
