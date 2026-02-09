import { create } from 'zustand';

interface UserState {
    user: TUser | null;
    isAuthenticated: boolean;
    setUser: (user: TUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
}));