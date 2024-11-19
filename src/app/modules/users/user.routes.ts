import { Router } from "express";
import { UserControllers } from "./user.controllers";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../utils/file_uploader";

const router = Router();

router.get('/me',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT]),
    UserControllers.getMyProfile)

router.post('/create-admin',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    upload.single('file'),
    UserControllers.createAdmin);

router.post('/create-doctor',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    UserControllers.createdDoctor)

export const UserRoutes = router