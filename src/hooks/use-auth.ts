import api from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import { useUiStore } from "@/store/useUiStore";
export const useAuth = () => {
    const { clearUser, setUser } = useUserStore((state) => state);
    const { setLoading } = useUiStore((state) => state)

    const signup = async (data: TUser) => {
        setLoading(true);
        const promise = api.post("/signup", data);
        toast.promise(promise, {
            loading: 'Creating your account...',
            success: (response) => {
                setUser(response.data);
                return "Account created successfully!";
            },
            error: (err) => {
                const msg = err.response?.data?.message || "Signup failed";
                return msg;
            }
        });

        try {
            const response = await promise;
            console.log(response)
            return response.data.data;
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: TUser) => {
        setLoading(true);
        const promise = api.post("/login", data);
        toast.promise(promise, {
            loading: 'Logging in...',
            success: (response) => {
                const userData = response.data.data;
                setUser(userData);
                return `Welcome back, ${userData.name || 'User'}!`;
            },
            error: (err) => {
                const msg = err.response?.data?.message || "Login failed";
                return msg;
            }
        });

        try {
            const response = await promise;
            return response.data.data;
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            const response = await api.get("/current-user");
            setUser(response.data);
            return response.data;
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        const promise = api.post("/logout");
        toast.promise(promise, {
            loading: 'Logging out...',
            success: () => {
                clearUser();
                return "Logged out successfully";
            },
            error: "Logout failed"
        });

        try {
            await promise;
            return null;
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (formData: FormData) => {
        setLoading(true);
        const promise = api.patch('/update-user', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.promise(promise, {
            loading: 'Updating profile...',
            success: (response) => {
                const userData = response.data.data;
                setUser(userData);
                return "Profile updated!";
            },
            error: (err) => {
                const msg = err.response?.data?.message || "Update failed";
                return msg;
            }
        });

        try {
            const updatedData = await promise;
            return updatedData?.data.data;
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { signup, login, fetchCurrentUser, updateUser, logout };
};      