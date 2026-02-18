import Question from "@/models/Question";
import { tryCatchWrapper } from "@/lib/api-handler";
import { NextRequest } from "next/server";

export const POST = tryCatchWrapper(async (req: NextRequest) => {

    const { questionId, content, authorId } = await req.json();
    if (!questionId || !content || !authorId) {
        return new Response("Missing required fields", { status: 400 });
    }
    console.log(questionId, content, authorId)
    const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        {
            $push: {
                comments: {
                    $each: [{
                        author: authorId,
                        content: content,
                        createdAt: new Date()
                    }],
                    $position: 0
                }
            }
        },
        { new: true, runValidators: true }
    ).populate("comments.author", "name image");
    console.log(updatedQuestion)
    return new Response(JSON.stringify(updatedQuestion), { status: 201 });
})