import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import parseError from "@/lib/parse-error";
export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TCommentRequest): Promise<TCommentResponse> => {
            console.log(data)
            const response = await fetch("/api/add-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to post comment");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => toast.error(parseError(err)),

    });
};