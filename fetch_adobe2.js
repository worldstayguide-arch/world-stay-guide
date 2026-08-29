const https = require('https');
https.get('https://stock.adobe.com/search?k=858787495', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/[^"']*858787495[^"']*\.jpg/);
    if (match) console.log("Found:", match[0]);
    else console.log("Not found.");
  });
}).on('error', console.error);
