import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getAllAdminFromDb() {
    try {
        const result = await prisma.admin.findMany();
        return {
            success: true,
            statusCode: 200,
            message: 'admins fetched successfully',
            data: result
        };

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error
        }
    }
}

export const adminServices = {
    getAllAdminFromDb
}