async function run() {
  const res = await fetch("https://stock.adobe.com/search?k=858787495", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  const html = await res.text();
  const match = html.match(/https:\/\/[^"']*858787495[^"']*\.jpg/i);
  if (match) console.log("Found:", match[0]);
  else console.log("Not found.", html.substring(0, 200));
}
run();
