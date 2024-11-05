import { Router } from "express";
import { AdminControllers } from "./admin.controllers";

const router = Router();

router.get('/', AdminControllers.getAllAdmin);

export const AdminRoutes = router;