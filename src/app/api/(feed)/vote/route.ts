import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Question from "@/models/Question";
import Vote from "@/models/Vote";

import { getAuthUser } from "@/lib/auth";
import { tryCatchWrapper } from "@/lib/api-handler";

export const POST = tryCatchWrapper(async (req: NextRequest) => {
    const session = await mongoose.startSession();
    const userSession = await getAuthUser(req);
    if (!userSession?._id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = userSession._id;
    const { postId, voteType }: TVoteRequestBody = await req.json();

    if (!postId || !['UP', 'DOWN'].includes(voteType)) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    let resultMessage = "";
    let currentVoteStatus: string | null = voteType;

    await session.withTransaction(async () => {
        const existingVote = await Vote.findOne({ postId, userId }).session(session);

        if (existingVote) {
            if (existingVote.voteType === voteType) {

                await Vote.deleteOne({ _id: existingVote._id }).session(session);
                const decField = voteType === 'UP' ? 'upvotes' : 'downvotes';

                await Question.findByIdAndUpdate(postId, { $inc: { [decField]: -1 } }).session(session);
                resultMessage = "Vote removed";
                currentVoteStatus = null;
                
            } else {
               
                const oldField = existingVote.voteType === 'UP' ? 'upvotes' : 'downvotes';
                const newField = voteType === 'UP' ? 'upvotes' : 'downvotes';

                existingVote.voteType = voteType;
                await existingVote.save({ session });

                await Question.findByIdAndUpdate(postId, {
                    $inc: { [oldField]: -1, [newField]: 1 }
                }).session(session);
                resultMessage = "Vote switched";
          
            }
        } else {
           
            await Vote.create([{ postId, userId, voteType }], { session });
            const incField = voteType === 'UP' ? 'upvotes' : 'downvotes';

            await Question.findByIdAndUpdate(postId, { $inc: { [incField]: 1 } }).session(session);
            resultMessage = "Vote recorded";
            // return NextResponse.json({ message: resultMessage, status: 200 });

        }
    });
    session.endSession();
    return NextResponse.json({ message: resultMessage, vote: currentVoteStatus }, { status: 200 });

})
