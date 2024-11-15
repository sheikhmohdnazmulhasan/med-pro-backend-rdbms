import { Router } from "express";
import { authControllers } from "./auth.controllers";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post('/login', authControllers.login);

router.patch('/change-password',
    Auth([UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN]),
    authControllers.changePassword)

export const AuthRoutes = router;