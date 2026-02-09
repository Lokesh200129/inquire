import { NextResponse } from "next/server";

export const ApiResponse = {
    success: (data: unknown, status = 200) => {
        return NextResponse.json({ data, status });
    },
    error: (message = "Internal Server Error", status = 500, errors: unknown = null) => {
        return NextResponse.json({ message, errors }, { status });
    },
};