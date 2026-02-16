import { NextRequest, NextResponse } from "next/server";
import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";

export const GET = tryCatchWrapper(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const question = await Question.findById(id).populate('author', 'name profileImage occupation location').select('-__v');

    if (!question) {
        return ApiResponse.error("Question not found", 404);
    }

    return NextResponse.json(question)
});