import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';
import { toast } from "sonner";

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TUser) => {
            return await api<TUser>({
                url: "/login",
                method: "POST",
                data,
            });
        },
        onSuccess: (loggendInUser) => {
            toast.success(`Welcome back!`);
            router.replace('/feed')
            console.log(loggendInUser)
            queryClient.setQueryData<TUser>(["current-user"], (prevUser) => {
                if (!prevUser) return prevUser;
                return {
                    ...prevUser,
                    ...loggendInUser
                }
            })
        },
        onError: (err) => toast.error(parseError(err)),
    });
};