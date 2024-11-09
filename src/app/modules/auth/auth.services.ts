async function loginFromDb(payload: {
    email: string;
    password: string;
}) {
    try {
        console.log(payload);

    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || 'internal server error',
            error,
        }
    }
};

export const AuthServices = {
    loginFromDb
}