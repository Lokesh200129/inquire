import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: async () => {
            const response = await api<TUser>({
                url: "/current-user",
                method: "GET",
            });
            return response;
        },
        retry: false

    });
};