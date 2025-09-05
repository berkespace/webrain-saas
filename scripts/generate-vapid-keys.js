// VAPID keys oluşturmak için bu scripti çalıştırın
// node scripts/generate-vapid-keys.js

const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

console.log('=== VAPID Keys Generated ===');
console.log('');
console.log('Add these to your .env.local file:');
console.log('');
console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
console.log('VAPID_EMAIL=your-email@gmail.com');
console.log('');
console.log('=== Gmail SMTP Configuration ===');
console.log('');
console.log('Also add these for email notifications:');
console.log('EMAIL_SMTP_HOST=smtp.gmail.com');
console.log('EMAIL_SMTP_PORT=587');
console.log('EMAIL_USER=your-email@gmail.com');
console.log('EMAIL_PASSWORD=your-16-character-app-password');
console.log('EMAIL_FROM_NAME=Webrain SaaS');
console.log('EMAIL_FROM_EMAIL=your-email@gmail.com');
console.log('NOTIFICATION_BASE_URL=http://localhost:3000');
console.log('');
console.log('=== Gmail App Password Setup ===');
console.log('1. Go to Google Account settings');
console.log('2. Security > 2-Step Verification');
console.log('3. App passwords > Generate password');
console.log('4. Use the 16-character password in EMAIL_PASSWORD');
