import api from '@/lib/axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import parseError from '@/lib/parse-error';
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await api<TPost>({
                url: '/create-question',
                method: 'POST',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        },
        onMutate: () => {
            return { toastId: toast.loading('Creating Post...') };
        },
        onSuccess: (data, variables, context) => {
            toast.success("Post Created!", { id: context?.toastId });
            queryClient.invalidateQueries({ queryKey: ['questions', 'feed'] });
            queryClient.invalidateQueries({ queryKey: ['questions', 'profile'] });
        },

        onError: (err) => toast.error(parseError(err)),
    });
};