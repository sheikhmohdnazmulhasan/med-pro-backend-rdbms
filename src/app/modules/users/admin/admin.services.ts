import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getAllAdminFromDb(params: any) {

    try {
        const result = params && params.searchTerm ?
            await prisma.admin.findMany({
                where: {
                    OR: ['name', 'email'].map((field: string) => ({
                        [field]: {
                            contains: params.searchTerm,
                            mode: 'insensitive',
                        }
                    }))
                }
            }) : await prisma.admin.findMany();

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