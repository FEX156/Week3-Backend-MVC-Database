import { ContactGroupRepository } from "../repositories/contact-group.repository";
import type {
  AppResponse,
  ContactGroup,
  ContactGroupDTO,
} from "../types/index.type";

export class ContactGroupService {
  public static async createContactGroup(
    contact_id: number,
    group_id: number
  ): Promise<AppResponse<ContactGroupDTO>> {
    if (!contact_id && !group_id) {
      return {
        success: false,
        message: "Mohon masukkan id, contact_id, group_id",
      };
    }
    try {
      const newContactGroup: ContactGroup =
        await ContactGroupRepository.createContactGroup(contact_id, group_id);
      return {
        success: true,
        message: "Sukses membuat kontak_group",
        data: newContactGroup,
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

  public static async updateContactGroup(
    id: number,
    contact_id: number,
    group_id: number
  ): Promise<AppResponse<ContactGroupDTO>> {
    if (!id && !contact_id && !group_id) {
      return {
        success: false,
        message: "Mohon masukkan id, contact_id, group_id",
      };
    }
    try {
      const updatedContactGroup: ContactGroup =
        await ContactGroupRepository.updateContactGroup(
          id,
          contact_id,
          group_id
        );
      return {
        success: true,
        message: "Sukses mengupdate kontak_group",
        data: updatedContactGroup,
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

  public static async deleteContactGroup(
    id: number
  ): Promise<AppResponse<ContactGroupDTO>> {
    if (!id) {
      return {
        success: false,
        message: "Mohon masukkan id kontak_group",
      };
    }
    try {
      const deletedContactGroup: boolean =
        await ContactGroupRepository.deleteContactGroup(id);
      if (!deletedContactGroup) {
        return {
          success: false,
          message: `Gagal menghapus group, group dengan id = ${id} tidak ditemukan`,
        };
      }
      return {
        success: true,
        message: "Sukses menghapus group",
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
