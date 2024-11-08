import { Request, Response } from "express";

function globalErrorHandler(error: any, req: Request, res: Response) {
    console.log({ error });
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error
    })
};

export default globalErrorHandler