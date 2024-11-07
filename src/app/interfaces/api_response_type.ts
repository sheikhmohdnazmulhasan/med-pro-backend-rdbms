interface ApiSuccessResponse<T = any> {
    success: true;
    statusCode: number;
    message: string;
    data: T;
}

interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string;
    error: any;
}

type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;
