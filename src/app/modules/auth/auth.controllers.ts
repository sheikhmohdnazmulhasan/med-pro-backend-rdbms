import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

async function login(req: Request, res: Response) {
    try {
        const result = await AuthServices.loginFromDb(req.body);
        // @ts-ignore: refresh token is always exist
        const { refreshToken, ...dataWithRefreshToken } = result.data;

        const responseWithRefreshToken = {
            ...result,
            data: dataWithRefreshToken
        };

        res.cookie('refreshToken', refreshToken, {
            secure: false,
            httpOnly: true
        });

        res.status(result.statusCode).json(responseWithRefreshToken);

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