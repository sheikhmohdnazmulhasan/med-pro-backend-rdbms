import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

async function login(req: Request, res: Response) {
    try {
        const result = await AuthServices.loginFromDb(req.body);

        // send response

    } catch (error: any) {
        res.send(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error
        })
    }
};

export const authControllers = {
    login
}