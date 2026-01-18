import express from "express";
import { api_router } from "../routes/api.route";
import { static_router } from "../routes/public.route";

export const web = express();
web.use(api_router);
web.use(static_router);
