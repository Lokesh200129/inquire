import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import { cookies } from "next/headers";

export const POST = tryCatchWrapper(async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.set("token", "", { maxAge: 0 });
        return ApiResponse.success("Logged out successfully", 201);
    } catch {
        return ApiResponse.error("Logout failed", 500);
    }
})