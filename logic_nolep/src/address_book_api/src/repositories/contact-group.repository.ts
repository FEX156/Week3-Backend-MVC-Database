import { pool } from "../db/pool";
import type { ContactGroup } from "../types/index.type";

export class ContactGroupRepository {
  public static async createContactGroup(
    contact_id: number,
    group_id: number
  ): Promise<ContactGroup> {
    const result = await pool.query(
      `INSERT INTO contact_group (contact_id, group_id)
      VALUES ($1, $2)
      RETURNING *`,
      [contact_id, group_id]
    );

    return result.rows[0];
  }

  public static async updateContactGroup(
    id: number,
    contact_id: number,
    group_id: number
  ): Promise<ContactGroup> {
    const result = await pool.query(
      `UPDATE contact_group
      SET contact_id = $2, contact_name = $3
      WHERE contact_group_id = $1
      RETURNING *`,
      [id, contact_id, group_id]
    );
    return result.rows[0];
  }

  public static async deleteContactGroup(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM contact_groups WHERE contact_group_id = $1`,
      [id]
    );
    return result.rowCount === 1;
  }
}
