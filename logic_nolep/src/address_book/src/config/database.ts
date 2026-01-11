import Database from "better-sqlite3";

import type { Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("contact_book.db");

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export default db;
