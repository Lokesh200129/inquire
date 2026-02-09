import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPostForm, postSchema } from '@/lib/zod';
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { usePost } from '../hooks/use-post'
import { useQueryClient } from "@tanstack/react-query";

export const usePostForm = () => {
    const { setPostModal } = useModalStore();
    const user = useUserStore((state) => state.user);
    const { createPost } = usePost();
    const queryClient = useQueryClient();

    const form = useForm<TPostForm>({
        resolver: zodResolver(postSchema),
        defaultValues: { title: "", content: "", tags: "" },
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
        if (data.tags) formData.append("tags", data.tags);
        if (data.questionImage?.[0]) formData.append("questionImage", data.questionImage[0]);

        try {
            const res = await createPost(formData)
            if (res) {
                queryClient.invalidateQueries({ queryKey: ['questions'] });
                handleCancel();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { form, onSubmit, handleCancel, user };
};