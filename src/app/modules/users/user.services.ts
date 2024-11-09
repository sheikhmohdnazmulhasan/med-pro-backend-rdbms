import { UserRole } from "@prisma/client";
import { prisma } from "../../constants/prisma_constructor";
import { encryptPassword } from "../../../utils/hash_password";

async function createAdminIntoDb(payload: any): Promise<ApiResponse> {

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
            data: result[1],
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

export const UserServices = {
    createAdminIntoDb
}