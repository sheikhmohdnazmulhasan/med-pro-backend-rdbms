import { Router } from "express";
import { UserControllers } from "./user.controllers";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = Router();
router.post('/create-admin',
    Auth([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
    upload.single('file'),
    UserControllers.createAdmin);

export const UserRoutes = router