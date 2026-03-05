import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    showAuthPopup: boolean;
    authMode: "login" | "signup";
    openLogin: () => void;
    openSignup: () => void;
    closeAuthPopup: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ---------------------------------------------------------------------------
// Mock "database" stored in localStorage so the session survives page refresh
// ---------------------------------------------------------------------------
const STORAGE_KEY = "mock_users";
const SESSION_KEY = "mock_session";

interface MockUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

function loadUsers(): MockUser[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
        return [];
    }
}

function saveUsers(users: MockUser[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadSession(): User | null {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveSession(user: User | null) {
    if (user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
        sessionStorage.removeItem(SESSION_KEY);
    }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(loadSession);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");

    const login = useCallback(async (email: string, password: string) => {
        // Simulate async network call
        await delay(400);

        const users = loadUsers();
        const found = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
            throw new Error("Имэйл эсвэл нууцүг буруу байна.");
        }

        const sessionUser: User = { id: found.id, username: found.username, email: found.email };
        setUser(sessionUser);
        saveSession(sessionUser);
        setShowAuthPopup(false);
    }, []);

    const signup = useCallback(async (username: string, email: string, password: string) => {
        await delay(400);

        const users = loadUsers();
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error("Энэ имэйл аль хэдийн бүртгэлтэй байна.");
        }

        const newUser: MockUser = {
            id: crypto.randomUUID(),
            username,
            email,
            password,
        };
        saveUsers([...users, newUser]);

        const sessionUser: User = { id: newUser.id, username: newUser.username, email: newUser.email };
        setUser(sessionUser);
        saveSession(sessionUser);
        setShowAuthPopup(false);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        saveSession(null);
    }, []);

    const openLogin = useCallback(() => {
        setAuthMode("login");
        setShowAuthPopup(true);
    }, []);

    const openSignup = useCallback(() => {
        setAuthMode("signup");
        setShowAuthPopup(true);
    }, []);

    const closeAuthPopup = useCallback(() => setShowAuthPopup(false), []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                signup,
                logout,
                showAuthPopup,
                authMode,
                openLogin,
                openSignup,
                closeAuthPopup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function delay(ms: number) {
    return new Promise<void>((res) => setTimeout(res, ms));
}
