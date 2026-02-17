import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPostForm, postSchema } from '@/lib/zod';
import { useModalStore } from "@/store/useModalStore";
import { useCreatePost } from '../hooks/use-create-post';
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import parseError from "./parse-error";

export const usePostForm = () => {
    const { setPostModal } = useModalStore();
    const { data: user } = useCurrentUser();

    const { mutateAsync: createPost, isPending } = useCreatePost();

    const form = useForm<TPostForm>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: ""
        },
    });

    const handleCancel = () => {
        form.reset();
        setPostModal(false);
    };

    const onSubmit = async (data: TPostForm) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append('_id', user?._id || "");

        if (data.tags) {
            formData.append("tags", data.tags);
        }

        if (data.questionImage && data.questionImage.length > 0) {
            data.questionImage.forEach((file: File) => {
                formData.append("questionImage", file);
            });
        }

        try {
            await createPost(formData);
            handleCancel();
        } catch (error) {
            return parseError(error)
        }
    };
    return {
        form,
        onSubmit,
        handleCancel,
        user,
        isSubmitting: isPending
    };
};