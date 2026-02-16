import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";

interface queryProp {
    author?: string;
    tags?: string;
}
export const GET = tryCatchWrapper(async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag")
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const userId = searchParams.get('userId');
    const query: queryProp = {};

    if (userId) {
        query.author = userId
    }
    if (tag) {
        query.tags = tag
    }
    const question = await Question.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name profileImage occupation location').select('-__v');
    const total = await Question.countDocuments(query);
    const data = {
        question,
        nextPage: skip + limit < total ? page + 1 : null,
        totalPages: Math.ceil(total / limit)
    }
    return ApiResponse.success(data, 200)
})