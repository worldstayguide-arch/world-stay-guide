import 'server-only';

import {
  Building2,
  Camera,
  Landmark as LandmarkIcon,
  Mountain,
  Route,
  ShoppingBag,
  Ticket,
  TreePine,
  Waves,
  type LucideIcon,
} from 'lucide-react';

import { turso } from '@/lib/turso';
import { landmarks as seedLandmarks } from '@/data/travel';
import type { LandmarkPayload, LandmarkRecord, LandmarkStatus } from '@/types/travel';

const ICON_NAME_BY_COMPONENT = new Map<LucideIcon, string>([
  [LandmarkIcon, 'Landmark'],
  [TreePine, 'TreePine'],
  [Camera, 'Camera'],
  [Building2, 'Building2'],
  [Ticket, 'Ticket'],
  [ShoppingBag, 'ShoppingBag'],
  [Mountain, 'Mountain'],
  [Waves, 'Waves'],
  [Route, 'Route'],
]);

type LandmarkRow = {
  id: number;
  name: string;
  category: string;
  icon_name: string;
  rating: string | null;
  reviews: string | null;
  price: string | null;
  status: LandmarkStatus;
  image: string;
  updated_at: string;
};

function toLandmarkRecord(row: LandmarkRow): LandmarkRecord {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    iconName: row.icon_name,
    rating: row.rating ?? undefined,
    reviews: row.reviews ?? undefined,
    price: row.price ?? undefined,
    status: row.status,
    image: row.image,
    updatedAt: row.updated_at,
  };
}

let ensured = false;

async function ensureLandmarksTable() {
  if (ensured) return;

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS landmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      icon_name TEXT NOT NULL DEFAULT 'Landmark',
      rating TEXT,
      reviews TEXT,
      price TEXT,
      status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Closed')),
      image TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const countResult = await turso.execute('SELECT COUNT(*) AS count FROM landmarks');
  const count = Number(countResult.rows[0]?.count ?? 0);

  if (count === 0) {
    for (const landmark of seedLandmarks) {
      const iconName = ICON_NAME_BY_COMPONENT.get(landmark.icon) ?? 'Landmark';

      await turso.execute({
        sql: `
          INSERT INTO landmarks (name, category, icon_name, rating, reviews, price, status, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          landmark.name,
          landmark.category,
          iconName,
          landmark.rating ?? null,
          landmark.reviews ?? null,
          landmark.price ?? null,
          landmark.status,
          landmark.image,
        ],
      });
    }
  }

  ensured = true;
}

export async function getLandmarks() {
  await ensureLandmarksTable();

  const result = await turso.execute('SELECT * FROM landmarks ORDER BY id ASC');
  return result.rows.map((row) => toLandmarkRecord(row as unknown as LandmarkRow));
}

export async function getLandmarkById(id: number) {
  await ensureLandmarksTable();

  const result = await turso.execute({
    sql: 'SELECT * FROM landmarks WHERE id = ? LIMIT 1',
    args: [id],
  });

  const row = result.rows[0];
  return row ? toLandmarkRecord(row as unknown as LandmarkRow) : null;
}

export async function createLandmark(payload: LandmarkPayload) {
  await ensureLandmarksTable();

  const now = new Date().toISOString();
  const result = await turso.execute({
    sql: `
      INSERT INTO landmarks (name, category, icon_name, rating, reviews, price, status, image, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    args: [
      payload.name,
      payload.category,
      payload.iconName,
      payload.rating ?? null,
      payload.reviews ?? null,
      payload.price ?? null,
      payload.status,
      payload.image,
      now,
    ],
  });

  return toLandmarkRecord(result.rows[0] as unknown as LandmarkRow);
}

export async function updateLandmark(id: number, payload: LandmarkPayload) {
  await ensureLandmarksTable();

  const now = new Date().toISOString();
  const result = await turso.execute({
    sql: `
      UPDATE landmarks SET
        name = ?,
        category = ?,
        icon_name = ?,
        rating = ?,
        reviews = ?,
        price = ?,
        status = ?,
        image = ?,
        updated_at = ?
      WHERE id = ?
      RETURNING *
    `,
    args: [
      payload.name,
      payload.category,
      payload.iconName,
      payload.rating ?? null,
      payload.reviews ?? null,
      payload.price ?? null,
      payload.status,
      payload.image,
      now,
      id,
    ],
  });

  const row = result.rows[0];
  return row ? toLandmarkRecord(row as unknown as LandmarkRow) : null;
}

export async function deleteLandmark(id: number) {
  await ensureLandmarksTable();
  await turso.execute({ sql: 'DELETE FROM landmarks WHERE id = ?', args: [id] });
}
