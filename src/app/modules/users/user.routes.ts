import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

router.post('/create-admin', UserControllers.createAdmin);

export const UserRoutes = router