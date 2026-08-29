import { turso } from '@/lib/turso';
import type { TripPackage } from '@/types/travel';

export type PackageStatus = 'Active' | 'Hidden';

export type TravelPackageRecord = TripPackage & {
  id: number;
  destination: string;
  category: string;
  status: PackageStatus;
  updatedAt: string;
};

export type TravelPackagePayload = {
  name: string;
  destination: string;
  location: string;
  category: string;
  price: string;
  dateLabel: string;
  tripType: string;
  slotsLeft: number;
  image: string;
  alt?: string;
  badge?: string;
  status: PackageStatus;
  accommodation?: string;
  transport?: string;
  meals?: string;
};

type PackageRow = {
  id: number;
  name: string;
  destination: string;
  location: string;
  category: string;
  price: string;
  date_label: string;
  trip_type: string;
  slots_left: number;
  image: string;
  alt: string;
  badge: string | null;
  status: PackageStatus;
  accommodation: string;
  transport: string;
  meals: string;
  updated_at: string;
};

function toTravelPackage(row: PackageRow): TravelPackageRecord {
  return {
    id: row.id,
    name: row.name,
    destination: row.destination,
    location: row.location,
    category: row.category,
    slotsLeft: row.slots_left,
    price: row.price,
    tripType: row.trip_type,
    dateLabel: row.date_label,
    dateKind: row.date_label.toLowerCase().includes('request') ? 'request' : 'calendar',
    image: row.image,
    alt: row.alt,
    badge: row.badge ?? undefined,
    status: row.status,
    updatedAt: row.updated_at,
    features: [
      { label: 'Accommodation', value: row.accommodation },
      { label: 'Transport', value: row.transport },
      { label: 'Meals', value: row.meals },
    ],
  };
}

export async function getTravelPackages(options: { includeHidden?: boolean } = {}) {
  const result = await turso.execute(
    options.includeHidden
      ? 'SELECT * FROM travel_packages ORDER BY updated_at DESC'
      : "SELECT * FROM travel_packages WHERE status = 'Active' ORDER BY updated_at DESC"
  );

  return result.rows.map((row) => toTravelPackage(row as unknown as PackageRow));
}

export async function getTravelPackageById(id: number) {
  const result = await turso.execute({
    sql: 'SELECT * FROM travel_packages WHERE id = ? LIMIT 1',
    args: [id],
  });

  const row = result.rows[0];
  return row ? toTravelPackage(row as unknown as PackageRow) : null;
}

export async function createTravelPackage(payload: TravelPackagePayload) {
  const now = new Date().toISOString();
  const result = await turso.execute({
    sql: `
      INSERT INTO travel_packages (
        name, destination, location, category, price, date_label, trip_type,
        slots_left, image, alt, badge, status, accommodation, transport, meals, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    args: [
      payload.name,
      payload.destination,
      payload.location,
      payload.category,
      payload.price,
      payload.dateLabel,
      payload.tripType,
      payload.slotsLeft,
      payload.image,
      payload.alt ?? `${payload.name} travel package image`,
      payload.badge ?? '',
      payload.status,
      payload.accommodation ?? 'Hotel stay',
      payload.transport ?? 'Private transport',
      payload.meals ?? 'Breakfast included',
      now,
    ],
  });

  return toTravelPackage(result.rows[0] as unknown as PackageRow);
}

export async function updateTravelPackage(id: number, payload: TravelPackagePayload) {
  const now = new Date().toISOString();
  const result = await turso.execute({
    sql: `
      UPDATE travel_packages SET
        name = ?,
        destination = ?,
        location = ?,
        category = ?,
        price = ?,
        date_label = ?,
        trip_type = ?,
        slots_left = ?,
        image = ?,
        alt = ?,
        badge = ?,
        status = ?,
        accommodation = ?,
        transport = ?,
        meals = ?,
        updated_at = ?
      WHERE id = ?
      RETURNING *
    `,
    args: [
      payload.name,
      payload.destination,
      payload.location,
      payload.category,
      payload.price,
      payload.dateLabel,
      payload.tripType,
      payload.slotsLeft,
      payload.image,
      payload.alt ?? `${payload.name} travel package image`,
      payload.badge ?? '',
      payload.status,
      payload.accommodation ?? 'Hotel stay',
      payload.transport ?? 'Private transport',
      payload.meals ?? 'Breakfast included',
      now,
      id,
    ],
  });

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  return toTravelPackage(row as unknown as PackageRow);
}

export async function deleteTravelPackage(id: number) {
  await turso.execute({
    sql: 'DELETE FROM travel_packages WHERE id = ?',
    args: [id],
  });
}
