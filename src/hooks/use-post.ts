import api from '@/lib/axios'
import { toast } from 'sonner';
import { useUiStore } from '@/store/useUiStore';
import { usePostStore } from '@/store/usePostStore';
import { QueryClient } from '@tanstack/react-query';

export const usePost = () => {
    const queryClient = new QueryClient();
    const { setLoading } = useUiStore()
    const { setPost } = usePostStore()

    const createPost = async (formData: FormData) => {
        setLoading(true);
        const promise = api.post('/create-question', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.promise(promise, {
            loading: 'Creating Post...',
            success: (response) => {
                const post = response.data.data;
                setPost(post);
                return "Post Created!";
            },
            error: (err) => {
                const msg = err.response?.data?.message || "Post creation failed";
                return msg;
            }
        });

        try {
            const updatedData = await promise;
            return updatedData?.data.data;
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId: string) => {
        try {
            setLoading(true)
            const res = await api.delete(`/delete/${postId}`);

            if (res.status === 200) {
                queryClient.invalidateQueries({ queryKey: ['questions', 'feed'] });
                queryClient.invalidateQueries({ queryKey: ['questions', 'profile'] });
                toast.success('Post Deleted Successfully!')
            }
            return
        } catch {
            toast.error('Something went unexpected!')
        }
        finally {
            setLoading(false)
        }
    };

    return { createPost, handleDelete }
}