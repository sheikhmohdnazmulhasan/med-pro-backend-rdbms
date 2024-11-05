import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getAllAdminFromDb(params: any) {
    try {
        const result = await prisma.admin.findMany({
            where: {
                name: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }
        });

        return {
            success: true,
            statusCode: 200,
            message: 'Admins fetched successfully',
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

export const AdminServices = {
    getAllAdminFromDb
}