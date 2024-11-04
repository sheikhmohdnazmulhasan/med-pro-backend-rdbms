import { Request, Response } from "express";
import { UserServices } from "./user.services";

async function createAdmin(req: Request, res: Response) {
    try {
        const result = await UserServices.createAdminIntoDb(req.body);

        res.status(result.statusCode).json(result);

    } catch (error) {
        res.send(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
}

export const UserControllers = {
    createAdmin
}