import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import parseError from '@/lib/parse-error';
import { toast } from "sonner";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const res = await api<TUser>({
                url: '/update-user',
                method: 'PATCH',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res
        },
        onSuccess: (updatedData) => {
            toast.success("Profile updated!");
            queryClient.setQueryData(['auth', 'user'], updatedData);
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
        onError: (err) => toast.error(parseError(err)),

    });
};