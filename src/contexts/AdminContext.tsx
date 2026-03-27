import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import pb from "../services/pocketbase";

interface AdminUser {
    id: string;
    email: string;
    name?: string;
}

interface AdminContextValue {
    isEditMode: boolean;
    user: AdminUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isEditMode, setIsEditMode] = useState(() => pb.authStore.isValid);
    const [user, setUser] = useState<AdminUser | null>(
        pb.authStore.isValid ? (pb.authStore.record as unknown as AdminUser) : null,
    );

    useEffect(() => {
        const unsubscribe = pb.authStore.onChange((token, record) => {
            const valid = !!token && !!record;
            setIsEditMode(valid);
            setUser(valid ? (record as unknown as AdminUser) : null);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const auth = await pb
            .collection("users")
            .authWithPassword(email, password);
        setIsEditMode(true);
        setUser(auth.record as unknown as AdminUser);
    };

    const logout = () => {
        pb.authStore.clear();
        setIsEditMode(false);
        setUser(null);
    };

    return (
        <AdminContext.Provider value={{ isEditMode, user, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
    return ctx;
};
