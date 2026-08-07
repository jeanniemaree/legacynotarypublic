import https from 'https';

const HOST = 'legacynotarypublic.com';
const KEY = '8a649d2b7e1f4095a12b3c4d5e6f7a8b';
const URLS = [
  'https://legacynotarypublic.com/',
  'https://legacynotarypublic.com/sitemap.xml'
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ Successfully submitted to IndexNow!');
    } else {
      console.error(`❌ IndexNow submission failed. Status: ${res.statusCode}`);
      console.error(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ IndexNow request error: ${e.message}`);
});

req.write(payload);
req.end();
