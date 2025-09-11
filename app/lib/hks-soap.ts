export const HKS = {
  bildirimUrl: 'https://hks.hal.gov.tr/WebServices/BildirimService.svc',
  genelUrl: 'https://hks.hal.gov.tr/WebServices/GenelService.svc',
  ns: 'http://www.gtb.gov.tr//WebServices',
  u: process.env.HKS_USERNAME ?? '',
  p: process.env.HKS_PASSWORD ?? '',
  sp: process.env.HKS_SERVICE_PASSWORD ?? '',
};

function toXml(obj: any): string {
  if (obj == null) return '';
  if (typeof obj !== 'object') return String(obj);
  return Object.keys(obj).map(k => `<tns:${k}>${toXml(obj[k])}</tns:${k}>`).join('');
}

export function buildSoapEnvelope(method: string, payload: Record<string, any> = {}) {
  const body = Object.keys(payload).map(k => `<tns:${k}>${toXml(payload[k])}</tns:${k}>`).join('');
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${HKS.ns}">
  <soap:Body>
    <tns:${method}>
      <tns:UserName>${HKS.u}</tns:UserName>
      <tns:Password>${HKS.p}</tns:Password>
      <tns:ServicePassword>${HKS.sp}</tns:ServicePassword>
      ${body}
    </tns:${method}>
  </soap:Body>
</soap:Envelope>`;
}

export function soapAction(iface: 'IGenelService'|'IBildirimService', method: string) {
  return `${HKS.ns}/${iface}/${method}`;
}

export function pickSoapResponse(parsed: any, method: string) {
  const env = parsed?.['soap:Envelope'] ?? parsed?.Envelope;
  const body = env?.['soap:Body'] ?? env?.Body;
  if (!body) return null;
  const key = Object.keys(body).find(k => k.endsWith(`${method}Response`));
  return key ? body[key] : null;
}
