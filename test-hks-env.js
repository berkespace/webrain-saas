// HKS Environment Variables Test Scripti
require('dotenv').config({ path: '.env.local' });

console.log('HKS Environment Variables Test:');
console.log('================================');

const envVars = {
  HKS_USERNAME: process.env.HKS_USERNAME,
  HKS_PASSWORD: process.env.HKS_PASSWORD,
  HKS_WEBSERVICE: process.env.HKS_WEBSERVICE,
  HKS_SERVICE_PASSWORD: process.env.HKS_SERVICE_PASSWORD
};

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? 'SET (' + value.substring(0, 3) + '...)' : 'NOT SET'}`);
});

console.log('\nEğer environment variables SET değilse, .env.local dosyasını kontrol edin:');
console.log('HKS_USERNAME="your-hks-username"');
console.log('HKS_PASSWORD="your-hks-password"');
console.log('HKS_SERVICE_PASSWORD="!1QAZWSX"');
