import { Router } from "express";
import { getCatalog } from "../controllers/catalog.controller";

const router = Router();

router.get('/', getCatalog);

export default router;