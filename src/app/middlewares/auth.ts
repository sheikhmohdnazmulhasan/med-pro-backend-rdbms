import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/app_error";

function Auth(roles: string[]) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new AppError(401, 'you are not authorized');
            };

            jwt.verify(token, config.jwt_access_token_secret as Secret, (err, decode) => {

                if (err) {
                    throw new AppError(401, 'you are not authorized');

                } else {
                    const payload = decode as JwtPayload;

                    if (!roles.includes(payload.role)) {
                        throw new AppError(401, 'you are not authorized');

                    } else {
                        req.user = payload;
                        next()
                    }

                }
            });

        } catch (error) {
            next(error)
        }
    }
}

export default Auth;