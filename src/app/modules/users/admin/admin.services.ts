import isDateString from "../../../utils/isDateString";
import { prisma } from "../../../constants/prisma_constructor";
import { Admin } from "@prisma/client";

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
    try {
        const result = await prisma.admin.findUnique({
            where: {
                id
            }
        });

        return {
            success: true,
            statusCode: 200,
            message: 'admin fetched successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error
        }
    }
};

async function updateAdminIntoDb(id: string, payload: Partial<Admin>) {
    try {
        await prisma.admin.findUniqueOrThrow({
            where: {
                id
            }
        })
        const result = await prisma.admin.update({
            where: {
                id
            },
            data: payload
        });

        return {
            success: true,
            statusCode: 200,
            message: 'Admin info updated successfully',
            data: result
        };

    } catch (error: any) {
        return {
            success: false,
            statusCode: error.status || 500,
            message: error.message || 'internal server error',
            error
        }
    }

}

export const AdminServices = {
    getAllAdminFromDb,
    getSingleAdminByIDFromDb,
    updateAdminIntoDb
}