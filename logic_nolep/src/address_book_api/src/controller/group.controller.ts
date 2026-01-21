import { GroupService } from "../services/group.services";
import type { Request, Response, NextFunction } from "express";

export class GroupController {
  public static async createGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await GroupService.createGroup(req.body);
      res.status(201).json({
        succes: true,
        message: "Berhasil membuat group baru",
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
  public static async updateGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await GroupService.updateGroup(
        Number(req.params.groupId),
        req.body,
      );
      res.status(201).json({
        succes: true,
        message: "Berhasil memperbarui memperbarui group",
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
  public static async deleteGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await GroupService.deleteGroup(
        Number(req.params.groupId),
      );
      res.status(201).json({
        succes: true,
        message: "Berhasil menghapus group",
        affectedRow: contact,
      });
    } catch (e) {
      next(e);
    }
  }
  public static async showGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await GroupService.showGroups();
      res.status(201).json({
        succes: true,
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
}
