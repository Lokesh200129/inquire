"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import parseError from '@/lib/parse-error';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            return await api({
                url: "/logout",
                method: "POST"
            });
        },
        onSuccess: () => {
            queryClient.clear();
            toast.success("Logged out successfully");
            router.replace('/');
        },
        onError: (err) => {
            toast.error(parseError(err));
        },
    });
};