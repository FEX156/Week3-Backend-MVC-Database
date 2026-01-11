import db from "../config/database";
import { type ContactGroups, type ModelResponses } from "../types/index.type";

export class ContactGroupController {
  static {
    db.exec(`CREATE TABLE IF NOT EXISTS Contact_groups (
            contact_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            PRIMARY KEY (contact_id, group_id),
            FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
            FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
            );`);
    console.log("Table users siap.");
  }

  public static createContactGroup({
    contact_id,
    group_id,
  }: Omit<ContactGroups, "id">): ModelResponses<ContactGroups> {
    const stmt = db.prepare(
      `INSERT INTO Contact_groups (contact_id, group_id) VALUES (?, ?)`,
    );
    const result = stmt.run(contact_id, group_id);

    return {
      success: true,
      message: "Create contact new contact succesfully",
      payload: {
        id: result.lastInsertRowid as number,
        contact_id,
        group_id,
      },
    };
  }

  public static updateContactGroup({
    id,
    contact_id,
    group_id,
  }: ContactGroups): ModelResponses<ContactGroups> {
    const stmt = db.prepare(
      `UPDATE Contact_groups SET contact_id = ?, group_id = ? WHERE id = ?`,
    );
    const result = stmt.run(id, contact_id, group_id);

    if (!result.changes) {
      return { success: false, message: "Failed to update group" };
    }

    return {
      success: true,
      message: "Data updated succesfully",
      payload: { id, contact_id, group_id },
    };
  }

  public static deleteContactGroup(
    id: ContactGroups["id"],
  ): ModelResponses<ContactGroups[]> {
    const stmt = db.prepare(`DELETE FROM Contact_groups WHERE id = ?`);
    const result = stmt.run(id);

    if (!result.changes) {
      return { success: false, message: "Failed to delete groups" };
    }

    return {
      success: true,
      message: "Data deleted succesfully",
    };
  }
}
