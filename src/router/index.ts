import { Router } from "express";
import { UserRoutes } from "../app/modules/users/user.routes";


const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;