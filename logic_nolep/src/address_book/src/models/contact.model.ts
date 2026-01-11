import db from "../config/database";
import { type Contact, type ModelResponses } from "../types/index.type";

export default class ContactModel {
  static {
    db.exec(`
            CREATE TABLE IF NOT EXISTS Contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone_number TEXT NOT NULL,
                company TEXT,
                email TEXT UNIQUE NOT NULL,
            )
        `);
    console.log("Table users siap.");
  }

  public static createContact({
    nama,
    phone_number,
    company,
    email,
  }: Omit<Contact, "id">): ModelResponses<Contact> {
    const stmt = db.prepare(
      `INSERT INTO Contacts (name, phone_number, company, email) VALUES (?, ?, ?, ?)`,
    );
    const result = stmt.run(nama, phone_number, company, email);

    const newContact: Contact = {
      id: result.lastInsertRowid as number,
      nama,
      phone_number,
      company,
      email,
    };

    return {
      success: true,
      message: "Create contact new contact succesfully",
      payload: newContact,
    };
  }

  public static updateContact({
    id,
    nama,
    phone_number,
    company,
    email,
  }: Contact): ModelResponses<Contact> {
    const stmt = db.prepare(
      `UPDATE Contacts SET name = ?, phone_number = ?, company = ?, email = ? WHERE id = ?`,
    );
    const result = stmt.run(nama, phone_number, company, email, id);

    if (!result.changes) {
      return { success: false, message: "Failed to update contact" };
    }

    const updatedContact: Contact = { id, nama, phone_number, company, email };
    return {
      success: true,
      message: "Data updated succesfully",
      payload: updatedContact,
    };
  }

  public static deleteContact(id: Contact["id"]): ModelResponses<Contact> {
    const stmt = db.prepare(`DELETE FROM Contacts WHERE id = ?`);
    const result = stmt.run(id);

    if (!result.changes) {
      return { success: false, message: "Failed to update contact" };
    }

    return {
      success: true,
      message: "Data deleted succesfully",
    };
  }

  public static showContact(): ModelResponses<Contact[]> {
    const stmt = db.prepare(`SELECT 
                c.*, 
                GROUP_CONCAT(g.name, ', ') as group_names
                FROM Contacts c
                LEFT JOIN Contact_groups cg ON c.id = cg.contact_id
                LEFT JOIN Groups g ON cg.group_id = g.id
                WHERE c.id = ?
                GROUP BY c.id;`);
    return {
      success: true,
      message: "Data deleted succesfully",
      payload: stmt.all() as Contact[],
    };
  }
}
