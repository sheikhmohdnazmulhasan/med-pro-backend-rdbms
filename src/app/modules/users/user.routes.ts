import { Router } from "express";
import { UserControllers } from "./user.controllers";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../utils/file_uploader";

const router = Router();

router.post('/create-admin',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    upload.single('file'),
    UserControllers.createAdmin);

export const UserRoutes = router