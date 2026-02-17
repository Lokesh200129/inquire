import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface VotePayload {
    postId: string;
    voteType: "UP" | "DOWN";
}

export const useVote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: VotePayload) => {
            const { data } = await axios.post("/api/vote", payload);
            return data;
        },
        onMutate: async (newVote) => {
            await queryClient.cancelQueries({ queryKey: ["questions"] });
            const previousQuestions = queryClient.getQueryData(["questions"]);
            queryClient.setQueryData(["questions"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    question: old.question.map((q: any) => {
                        if (q._id === newVote.postId) {
                            const isCheckingSame = q.userVoteStatus === newVote.voteType;
                            const isSwitching = q.userVoteStatus !== null && q.userVoteStatus !== newVote.voteType;

                            // Calculate new counts
                            let upvotes = q.upvotes;
                            let downvotes = q.downvotes;

                            if (isCheckingSame) {

                                newVote.voteType === "UP" ? upvotes-- : downvotes--;
                            } else if (isSwitching) {
                                // Switching sides
                                if (newVote.voteType === "UP") {
                                    upvotes++;
                                    downvotes--;
                                } else {
                                    upvotes--;
                                    downvotes++;
                                }
                            } else {
                                // Fresh vote
                                newVote.voteType === "UP" ? upvotes++ : downvotes++;
                            }

                            return {
                                ...q,
                                upvotes,
                                downvotes,
                                userVoteStatus: isCheckingSame ? null : newVote.voteType,
                            };
                        }
                        return q;
                    }),
                };
            });

            return { previousQuestions };
        },

        onError: (err, newVote, context) => {
            queryClient.setQueryData(["questions"], context?.previousQuestions);
            toast.error("Failed to record vote. Please try again.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
};