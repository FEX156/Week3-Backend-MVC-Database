import db from "../config/database";
import { type Groups, type ModelResponses } from "../types/index.type";

export class GroupController {
  static {
    db.exec(`
            CREATE TABLE IF NOT EXISTS Groups (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                group_name TEXT NOT NULL
            )
        `);
    console.log("Table users siap.");
  }

  public static createGroup(
    group_name: Groups["group_name"],
  ): ModelResponses<Groups> {
    const stmt = db.prepare(`INSERT INTO Groups (group_name) VALUES (?)`);
    const result = stmt.run(group_name);

    return {
      success: true,
      message: "Create contact new contact succesfully",
      payload: {
        id: result.lastInsertRowid as number,
        group_name,
      },
    };
  }

  public static updateGroup({
    id,
    group_name,
  }: Groups): ModelResponses<Groups> {
    const stmt = db.prepare(`UPDATE Groups SET group_name = ? WHERE id = ?`);
    const result = stmt.run(group_name, id);

    if (!result.changes) {
      return { success: false, message: "Failed to update group" };
    }

    return {
      success: true,
      message: "Data updated succesfully",
      payload: { id, group_name },
    };
  }

  public static deleteGroup(id: Groups["id"]): ModelResponses<Groups> {
    const stmt = db.prepare(`DELETE FROM Groups WHERE id = ?`);
    const result = stmt.run(id);

    if (!result.changes) {
      return { success: false, message: "Failed to delete groups" };
    }

    return {
      success: true,
      message: "Data deleted succesfully",
    };
  }

  public static showGroup(): ModelResponses<Groups[]> {
    const stmt = db.prepare(`SELECT 
                g.*, 
                GROUP_CONCAT(c.nama, ', ') as member_names
                FROM groups g
                LEFT JOIN contact_groups cg ON g.id = cg.group_id
                LEFT JOIN contacts c ON cg.contact_id = c.id
                WHERE g.id = ?
                GROUP BY g.id;`);
    return {
      success: true,
      message: "Data deleted succesfully",
      payload: stmt.all() as Groups[],
    };
  }
}
