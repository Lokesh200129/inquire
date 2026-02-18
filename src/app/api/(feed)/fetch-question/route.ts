// import { tryCatchWrapper } from "@/lib/api-handler";
// import { ApiResponse } from "@/lib/api-response";
// import Question from "@/models/Question";

// interface queryProp {
//     author?: string;
//     tags?: string;
// }
// export const GET = tryCatchWrapper(async (req: Request) => {
//     const { searchParams } = new URL(req.url);
//     const tag = searchParams.get("tag")
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '10');
//     const skip = (page - 1) * limit;
//     const userId = searchParams.get('userId');
//     const query: queryProp = {};

//     if (userId) {
//         query.author = userId
//     }
//     if (tag) {
//         query.tags = tag
//     }
//     const question = await Question.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name profileImage occupation location').select('-__v');
//     const total = await Question.countDocuments(query);
//     const data = {
//         question,
//         nextPage: skip + limit < total ? page + 1 : null,
//         totalPages: Math.ceil(total / limit)
//     }
//     console.log(data)
//     return ApiResponse.success(data, 200)
// })

import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";
import Vote from "@/models/Vote";
import { getAuthUser } from "@/lib/auth";
import { NextRequest } from "next/server";

interface queryProp {
    author?: string;
    tags?: string;
}

export const GET = tryCatchWrapper(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const userIdQuery = searchParams.get("userId");

    const query: queryProp = {};
    if (userIdQuery) query.author = userIdQuery;
    if (tag) query.tags = tag;

    const questionDocs = await Question.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "name profileImage occupation location")
        .populate({
            path: "comments.author",
            select: "name profileImage"
        })
        .select("-__v");

    const total = await Question.countDocuments(query);

    let loggedInUserId: string | null = null;
    try {
        const userSession = await getAuthUser(req);
        loggedInUserId = userSession?._id?.toString() ?? null;
    } catch {
        loggedInUserId = null;
    }

    let questionsWithVoteStatus;

    if (loggedInUserId && questionDocs.length > 0) {
        const questionIds = questionDocs.map((q) => q._id);

        const userVotes = await Vote.find({
            userId: loggedInUserId,
            postId: { $in: questionIds },
        }).select("postId voteType");

        const voteMap = new Map(
            userVotes.map((v) => [v.postId.toString(), v.voteType])
        );
        questionsWithVoteStatus = questionDocs.map((q) => ({
            ...q.toObject(),
            questionImage: q.questionImage || [],
            userVoteStatus: voteMap.get(q._id.toString()) ?? null,
        }));
    } else {
        questionsWithVoteStatus = questionDocs.map((q) => ({
            ...q.toObject(),
            questionImage: q.questionImage || [],
            userVoteStatus: null,
        }));
    }

    const data = {
        question: questionsWithVoteStatus,
        nextPage: skip + limit < total ? page + 1 : null,
        totalPages: Math.ceil(total / limit),
    };

    return ApiResponse.success(data, 200);
});