// import { connectDB } from "@/lib/db";
// import parseError from "./parse-error";

// export function tryCatchWrapper(handler: Function) {
//     return async (req: Request, ...args: any[]) => {
//         try {
//             await connectDB();
//             return await handler(req, ...args);
//         } catch (error) {
//             return parseError(error)
//         }
//     };
// }
import { connectDB } from "@/lib/db";
import parseError from "./parse-error";

export function tryCatchWrapper(handler: Function) {
    return async (req: Request, ...args: any[]) => {
        try {
            await connectDB();

            const response = await handler(req, ...args);

            // Safety check: Ensure the handler actually returned something
            if (!response) {
                console.error("Handler failed to return a Response object.");
                return new Response(
                    JSON.stringify({ error: "Internal Server Error: No response from handler" }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                );
            }

            return response;
        } catch (error) {
            console.error("[API_ERROR]:", error);
            const errorResult = parseError(error);
            return new Response(
                JSON.stringify(errorResult || { error: "An unexpected error occurred" }),
                {
                    status: (errorResult as any)?.status || 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    };
}