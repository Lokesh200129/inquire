import { connectDB } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";

export function tryCatchWrapper(handler: Function) {
    return async (req: Request, ...args: any[]) => {
        try {
            await connectDB();
            return await handler(req, ...args);
        } catch (error: any) {
            console.error("API_ERROR:", error);

            if (error.name === "ValidationError") {
                return ApiResponse.error("Invalid data provided", 400, error.errors);
            }

            return ApiResponse.error(
                error.message || "Internal Server Error",
                error.status || 500
            );
        }
    };
}