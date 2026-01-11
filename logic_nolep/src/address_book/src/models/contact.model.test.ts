import ContactModel from "./ContactModel";
import db from "../config/database";

describe("ContactModel Unit Test", () => {
  // Bersihkan tabel sebelum setiap test agar tidak saling ganggu
  beforeEach(() => {
    db.prepare("DELETE FROM Contacts").run();
    // Reset increment ID juga kalau perlu
    db.prepare("DELETE FROM sqlite_sequence WHERE name='Contacts'").run();
  });

  // Test CREATE
  it("should successfully create a contact and return the new data", () => {
    const payload = {
      nama: "Budi Sekolah Jalanan",
      phone_number: "0812345",
      company: "Tech Indie",
      email: "budi@test.com",
    };

    const response = ContactModel.createContact(payload);

    expect(response.success).toBe(true);
    expect(response.payload?.id).toBe(1);
    expect(response.payload?.nama).toBe(payload.nama);
    expect(response.message).toContain("succesfully");
  });

  // Test CREATE (Unique Constraint)
  it("should fail when creating a contact with a duplicate email", () => {
    const payload = {
      nama: "Budi",
      phone_number: "123",
      company: "A",
      email: "duplicate@test.com",
    };

    ContactModel.createContact(payload);

    // Coba insert lagi dengan email yang sama, expect ini melempar error karena SQLite throw
    // Catatan: Kamu belum pakai try-catch di Model, jadi Jest akan menangkap error throw
    expect(() => {
      ContactModel.createContact(payload);
    }).toThrow();
  });

  // Test UPDATE
  it("should successfully update an existing contact", () => {
    // Insert dulu
    const created = ContactModel.createContact({
      nama: "Andi",
      phone_number: "111",
      company: "C1",
      email: "andi@test.com",
    });

    const updatePayload = {
      id: created.payload!.id,
      nama: "Andi Update",
      phone_number: "999",
      company: "C2",
      email: "andi@update.com",
    };

    const response = ContactModel.updateContact(updatePayload);

    expect(response.success).toBe(true);
    expect(response.payload?.nama).toBe("Andi Update");
    expect(response.message).toBe("Data updated succesfully");
  });

  // Test DELETE
  it("should successfully delete a contact", () => {
    const created = ContactModel.createContact({
      nama: "Hapus Me",
      phone_number: "0",
      company: "X",
      email: "hapus@test.com",
    });

    const response = ContactModel.deleteContact(created.payload!.id);

    expect(response.success).toBe(true);
    expect(response.message).toBe("Data deleted succesfully");
  });

  it("should return success false when deleting non-existent id", () => {
    const response = ContactModel.deleteContact(999);
    expect(response.success).toBe(false);
  });
});
