import bcrypt from 'bcryptjs';
import { prisma } from '../../constants/prisma_constructor';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { UserStatus } from '@prisma/client';
import { encryptPassword } from '../../../utils/hash_password';

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

        if (!accessToken) {
            return {
                success: false,
                statusCode: 400,
                message: 'failed to create access token'
            }
        }

        const refreshToken = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        },
            config.jwt_access_token_secret as string,
            {
                expiresIn: '365d'
            }
        );

        return {
            success: true,
            statusCode: 200,
            message: 'logged in successful',
            data: {
                accessToken,
                refreshToken
            }
        }

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error,
        }
    }
};

async function changePasswordIntoDb(user: JwtPayload, payload: { oldPassword: string; newPassword: string }) {

    try {
        const userObj = await prisma.user.findUniqueOrThrow({
            where: {
                email: user.email,
                status: UserStatus.ACTIVE
            }
        });

        const isCorrectPassword = await bcrypt.compare(payload.oldPassword, userObj.password);

        if (!isCorrectPassword) {
            return {
                success: false,
                statusCode: 401,
                message: 'Incorrect password'
            };
        };

        await prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                password: await encryptPassword(payload.newPassword),
                needPasswordChange: false
            }
        });

        return {
            success: true,
            statusCode: 200,
            message: 'password changed successfully',

        }

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error,
        }
    }
}

export const AuthServices = {
    loginFromDb,
    changePasswordIntoDb
}