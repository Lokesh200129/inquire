import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { tryCatchWrapper } from "@/lib/api-handler";

export const GET = tryCatchWrapper(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded?.userId).select("-password");
    return NextResponse.json(user);

})