import { ContactService } from "../services/contact.services";
import type { AppResponse, ContactDTO } from "../types/index.type";
import { ConsoleView } from "../view/index.view";

export class ContactController {
  public static async createContact(args: Array<string | undefined>) {
    if (args.length === 0) {
      ConsoleView.showError("Mohon masukan argumen yang diperlukan");
      return;
    }
    const [name, phone, company, email] = args;
    const newContact: AppResponse<ContactDTO> =
      await ContactService.createContact(
        name!,
        phone || null,
        company || null,
        email || null
      );
    if (newContact.success) {
      ConsoleView.showSuccess(newContact.message);
    } else {
      ConsoleView.showError(newContact.message);
    }
  }
  public static async updateContact(args: Array<string | undefined>) {
    if (args.length === 0) {
      ConsoleView.showError("Mohon masukan argumen yang diperlukan");
      return;
    }
    const [id, name, phone, company, email] = args;

    const newContact: AppResponse<ContactDTO> =
      await ContactService.updateContact(
        Number(id)!,
        name!,
        phone || null,
        company || null,
        email || null
      );
    if (newContact.success) {
      ConsoleView.showSuccess(newContact.message);
    } else {
      ConsoleView.showError(newContact.message);
    }
  }
  public static async deleteContact(args: Array<string | undefined>) {
    if (args.length === 0) {
      ConsoleView.showError("Mohon masukan argumen yang diperlukan");
      return;
    }
    const [id] = args;
    const deletedContact: AppResponse<ContactDTO> =
      await ContactService.deleteContact(Number(id)!);
    if (deletedContact.success) {
      ConsoleView.showSuccess(deletedContact.message);
    } else {
      ConsoleView.showError(deletedContact.message);
    }
  }
  public static async showContacts() {
    const allContact: AppResponse<ContactDTO[]> =
      await ContactService.showContacts();
    if (allContact.success) {
      ConsoleView.showSuccess(allContact.message);
      ConsoleView.showTable(allContact.data!);
    } else {
      ConsoleView.showError(allContact.message);
    }
  }
}
