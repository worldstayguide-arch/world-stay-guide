import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env.local');

try {
  const envFile = readFileSync(envPath, 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s]+)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    process.env[key] ??= rawValue.trim().replace(/^"|"$/g, '');
  }
} catch {
  // Environment variables may already be provided by the shell.
}

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required.');
}

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const seedPosts = [
  {
    slug: 'ultimate-guide-to-hunza-valley',
    title: 'The Ultimate Guide to Hunza Valley',
    excerpt: 'Everything you need to know before chasing turquoise lakes and snow-capped peaks in the north.',
    content: [
      'Hunza Valley is often called the crown jewel of Gilgit-Baltistan, and for good reason. Framed by Rakaposhi and the Karakoram range, the valley pairs dramatic scenery with a relaxed, welcoming culture that keeps travelers coming back.',
      "The best time to visit is between April and October, when the Karakoram Highway is fully open and the apricot orchards are either blooming or fruiting. Base yourself in Karimabad for easy access to Baltit Fort, Eagle's Nest viewpoint, and day trips to Attabad Lake and Passu Cones.",
      'Give yourself at least four days, one to acclimatize and wander Karimabad, one for Attabad Lake and the Hussaini suspension bridge, one for Passu and the glacier viewpoints, and a buffer day for weather. Roads can close briefly after rain, so build in slack.',
    ],
    category: 'Destination Guide',
    author: 'Ayesha Raza',
    date: '2026-06-12',
    readTime: '6 min read',
    views: '18.2K',
    image: '/passu-cones-gojal-hunza.jpg',
    alt: 'Hunza Valley with snow-capped peaks and green terraces',
  },
  {
    slug: 'k2-base-camp-trek-what-to-know',
    title: 'K2 Base Camp Trek: What to Know Before You Go',
    excerpt: 'A realistic breakdown of difficulty, permits, gear, and the best trekking season.',
    content: [
      'The K2 Base Camp trek is one of the most demanding and rewarding treks in the world, covering roughly 100km round trip through the Baltoro Glacier over 10-14 days.',
      'Permits are required and are typically arranged through a registered trekking operator, who will also handle porter logistics and the mandatory liaison officer for foreign trekkers. Book at least two to three months ahead during peak season (July-August).',
      'Altitude is the biggest risk factor, not distance. Concordia sits above 4,600m, so a slow, staged ascent with rest days matters more than raw fitness. Pack for temperature swings of 30+ degrees between midday sun and night at camp.',
    ],
    category: 'Trekking',
    author: 'Bilal Hussain',
    date: '2026-05-28',
    readTime: '8 min read',
    views: '24.6K',
    image: '/k2-base-camp-travel.jpg',
    alt: 'Trekkers on the trail toward K2 Base Camp',
  },
  {
    slug: 'skardu-baltistan-hidden-gems',
    title: "Skardu's Hidden Gems Beyond the Postcard Spots",
    excerpt: 'Skip the crowds at Shangrila and discover the valleys locals actually love.',
    content: [
      'Skardu gets attention for Shangrila Resort and Upper Kachura Lake, and both are worth the visit, but the region holds far more once you get off the main road.',
      'Basho Valley, a short drive from Skardu city, offers pine forests and river camping without the crowds of Deosai. Kharmang Valley further east is one of the least-visited parts of Baltistan, with apricot orchards and Balti stone architecture largely untouched by tourism.',
      'For a full picture of the region, pair two nights in Skardu city with a night each in Basho and along the Shigar river. The contrast between desert-like riverbanks and alpine valleys within an hour of each other is the real story of Baltistan.',
    ],
    category: 'Destination Guide',
    author: 'Sana Malik',
    date: '2026-05-10',
    readTime: '5 min read',
    views: '11.4K',
    image: '/skardu-baltistan-travel.jpg',
    alt: 'Skardu valley landscape with mountains and river',
  },
  {
    slug: 'fairy-meadows-camping-guide',
    title: 'Camping at Fairy Meadows: A Practical Guide',
    excerpt: 'What the jeep ride, the hike, and the nights actually feel like at 3,300m.',
    content: [
      'Fairy Meadows sits at the base of Nanga Parbat and is reached via a jeep track from Raikot Bridge, followed by a 3-4 hour hike or horse ride. There is no road all the way in, which is exactly what keeps it special.',
      'Nights get cold even in summer, dropping close to freezing, so a proper sleeping bag matters more than most people expect. Most stays are simple wooden huts or camping pods run by local families.',
      'Sunrise over Nanga Parbat from Fairy Meadows, and the further hike up to Beyal Camp, are the two moments worth planning your schedule around. Both are best done at first light before clouds roll in.',
    ],
    category: 'Camping',
    author: 'Ahmed Tariq',
    date: '2026-04-22',
    readTime: '5 min read',
    views: '9.8K',
    image: '/fairy-meadows-travel.jpg',
    alt: 'Camping tents at Fairy Meadows with Nanga Parbat in the background',
  },
  {
    slug: 'attabad-lake-day-trip',
    title: 'Attabad Lake: The Perfect Half-Day Trip',
    excerpt: 'Boating, ziplining, and lakeside food, how to spend a few hours right.',
    content: [
      'Attabad Lake formed in 2010 after a landslide dammed the Hunza River, and its turquoise water has since become one of the most photographed spots on the Karakoram Highway.',
      'Boat rides across the lake are the main draw, with several operators along the shore offering short scenic rides or longer trips toward the far end near the tunnels. Ziplining and jet-ski rentals are also available near the main jetty.',
      'Plan to arrive by mid-morning to beat the tour-bus crowds, and pair the visit with lunch at one of the floating or lakeside restaurants serving fresh trout.',
    ],
    category: 'Day Trip',
    author: 'Ayesha Raza',
    date: '2026-04-02',
    readTime: '4 min read',
    views: '15.1K',
    image: '/attabad-lake-hunza-travel.jpg',
    alt: 'Turquoise waters of Attabad Lake surrounded by mountains',
  },
  {
    slug: 'lahore-food-and-heritage-walk',
    title: 'A Food and Heritage Walk Through Old Lahore',
    excerpt: 'Badshahi Mosque, Wazir Khan, and the street food in between.',
    content: [
      'Old Lahore rewards walking more than any other city in Pakistan. Start at Badshahi Mosque in the early morning light, then head into the walled city toward Wazir Khan Mosque, taking in the frescoed facades along the way.',
      'Food Street in Gawalmandi and the stalls around Fort Road come alive in the evening. This is where to try nihari, fried fish, and kulfi falooda without needing a reservation.',
      'Set aside a full day: mornings for the forts and mosques when the light and crowds are best, afternoons for the bazaars, and evenings for food street once the lanes light up.',
    ],
    category: 'City Guide',
    author: 'Bilal Hussain',
    date: '2026-03-18',
    readTime: '6 min read',
    views: '20.3K',
    image: '/lahore_fort.jpg',
    alt: 'Minar-e-Pakistan monument in Lahore at golden hour',
  },
];

await turso.execute(`
  CREATE TABLE IF NOT EXISTS blogs (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'WorldStayGuide Team',
    date TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '5 min read',
    views TEXT NOT NULL DEFAULT '0',
    image TEXT NOT NULL,
    alt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Published' CHECK (status IN ('Published', 'Draft')),
    tags TEXT NOT NULL DEFAULT '',
    seo_title TEXT NOT NULL DEFAULT '',
    keywords TEXT NOT NULL DEFAULT '',
    meta_description TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

await turso.execute('CREATE INDEX IF NOT EXISTS idx_blogs_status_date ON blogs(status, date DESC)');

for (const post of seedPosts) {
  await turso.execute({
    sql: `
      INSERT INTO blogs (
        slug, title, excerpt, content, category, author, date, read_time, views,
        image, alt, status, tags, seo_title, keywords, meta_description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Published', ?, ?, ?, ?)
      ON CONFLICT(slug) DO NOTHING
    `,
    args: [
      post.slug,
      post.title,
      post.excerpt,
      JSON.stringify(post.content),
      post.category,
      post.author,
      post.date,
      post.readTime,
      post.views,
      post.image,
      post.alt,
      `${post.category}, Pakistan Travel, ${post.author}`,
      post.title,
      `${post.category.toLowerCase()}, pakistan travel`,
      post.excerpt,
    ],
  });
}

const result = await turso.execute('SELECT COUNT(*) AS count FROM blogs');
console.log(JSON.stringify(result.rows[0], null, 2));
