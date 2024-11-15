import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

async function login(req: Request, res: Response) {
    try {
        const result = await AuthServices.loginFromDb(req.body);

        if (result.success) {
            // @ts-ignore: refresh token is always exist
            const { refreshToken, ...dataWithoutRefreshToken } = result.data;

            const responseWithRefreshToken = {
                ...result,
                data: dataWithoutRefreshToken
            };

            res.cookie('refreshToken', refreshToken, {
                secure: false,
                httpOnly: true
            });

            res.status(result.statusCode).json(responseWithRefreshToken);

        } else {
            res.status(result.statusCode).json(result);
        }

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