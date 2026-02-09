import { ApiResponse } from "@/lib/api-response";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { tryCatchWrapper } from "@/lib/api-handler";

export const POST = tryCatchWrapper(async (req: Request) => {

    const { email, password } = await req.json();
    const user = await User.findOne({ email })
    if (!user) return ApiResponse.error("Invalid Credentials", 401);

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) return ApiResponse.error("Invalid Credentials", 401);

    const token = await signToken({ userId: user._id.toString(), email: user.email })

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });
    const userData = user.toObject();
    delete userData.password;

    return ApiResponse.success(userData, 200)

})