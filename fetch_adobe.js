const https = require('https');
https.get('https://stock.adobe.com/images/badshahi-mosque/858787495', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/t\d\.ftcdn\.net\/jpg\/[0-9\/]+_F_858787495_[a-zA-Z0-9]+\.jpg/);
    if (match) console.log("Found:", match[0]);
    else console.log("Not found.");
  });
}).on('error', console.error);
