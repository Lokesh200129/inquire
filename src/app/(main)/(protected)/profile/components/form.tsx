"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { useUpdateUser } from "@/hooks/auth/use-update-user"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { useEffect, useState } from "react"
import GlobalLoader from "@/components/global-loader"
import { toast } from 'sonner'
import { Pencil } from "lucide-react"
import Image from "next/image"

const Form = () => {
    const { data: user, isLoading: isAuthLoading } = useCurrentUser();
    const { mutateAsync: updateUser, isPending } = useUpdateUser();
    const [preview, setPreview] = useState<string | null>(null);

    const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm({
        defaultValues: {
            name: user?.name || '',
            occupation: user?.occupation || '',
            location: user?.location || '',
            bio: user?.bio || '',
            profileImage: ''
        }
    });

    const imageFile: any = watch("profileImage");

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                occupation: user.occupation,
                location: user.location,
                bio: user.bio,
                profileImage: ''
            });
            if (user.profileImage) setPreview(user.profileImage);
        }
    }, [user, reset]);

    useEffect(() => {
        if (imageFile && imageFile[0] && imageFile[0] instanceof File) {
            const objectUrl = URL.createObjectURL(imageFile[0]);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageFile]);

    const submitHandler = async (data: any) => {
        const isImageChanged = data.profileImage && data.profileImage.length > 0;
        if (!isDirty && !isImageChanged) {
            toast.error("No changes detected.");
            return;
        }

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== 'profileImage' && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        if (isImageChanged) {
            formData.append("profileImage", data.profileImage[0]);
        }

        if (user?._id) {
            formData.append("_id", user._id);
        }

        try {
            await updateUser(formData);
            toast.success("Profile updated successfully!");
            reset(data);
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error("Failed to update profile.");
        }
    };

    if (isAuthLoading) return <GlobalLoader />;

    return (
        <div className="mx-auto p-8 bg-card text-card-foreground rounded-xl border border-border shadow-sm z-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Update Profile</h2>
                <p className="text-sm text-muted-foreground">Customize your identity on Inquire.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
                {/* Image Preview Section */}
                <div className="flex flex-col items-center gap-4 mb-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-xs text-muted-foreground text-center p-2">
                                No Image
                            </div>
                        )}
                    </div>
                    <Label htmlFor="profileImage" className="text-sm font-semibold cursor-pointer text-primary ">
                        Update Photo
                        <Pencil size={16} />
                    </Label>
                    <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register('profileImage')}
                    />
                </div>

                <div className="space-y-2 text-left">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input id="name" {...register('name')} />
                </div>

                <div className="space-y-2 text-left">
                    <Label htmlFor="occupation" className="text-sm font-semibold">Occupation</Label>
                    <Input id="occupation" {...register('occupation')} />
                </div>

                <div className="space-y-2 text-left">
                    <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                    <Input id="location" {...register('location')} />
                </div>

                <div className="space-y-2 text-left">
                    <Label htmlFor="bio" className="text-sm font-semibold">Bio</Label>
                    <Textarea id="bio" className="min-h-20 resize-y" {...register('bio')} />
                </div>

                <Button
                    type="submit"
                    disabled={isPending || (!isDirty && !(imageFile && imageFile.length > 0))}
                    className="w-full mt-4"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
};

export default Form;