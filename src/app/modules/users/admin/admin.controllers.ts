import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import { Admin } from "@prisma/client";

async function getAllAdmin(req: Request, res: Response) {
    try {
        const result = await AdminServices.getAllAdminFromDb(req.query)
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
};

async function getSingleAdminByID(req: Request, res: Response) {
    try {
        const result = await AdminServices.getSingleAdminByIDFromDb(req.params.id);
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.send(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
};

async function updateAdmin(req: Request, res: Response) {
    try {
        const result = await AdminServices.updateAdminIntoDb(req.params.id as string, req.body as Partial<Admin>);
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'internal server error',
            error
        })
    }
}

export const AdminControllers = {
    getAllAdmin,
    getSingleAdminByID,
    updateAdmin
}