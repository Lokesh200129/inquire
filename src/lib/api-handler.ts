import { connectDB } from "@/lib/db";
import parseError from "./parse-error";

export function tryCatchWrapper(handler: Function) {
    return async (req: Request, ...args: any[]) => {
        try {
            await connectDB();
            return await handler(req, ...args);
        } catch (error) {
            return parseError(error)
        }
    };
}