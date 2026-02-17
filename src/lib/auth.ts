import bcrypt from "bcryptjs"
import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}


export async function getAuthUser(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value ||
            req.headers.get("authorization")?.split(" ")[1];

        if (!token) return null;
        const requesterData = await verifyToken(token);
        const requesterId = requesterData?.userId;

        if (!requesterId) return null;

        await connectDB();
        const user = await User.findById(requesterId).select("-password");
        return user;
    } catch (error) {
        console.error("Auth helper error:", error);
        return null;
    }
}
