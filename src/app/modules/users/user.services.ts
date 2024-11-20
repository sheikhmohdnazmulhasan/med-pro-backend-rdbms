import { Admin, Doctor, UserRole } from "@prisma/client";
import { prisma } from "../../constants/prisma_constructor";
import { encryptPassword } from "../../../utils/hash_password";
import { JwtPayload } from "jsonwebtoken";

async function getMyProfileFromDb(tokenInfo: JwtPayload) {
    try {

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: tokenInfo.email
            }
        });

        // @ts-ignore
        const additionalInfo = await prisma[user.role.toLowerCase()].findFirst({
            where: {
                email: tokenInfo.email,
            },
        });

        return {
            success: true,
            statusCode: 201,
            message: 'User data fetched successfully',
            data: { ...user, ...additionalInfo }
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

async function updateMyProfileIntoDb(tokenInfo: JwtPayload, payload: Partial<Admin | Doctor>) {

    try {
        const table = prisma[tokenInfo.role.toLowerCase() as keyof typeof prisma] as any

        const result = await table.update({
            where: {
                email: tokenInfo.email
            },
            data: payload
        });

        return {
            success: true,
            statusCode: 201,
            message: 'User data updated successfully',
            data: result
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
};

async function createdDoctorIntoDb(payload: any) {

    try {
        const userPayload = {
            email: payload.doctor.email,
            password: await encryptPassword(payload.password),
            role: UserRole.DOCTOR
        };

        const result = await prisma.$transaction(async (tx) => {
            const createUser = await tx.user.create({
                data: userPayload
            });

            const createDoctor = await tx.doctor.create({
                data: payload.doctor
            });

            return [createUser, createDoctor]
        });

        return {
            success: true,
            statusCode: 201,
            message: 'doctor created successfully',
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
    createAdminIntoDb,
    createdDoctorIntoDb,
    getMyProfileFromDb,
    updateMyProfileIntoDb
}