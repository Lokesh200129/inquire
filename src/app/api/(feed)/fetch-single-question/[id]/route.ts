// import { NextRequest, NextResponse } from "next/server";
// import { tryCatchWrapper } from "@/lib/api-handler";
// import { ApiResponse } from "@/lib/api-response";
// import Question from "@/models/Question";

// export const GET = tryCatchWrapper(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
//     const { id } = await params;

//     const question = await Question.findById(id).populate('author', 'name profileImage occupation location').select('-__v');

//     if (!question) {
//         return ApiResponse.error("Question not found", 404);
//     }

//     return NextResponse.json(question)
// });
import { NextRequest, NextResponse } from "next/server";
import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";
import Vote from "@/models/Vote";
import { getAuthUser } from "@/lib/auth";

export const GET = tryCatchWrapper(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    let loggedInUserId = null;
    try {
        const userSession = await getAuthUser(req);
        loggedInUserId = userSession?._id;
    } catch {
        console.error("Auth verification failed, proceeding as guest.");
    }

    const questionDoc = await Question.findById(id)
        .populate('author', 'name profileImage occupation location')
        .select('-__v');

    if (!questionDoc) {
        return ApiResponse.error("Question not found", 404);
    }

    let userVoteStatus = null;
    if (loggedInUserId) {
        const vote = await Vote.findOne({ userId: loggedInUserId, postId: id }).select("voteType");
        userVoteStatus = vote?.voteType ?? null;
    }

    const data = {
        ...questionDoc.toObject(),
        questionImage: (questionDoc.questionImage || []).filter((img: string) => img?.trim() !== ""),
        userVoteStatus
    };

    return NextResponse.json(data)
});