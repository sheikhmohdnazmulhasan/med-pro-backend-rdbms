interface ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any; // Replace `any` with the actual Admin type if available
    error?: any; // Replace `any` with the error type if available
}