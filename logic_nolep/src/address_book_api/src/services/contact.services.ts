import { ContactRepository } from "../repositories/contact.repository";
import type { ContactDTO, AppResponse, Contact } from "../types/index.type";

export class ContactService {
  public static async createContact(
    name: string,
    phone_number: string | null,
    company: string | null,
    email: string | null
  ): Promise<AppResponse<ContactDTO>> {
    if (!name)
      return { success: false, message: "Mohon masukkan nama_kontak!" };
    try {
      const newContact: Contact = await ContactRepository.createContact(
        name,
        phone_number,
        company,
        email
      );
      return {
        success: true,
        message: "Sukses membuat kontak baru",
        data: newContact,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }

  public static async updateContact(
    id: number,
    name: string,
    phone_number: string | null,
    company: string | null,
    email: string | null
  ): Promise<AppResponse<ContactDTO>> {
    if (!id && !name)
      return { success: false, message: "Mohon masukkan id dan nama_kontak!" };
    try {
      const updatedContact: Contact = await ContactRepository.updateContact(
        id!,
        name!,
        phone_number,
        company,
        email
      );
      return {
        success: true,
        message: "Sukses memperbarui kontak",
        data: updatedContact,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }

  public static async deleteContact(id: number): Promise<AppResponse<never>> {
    if (!id) return { success: false, message: "Mohon masukkan id kontak!" };
    try {
      const deletedContact: boolean = await ContactRepository.deleteContact(id);
      if (!deletedContact) {
        return {
          success: false,
          message: `Gagal menghapus kontak, kontak dengan id = ${id} tidak ditemukan`,
        };
      }
      return {
        success: true,
        message: "Sukses menghapus kontak",
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }

  public static async showContacts(): Promise<AppResponse<ContactDTO[]>> {
    try {
      const allContact: Contact[] = await ContactRepository.showContacts();
      return {
        success: true,
        message: "Sukses menampilkan semua kontak",
        data: allContact,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }
}
