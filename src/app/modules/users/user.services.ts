import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function createAdminIntoDb(payload: any) {

    try {
        const userPayload = {
            email: payload.admin.email,
            password: payload.password,
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
            data: result[0]
        }

    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'internal server error',
            error
        }
    }
}

export const UserServices = {
    createAdminIntoDb
}