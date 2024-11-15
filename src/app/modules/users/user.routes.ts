import { Router } from "express";
import { UserControllers } from "./user.controllers";
import Auth from "../../middlewares/auth";

const router = Router();

router.post('/create-admin', Auth('x'), UserControllers.createAdmin);

export const UserRoutes = router