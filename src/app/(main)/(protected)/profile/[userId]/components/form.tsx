import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { useAuth } from "@/hooks/use-auth"
import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react"
const Form = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: { name: '', occupation: '', location: '', bio: '', profileImage: '' }
    });
    const { updateUser } = useAuth();
    const { setUser, user } = useUserStore((state) => state)

    useEffect(() => {
        if (user) {
            reset(user)
        }
    }, [user])

    const submitHandler = async (data: TUser) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key !== 'profileImage' && data[key as keyof TUser] !== undefined) {
                formData.append(key, data[key as keyof TUser] as string);
            }
        });

        if (data.profileImage && data.profileImage[0]) {
            formData.append("profileImage", data.profileImage[0]);
        }

        if (user?._id) {
            formData.append("_id", user._id);
        }

        const res = await updateUser(formData);
        if (res) {
            setUser(res);
            reset(res);
        }
    };
    return (
        <div className=" mx-auto  p-8 bg-card text-card-foreground rounded-xl border border-border shadow-sm z-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Update Profile</h2>
                <p className="text-sm text-muted-foreground">
                    Customize your identity on Inquire.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
                <div className="space-y-2">
                    <Label htmlFor="profileImage" className="text-sm font-semibold">Profile Picture</Label>
                    <Input
                        id="profileprofileImage"
                        type="file"
                        className="cursor-pointer file:text-primary file:font-medium"
                        {...register('profileImage')}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="E.g. John Doe"
                        {...register('name')}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-sm font-semibold">Occupation</Label>
                    <Input id="occupation" placeholder="E.g. Full Stack Developer"
                        {...register('occupation')}

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                    <Input id="location" placeholder="E.g. New York, USA"
                        {...register('location')}

                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-semibold">Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="Tell the community a bit about yourself..."
                        className="min-h-25 resize-y"
                        {...register('bio')}

                    />
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Saving...
                        </span>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </form>
        </div>
    )
}

export default Form;