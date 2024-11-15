import { Router } from "express";
import { UserControllers } from "./user.controllers";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post('/create-admin', Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]), UserControllers.createAdmin);

export const UserRoutes = router