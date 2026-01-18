import { pool } from "../db/pool";
import type { Contact } from "../types/index.type";

export class ContactRepository {
  public static async createContact(
    name: string,
    phone_number: string | null,
    company: string | null,
    email: string | null
  ): Promise<Contact> {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, company)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [name, email, phone_number, company]
    );

    return result.rows[0];
  }

  public static async updateContact(
    id: number,
    name: string,
    phone_number: string | null,
    company: string | null,
    email: string | null
  ): Promise<Contact> {
    const result = await pool.query(
      `UPDATE contacts
        SET name = $2, email = COALESCE($3, email), phone = COALESCE($4, phone), company = COALESCE($5, company)
        WHERE contact_id = $1
        RETURNING *`,
      [id, name, email, phone_number, company]
    );

    return result.rows[0];
  }

  public static async deleteContact(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM contacts WHERE contact_id = $1`,
      [id]
    );

    return result.rowCount === 1;
  }

  public static async showContacts(): Promise<Contact[]> {
    const allResult = await pool.query(`SELECT
        c.contact_id,
        c.name,
        c.email,
        c.phone,
        c.company,
        COALESCE(
          array_agg(g.group_name) FILTER (WHERE g.group_name IS NOT NULL),
          '{}'
        ) AS groups
      FROM contacts c
      LEFT JOIN contact_groups cg ON c.contact_id = cg.contact_id
      LEFT JOIN groups g ON cg.group_id = g.group_id
      GROUP BY c.contact_id
      ORDER BY c.contact_id`);

    return allResult.rows;
  }
}
