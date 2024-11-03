import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

router.get('/create-admin', UserControllers.createAdmin);

export const UserRoutes = router