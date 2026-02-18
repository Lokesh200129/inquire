
"use client";

import React, { useState } from "react";
import { useAddComment } from "@/hooks/use-add-comment";
import CustomUserAvatar from "@/components/user-avatar";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import GlobalLoader from "./global-loader";
import { Button } from "@/components/ui/button";

interface Props {
    questionId: string | undefined;
    initialComments: TCommentResponse[];
    isOpen: boolean;
}

const CommentSection = ({ questionId, initialComments, isOpen }: Props) => {
    const { data: user } = useCurrentUser();
    const userId = user?._id;

    const [commentText, setCommentText] = useState("");
    const { mutate: addComment, isPending } = useAddComment();

    const handlePostComment = () => {
        if (!commentText.trim()) return;
        addComment(
            {
                questionId: questionId!,
                authorId: userId!,
                content: commentText,
            },
            {
                onSuccess: () => setCommentText(""),
            }
        );
    };

    return (
        <div className="w-full border-t border-gray-100 mt-4 pt-4">
            {isOpen && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">

                    {/* Input Field Area */}
                    <div className="flex gap-3 items-center">
                        <CustomUserAvatar
                            src={user?.profileImage}
                            name={user?.name}
                            size="md"
                            className="shrink-0"
                        />

                        {/* Shadcn-style input group: input + button side by side in a styled container */}
                        <div className="flex flex-1 min-w-0 items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                                className="
                  flex-1 min-w-0 bg-transparent border-none outline-none
                  text-sm text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400
                  py-1
                "
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handlePostComment}
                                disabled={isPending || !commentText.trim()}
                                className="
                  shrink-0 h-8 w-8 rounded-full
                  hover:bg-blue-100 dark:hover:bg-blue-950
                  text-blue-600
                  disabled:text-gray-300 disabled:bg-transparent
                  transition-colors
                "
                            >
                                {isPending ? <GlobalLoader /> : <Send className="h-4 w-4" />}
                                <span className="sr-only">Send comment</span>
                            </Button>
                        </div>
                    </div>

                    <hr className="border-gray-100 dark:border-gray-800" />

                    {/* Comment List */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                            Answers
                        </h4>

                        {initialComments?.length > 0 ? (
                            initialComments.map((comment, index) => (
                                <div key={comment._id} className="w-full overflow-hidden">
                                    <div className="flex gap-3 items-start overflow-hidden w-full">
                                        <CustomUserAvatar
                                            src={comment?.author?.image}
                                            name={comment?.author?.name}
                                            size="sm"
                                            className="mt-0.5 shrink-0"
                                        />

                                        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                                            <div>
                                                <span className="text-sm font-semibold text-gray-700  truncate">
                                                    {comment.author.name}
                                                </span>

                                                <span className="text-[10px] text-gray-400 mt-1">
                                                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                                                </span>
                                            </div>
                                            <p
                                                className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed"
                                                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                                            >
                                                {comment?.content}
                                            </p>


                                        </div>
                                    </div>

                                    {index !== initialComments?.length - 1 && (
                                        <hr className="border-gray-100 dark:border-gray-800 mt-4" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">
                                No answer yet. Be the first!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;