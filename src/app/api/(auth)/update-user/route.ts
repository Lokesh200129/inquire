import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import { cloudinaryConfig } from '@/lib/cloudinary'

export const PATCH = tryCatchWrapper(async (req: NextRequest) => {
    cloudinaryConfig();
    const formData = await req.formData();
    const file = formData.get('profileImage') as File;
    const _id = formData.get('_id');
    const existingUser = await User.findById(_id);
    let imageUrl = existingUser?.profileImage || "";

    if (file && file.size > 0) {
        // first delete older
        if (existingUser?.profileImage) {
            try {
                const publicId = existingUser.profileImage.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);

            } catch (err) {
                console.error("Cloudinary delete failed:", err);
            }
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "inquire_profiles" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        });

        imageUrl = uploadResponse.secure_url;
    }
    const name = formData.get('name');
    const occupation = formData.get('occupation');
    const location = formData.get('location');
    const bio = formData.get('bio');

    const updatePayload: any = {
        name,
        occupation,
        location,
        bio,
        profileImage: imageUrl || "https://res.cloudinary.com/db6wium4n/image/upload/v1770358944/avatar_xibibu.png"
    };
    console.log(updatePayload)
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: updatePayload },
        { new: true }
    ).select('-password');

    return ApiResponse.success(updatedUser, 200);
});