
import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";
import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cloudinaryConfig } from "@/lib/cloudinary";
import { v2 as cloudinary } from 'cloudinary';

export const DELETE = tryCatchWrapper(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    cloudinaryConfig();
    const resolvedParams = await params;
    const postId = resolvedParams?.id;
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

    if (!token) return ApiResponse.error("Unauthorized", 401);

    const requesterData = await verifyToken(token);
    const requesterId = requesterData?.userId;

    const post = await Question.findById(postId);
    if (!post) return ApiResponse.error("Post not found", 404);

    if (post.author.toString() !== requesterId) {
        return ApiResponse.error("Forbidden: You don't own this post", 403);
    }

    if (post.questionImage && Array.isArray(post.questionImage) && post.questionImage.length > 0) {
        try {
            const deletionPromises = post.questionImage.map((imageUrl: string) => {
                const parts = imageUrl.split('/');
                const fileNameWithExtension = parts.pop();
                const folderName = parts.pop();
                const publicId = `${folderName}/${fileNameWithExtension?.split(".")[0]}`;

                if (publicId) {
                    return cloudinary.uploader.destroy(publicId);
                }
                return Promise.resolve();
            });

            await Promise.all(deletionPromises);
        } catch (cloudinaryError) {
            console.error("Cloudinary deletion failed:", cloudinaryError);

        }
    }

    await Question.findByIdAndDelete(postId);

    return ApiResponse.success({ message: "Post and associated images deleted" }, 200);
});