import { Router } from "express";
import { AdminControllers } from "./admin.controllers";
import Auth from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get('/',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    AdminControllers.getAllAdmin);

router.get('/:id',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    AdminControllers.getSingleAdminByID
);

router.patch('/:id',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    AdminControllers.updateAdmin);

router.delete('/:id',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    AdminControllers.deleteAdmin)

export const AdminRoutes = router;