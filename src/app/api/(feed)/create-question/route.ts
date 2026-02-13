import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import Question from "@/models/Question";
import { NextRequest } from "next/server";
import { cloudinaryConfig } from "@/lib/cloudinary";
import { v2 as cloudinary } from 'cloudinary'

export const POST = tryCatchWrapper(async (req: NextRequest) => {
    cloudinaryConfig();
    const formData = await req.formData();
    const files = formData.getAll('questionImage') as File[];
    const title = formData.get('title');
    const content = formData.get('content');
    const tags = formData.get('tags');
    const author = formData.get('_id');

    if (!title || !content || !author) {
        return ApiResponse.error('Missing Data', 400);
    }

    const imageUrls: string[] = [];

    if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
            if (file.size === 0) return null;

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "inquire_posts" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                ).end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);
        results.forEach(url => {
            if (url) imageUrls.push(url as string);
        });
    }

    const question = await Question.create({
        author,
        title,
        content,
        tags: tags ? (tags as string).split(',') : [],
        questionImage: imageUrls
    });

    if (question) {
        return ApiResponse.success(question, 201);
    }

    return ApiResponse.error("Failed to create post", 500);
});