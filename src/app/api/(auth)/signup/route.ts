
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";
import { tryCatchWrapper } from "@/lib/api-handler";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
export const POST = tryCatchWrapper(async (req: Request) => {
    const { email, password, name } = await req.json();
    if (!email || !password || !name) return ApiResponse.error('Missing Fields', 500);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return ApiResponse.error('user already exists', 400)
    }
    else {
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({ name, email, password: hashedPassword });
        const userResponse = newUser.toObject();
        delete userResponse.password;
        const token = await signToken({ userId: userResponse._id.toString(), email: userResponse.email })

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });
        return ApiResponse.success(userResponse, 201)
    }
})