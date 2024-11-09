import { Router } from "express";
import { UserRoutes } from "../app/modules/users/user.routes";
import { AdminRoutes } from "../app/modules/users/admin/admin.routes";


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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;