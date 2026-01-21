import { ContactGroupService } from "../services/contact-group.services";
import type { Request, Response, NextFunction } from "express";

export class ContactGroupController {
  public static async createContactGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await ContactGroupService.createContactGroup(req.body);
      res.status(201).json({
        succes: true,
        message: "Berhasil membuat kontak group baru",
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
  public static async updateContactGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await ContactGroupService.updateContactGroup(
        Number(req.params.contactGroupId),
        req.body,
      );
      res.status(201).json({
        succes: true,
        message: "Berhasil memperbarui kontak group",
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  }
  public static async deleteContactGroupHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contact = await ContactGroupService.deleteContactGroup(
        Number(req.params.contactGroupId),
      );
      res.status(201).json({
        succes: true,
        message: "Berhasil menghapus kontak group",
        affectedRow: contact,
      });
    } catch (e) {
      next(e);
    }
  }
}
