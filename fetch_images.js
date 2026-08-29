const places = [
  "Badshahi Mosque", "Lahore Fort", "Faisal Mosque", "Wazir Khan Mosque", 
  "Pakistan Monument", "Mazar-e-Quaid", "Deosai National Park", "Minar-e-Pakistan", 
  "Daman-e-Koh", "Mohenjo-daro", "Lok Virsa Museum", "Khewra Salt Mine", 
  "Mohatta Palace", "Port Grand", "Dolmen Mall Clifton", "Hunza Valley", 
  "K2", "Fairy Meadows", "Attabad Lake", "Karakoram Highway"
];

async function fetchImages() {
  const mapping = {};
  for (const place of places) {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(place)}&prop=pageimages&format=json&pithumbsize=800`);
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pages[pageId].thumbnail) {
        mapping[place] = pages[pageId].thumbnail.source;
      } else {
        mapping[place] = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop"; // fallback
      }
    } catch (e) {
      console.error(e);
    }
  }
  console.log(JSON.stringify(mapping, null, 2));
}
fetchImages();
