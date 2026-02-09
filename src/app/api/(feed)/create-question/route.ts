import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";
import { NextRequest } from "next/server";
import { cloudinaryConfig } from "@/lib/cloudinary";
import { v2 as cloudinary } from 'cloudinary'

export const POST = tryCatchWrapper(async (req: NextRequest) => {
    cloudinaryConfig();
    const formData = await req.formData();
    const file = formData.get('questionImage') as File;
    const title = formData.get('title');
    const content = formData.get('content');
    const tags = formData.get('tags');
    const author = formData.get('_id');

    if (!title || !content || !author) {
        return ApiResponse.error('Missing Data', 400);
    }

    let imageUrl = '';

    if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "inquire_posts" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });
        imageUrl = uploadResponse.secure_url;
    }

    const question = await Question.create({
        author,
        title,
        content,
        tags: tags ? (tags as string).split(',') : [],
        questionImage: imageUrl
    });
    if (question) {
        return ApiResponse.success(question, 201);
    }

    return ApiResponse.error("Failed to create post", 500);
});