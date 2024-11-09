import { Router } from "express";
import { UserRoutes } from "../modules/users/user.routes";
import { AdminRoutes } from "../modules/users/admin/admin.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";



const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/user/admin',
        route: AdminRoutes
    },
    {
        path: '/user/auth',
        route: AuthRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;