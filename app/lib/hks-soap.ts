'use server';
import { XMLParser } from 'fast-xml-parser';

export const HKS = {
  bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
  genelUrl: 'https://hks.hal.gov.tr/WebServices/GenelService.svc',
  ns: 'http://www.gtb.gov.tr//WebServices',
  u: process.env.HKS_USERNAME ?? '',
  p: process.env.HKS_PASSWORD ?? '',
  sp: process.env.HKS_SERVICE_PASSWORD ?? '', // env adı NET olmalı
};

// methoda özel element sırası
const ORDER: Record<string, string[]> = {
  // Genel servislerde tipik sıra:
  GenelServisIller: ['UserName','Password','ServicePassword','Istek'],
  // Bildirim servisinde C# örneğini taklit ediyoruz:
  BildirimTurleriListesi: ['UserName','Password','ServicePassword','Istek'],
  BildirimServisBildirimcininYaptigiBildirimListesi: ['Istek','Password','ServicePassword','UserName'],
};

function toXml(obj: any): string {
  if (obj == null) return '';
  if (typeof obj !== 'object') return String(obj);
  return Object.keys(obj)
    .map(k => `<tns:${k}>${toXml(obj[k])}</tns:${k}>`)
    .join('');
}

export function buildSoapEnvelope(method: string, parts: Record<string, any>) {
  const order = ORDER[method] ?? ['UserName','Password','ServicePassword','Istek'];
  const body = order
    .map(name => (name in parts) ? `<tns:${name}>${toXml(parts[name])}</tns:${name}>` : '')
    .join('');

  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${HKS.ns}">
  <soap:Body>
    <tns:${method}>
      ${body}
    </tns:${method}>
  </soap:Body>
</soap:Envelope>`;
}

export function soapAction(iface: 'IGenelService'|'IBildirimService', method: string) {
  return `${HKS.ns}/${iface}/${method}`;
}

export function parseSoap(raw: string, method: string) {
  const parser = new XMLParser({ ignoreAttributes:false, attributeNamePrefix:'@_', textNodeName:'#text' });
  const parsed = parser.parse(raw);
  const env = parsed['soap:Envelope'] || parsed['Envelope'];
  const body = env?.['soap:Body'] || env?.['Body'];
  if (!body) return { resp:null, raw };
  const key = Object.keys(body).find(k => k.endsWith(`${method}Response`));
  const resp = key ? body[key] : null;
  return { resp, raw };
}