import { PrismaClient, UserRole } from "@prisma/client";
import { encryptPassword } from "../../utils/hash_password";

const prisma = new PrismaClient();

async function createAdminIntoDb(payload: any) {

    try {
        const userPayload = {
            email: payload.admin.email,
            password: await encryptPassword(payload.password),
            role: UserRole.ADMIN
        };

        const result = await prisma.$transaction(async (tx) => {

            const createUser = await tx.user.create({
                data: userPayload
            });

            const createAdmin = await tx.admin.create({
                data: payload.admin
            });

            return [createUser, createAdmin]

        });

        return {
            success: true,
            statusCode: 201,
            message: 'admin created successfully',
            data: result[1]
        }

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error
        }
    }
}

export const UserServices = {
    createAdminIntoDb
}