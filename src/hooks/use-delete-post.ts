// import api from '@/lib/axios';
// import { toast } from 'sonner';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import parseError from '@/lib/parse-error';
// export const useDeletePost = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (postId: string ) => {
//             return await api({
//                 url: `/delete/${postId}`,
//                 method: 'DELETE'
//             });
//         },
//         onMutate: () => {
//             return { toastId: toast.loading('Deleting post...') };
//         },
//         onSuccess: (_data, _variables, context) => {
//             toast.success('Post Deleted Successfully!', { id: context?.toastId });
//             queryClient.invalidateQueries({ queryKey: ['questions'] });
//         },

//         onError: (err) => toast.error(parseError(err)),

//     });
// };

import api from '@/lib/axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import parseError from '@/lib/parse-error';

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: string) => {
            return await api({
                url: `/delete/${postId}`,
                method: 'DELETE',
            });
        },
        onMutate: () => {
            return { toastId: toast.loading('Deleting post...') };
        },
        onSuccess: (_data, _variables, context) => {
            toast.success('Post Deleted Successfully!', { id: context?.toastId });
            queryClient.invalidateQueries({ queryKey: ['questions'] });
        },
        onError: (err) => toast.error(parseError(err))
    });
};