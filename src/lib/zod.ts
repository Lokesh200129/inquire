import * as z from "zod";

export const postSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    tags: z.string().optional(), // We'll split this string into an array later
    questionImage: z.any().optional(),
});

export type TPostForm = z.infer<typeof postSchema>;
