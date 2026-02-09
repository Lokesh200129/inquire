import { create } from 'zustand'

interface StoreProp {
    post: TPost | unknown;
    setPost: (post: TPost) => void
}

export const usePostStore = create<StoreProp>((set) => ({
    post: null as TPost | null,
    setPost: (post) => set({ post })

}))