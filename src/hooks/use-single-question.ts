import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios'
export const useSingleQuestion = (id: string) => {
    return useQuery({
        queryKey: ['questions', id],
        queryFn: async () => {
            const res = await api({
                url: `/fetch-single-question/${id}`,
                method: "GET"
            });
            return res;
        },
        enabled: !!id,
    });
};