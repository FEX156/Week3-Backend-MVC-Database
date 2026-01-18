import * as fs from "fs";
import * as path from "path";
import { pool } from "./pool";

async function migrate() {
  const file = path.join(process.cwd(), "src/migrations/001_init_contacts.sql");

  const sql = fs.readFileSync(file, "utf8");
  await pool.query(sql);

  console.log("✅ Migration applied");
  await pool.end();
}

migrate().catch((err) => {
  console.error("❌ Migration failed", err);
  process.exit(1);
});
