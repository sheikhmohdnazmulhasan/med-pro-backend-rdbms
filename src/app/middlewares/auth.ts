import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../config";

function Auth(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error('you are not authorized');
            };

            jwt.verify(token, config.jwt_access_token_secret as Secret, (err, decode) => {

                if (err) {
                    throw new Error('you are not authorized');

                } else {
                    const payload = decode as JwtPayload;

                    // if(roles.includes(payload.))


                    console.log(payload);
                }
            });

        } catch (error) {
            next(error)
        }
    }
}

export default Auth;