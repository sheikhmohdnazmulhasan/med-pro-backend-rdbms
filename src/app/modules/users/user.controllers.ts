import { Request, Response } from "express";
import { UserServices } from "./user.services";

async function createAdmin(req: Request, res: Response) {
    const result = await UserServices.createAdminIntoDb();

    res.status(200).json({
        result
    })
}

export const UserControllers = {
    createAdmin
}