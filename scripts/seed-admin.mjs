import { createClient } from '@libsql/client';
import { randomBytes, scryptSync } from 'node:crypto';
import { readFileSync } from 'node:fs';

function loadLocalEnv() {
  const envFile = readFileSync('.env.local', 'utf8');

  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=["']?(.+?)["']?$/);

    if (match) {
      process.env[match[1]] = match[2];
    }
  }
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(password, salt, 64).toString('base64url');

  return `scrypt:${salt}:${hash}`;
}

loadLocalEnv();

const email = process.env.ADMIN_EMAIL ?? 'support123@worldstayguide.com';
const password = process.env.ADMIN_PASSWORD ?? 'admin@3211';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.execute({
  sql: `
    INSERT INTO users (email, password_hash, role, updated_at)
    VALUES (?, ?, 'admin', CURRENT_TIMESTAMP)
    ON CONFLICT(email) DO UPDATE SET
      password_hash = excluded.password_hash,
      role = excluded.role,
      updated_at = CURRENT_TIMESTAMP
  `,
  args: [email.toLowerCase(), hashPassword(password)],
});

const result = await db.execute({
  sql: 'SELECT email, role FROM users WHERE email = ?',
  args: [email.toLowerCase()],
});

console.log(JSON.stringify(result.rows, null, 2));
