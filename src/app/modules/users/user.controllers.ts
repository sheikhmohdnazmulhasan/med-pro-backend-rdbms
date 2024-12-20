import { Request, Response } from "express";
import { UserServices } from "./user.services";

async function getMyProfile(req: Request, res: Response) {
    try {
        const result = await UserServices.getMyProfileFromDb(req.user);
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.send(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
};

async function updateMyProfile(req: Request, res: Response) {
    try {
        const result = await UserServices.updateMyProfileIntoDb(req.user, req.body);
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.send(500).json({
            success: false,
            message: 'something went wrong',
            error
        })
    }
};

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
};

async function createdDoctor(req: Request, res: Response) {
    try {
        const result = await UserServices.createdDoctorIntoDb(req.body);
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
    createAdmin,
    createdDoctor,
    getMyProfile,
    updateMyProfile
}