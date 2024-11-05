import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

async function getAllAdmin(req: Request, res: Response) {
    try {
        const result = await AdminServices.getAllAdminFromDb(req.query)
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.send(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
}

export const AdminControllers = {
    getAllAdmin
}