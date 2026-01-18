import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "..", "public");

export const static_router = express.Router();

static_router.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
