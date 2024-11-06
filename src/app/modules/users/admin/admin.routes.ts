import { Router } from "express";
import { AdminControllers } from "./admin.controllers";

const router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getSingleAdminByID);

export const AdminRoutes = router;