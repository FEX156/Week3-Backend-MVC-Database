import { GroupRepository } from "../repositories/group.repository";
import type { AppResponse, Group, GroupDTO } from "../types/index.type";

export class GroupService {
  public static async createGroup(
    group_name: string
  ): Promise<AppResponse<GroupDTO>> {
    if (!group_name) {
      return {
        success: false,
        message: "Mohon masukkan nama_group",
      };
    }

    try {
      const newContact: Group = await GroupRepository.createGroup(group_name);
      return {
        success: true,
        message: "Sukses membuat group baru",
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

  public static async updateGroup(
    id: number,
    group_name: string
  ): Promise<AppResponse<GroupDTO>> {
    if (!id && !group_name) {
      return {
        success: false,
        message: "Mohon masukkan id dan nama_group",
      };
    }
    try {
      const updatedGroup: Group = await GroupRepository.updateGroup(
        id,
        group_name
      );
      return {
        success: true,
        message: "Sukses mengupdate group",
        data: updatedGroup,
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

  public static async deleteGroup(id: number): Promise<AppResponse<GroupDTO>> {
    if (!id) {
      return {
        success: false,
        message: "Mohon masukkan id group",
      };
    }
    try {
      const deletedGroup: boolean = await GroupRepository.deleteGroup(id);
      if (!deletedGroup) {
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
  public static async showGroups(): Promise<AppResponse<GroupDTO[]>> {
    try {
      const allGroup: Group[] = await GroupRepository.showGroups();
      return {
        success: true,
        message: "Sukses menampilkan semua group",
        data: allGroup,
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
