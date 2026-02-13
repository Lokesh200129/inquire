import api from "@/lib/axios";
// import { useUserStore } from "@/store/useUserStore";
// import { useUiStore } from "@/store/useUiStore";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import parseError from "@/lib/parse-error";
export const useSignup = () => {

    const queryClient = useQueryClient();
    // const { setUser } = useUserStore();
    // const { setLoading } = useUiStore();
    const router = useRouter();

    const signupMutation = useMutation({
        mutationFn: async (data: TUser) => {
            // setLoading(true);
            return await api<TUser>({
                url: "/signup",
                method: "POST",
                data,
            });
        },
        onSuccess: (data) => {
            // setUser(data);
            toast.success("Account created successfully!");
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
            router.replace('/feed')
        },
        onError: (err) => toast.error(parseError(err)),
    });

    return signupMutation;
};