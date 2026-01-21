import express from "express";
import { ContactController } from "../controller/contact.controller";
import { GroupController } from "../controller/group.controller";
import { ContactGroupController } from "../controller/contact-group.controller";

export const api_router = express.Router();

// contact routes
api_router.get("/api/contacts", ContactController.showContactHandler);
api_router.post("/api/contacts", ContactController.createContactHandler);
api_router.delete(
  "/api/contacts/:contactId",
  ContactController.deleteContactHandler,
);
api_router.patch(
  "/api/contacts/:contactId",
  ContactController.updateContactHandler,
);

// group routes
api_router.get("/api/groups", GroupController.showGroupHandler);
api_router.post("/api/groups", GroupController.createGroupHandler);
api_router.delete("/api/groups/:groupId", GroupController.deleteGroupHandler);
api_router.patch("/api/groups/:groupId", GroupController.updateGroupHandler);

// contact group routes
api_router.post(
  "/api/contact-group",
  ContactGroupController.createContactGroupHandler,
);
api_router.delete(
  "/api/contact-group/:contactGroupId",
  ContactGroupController.deleteContactGroupHandler,
);
api_router.patch(
  "/api/contact-group/:contactGroupId",
  ContactGroupController.updateContactGroupHandler,
);
