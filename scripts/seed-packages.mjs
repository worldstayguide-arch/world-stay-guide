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
  // Environment variables may already be available.
}

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required.');
}

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const seedPackages = [
  {
    name: 'Passu Cones',
    destination: 'Hunza Valley',
    location: 'Gojal Valley, Hunza',
    category: 'Sightseeing',
    slotsLeft: 4,
    price: '$150.50',
    tripType: 'Open Trip',
    dateLabel: '12-14 August',
    image: '/passu-cones-gojal-hunza.jpg',
    alt: 'Passu Cones along the road in Gojal Valley, Hunza',
    badge: '',
    accommodation: '3N at Hunza Villa',
    transport: 'Private 4x4 Jeep',
    meals: 'Full board',
  },
  {
    name: 'Attabad Lake',
    destination: 'Hunza Valley',
    location: 'Hunza, Gilgit-Baltistan',
    category: 'Adventure',
    slotsLeft: 5,
    price: '$120.00',
    tripType: 'Private',
    dateLabel: 'Request based',
    image: '/attabad-lake-hunza-travel.jpg',
    alt: 'Attabad Lake in Hunza, Gilgit-Baltistan with turquoise water and mountains',
    badge: 'Open Trip',
    accommodation: '2N Lakeside Resort',
    transport: 'Private driver',
    meals: 'Half board',
  },
  {
    name: 'Naltar Adventure',
    destination: 'Gilgit Valley',
    location: 'Gilgit Valley',
    category: 'Adventure',
    slotsLeft: 2,
    price: '$90.00',
    tripType: 'Open Trip',
    dateLabel: '20-22 August',
    image: '/naltar-adventure-gilgit.jpg',
    alt: 'Naltar Valley lake and mountains near Gilgit',
    badge: 'Open Trip',
    accommodation: '2N at Naltar Inn',
    transport: 'Shared Jeep',
    meals: 'Full board',
  },
];

await turso.execute(`
  CREATE TABLE IF NOT EXISTS travel_packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    destination TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT NOT NULL,
    date_label TEXT NOT NULL,
    trip_type TEXT NOT NULL,
    slots_left INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    alt TEXT NOT NULL,
    badge TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Hidden')),
    accommodation TEXT NOT NULL DEFAULT '',
    transport TEXT NOT NULL DEFAULT '',
    meals TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

await turso.execute('CREATE INDEX IF NOT EXISTS idx_travel_packages_filters ON travel_packages(status, destination, category, price, date_label)');

for (const pkg of seedPackages) {
  await turso.execute({
    sql: `
      INSERT INTO travel_packages (
        name, destination, location, category, price, date_label, trip_type, slots_left,
        image, alt, badge, status, accommodation, transport, meals
      )
      SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?, ?, ?
      WHERE NOT EXISTS (SELECT 1 FROM travel_packages WHERE name = ? AND location = ?)
    `,
    args: [
      pkg.name,
      pkg.destination,
      pkg.location,
      pkg.category,
      pkg.price,
      pkg.dateLabel,
      pkg.tripType,
      pkg.slotsLeft,
      pkg.image,
      pkg.alt,
      pkg.badge,
      pkg.accommodation,
      pkg.transport,
      pkg.meals,
      pkg.name,
      pkg.location,
    ],
  });
}

const result = await turso.execute('SELECT COUNT(*) AS count FROM travel_packages');
console.log(JSON.stringify(result.rows[0], null, 2));
