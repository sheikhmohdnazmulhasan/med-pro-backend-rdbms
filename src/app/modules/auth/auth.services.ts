import bcrypt from 'bcryptjs';
import { prisma } from '../../constants/prisma_constructor';
import jwt from 'jsonwebtoken';
import config from '../../config';

async function loginFromDb(payload: {
    email: string;
    password: string;
}) {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: payload.email
            }
        });

        const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

        if (!isCorrectPassword) {
            return {
                success: false,
                statusCode: 401,
                message: 'Incorrect password'
            };
        };

        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        },
            config.jwt_access_token_secret as string,
            {
                expiresIn: '7d'
            }
        );


    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error,
        }
    }
};

export const AuthServices = {
    loginFromDb
}