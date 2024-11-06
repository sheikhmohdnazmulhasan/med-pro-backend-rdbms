import { PrismaClient } from "@prisma/client"
import isDateString from "../../../utils/isDateString";

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
            }) : Object.keys(params).filter((key: string) => key !== params.searchTerm).length > 0 ?
                await prisma.admin.findMany({
                    where: {
                        AND: Object.keys(params).map((key: string) => {

                            // Check if the value is a date string
                            if (typeof params[key] === 'string' && isDateString(params[key])) {
                                return {
                                    [key]: {
                                        equals: new Date(params[key])
                                    }
                                }
                            } else {
                                return {
                                    [key]: {
                                        equals: params[key],
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        })
                    }
                }) : await prisma.admin.findMany()

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
};

async function getSingleAdminByIDFromDb(id: string) {
    console.log(id);
}

export const AdminServices = {
    getAllAdminFromDb,
    getSingleAdminByIDFromDb
}