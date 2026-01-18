import express from "express";

export const api_router = express.Router();

// contact routes
api_router.get("/api/contacts");
api_router.post("/api/contacts");
api_router.delete("/api/contacts/:id");
api_router.patch("/api/contacts/:id");

// group routes
api_router.get("/api/groups");
api_router.post("/api/groups");
api_router.delete("/api/groups/:id");
api_router.patch("/api/groups/:id");

// contact group routes
api_router.get("/api/contact-group");
api_router.post("/api/contact-group");
api_router.delete("/api/contact-group/:id");
api_router.patch("/api/contact-group/:id");
