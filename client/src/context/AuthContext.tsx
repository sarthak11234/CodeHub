import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    username: string;
    rank: number;
    score: number;
    badges?: string[];
    solvedProblems?: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'codehub_token';
const USER_KEY = 'codehub_user';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    };

    const refreshUser = useCallback(async () => {
        const currentToken = token || localStorage.getItem(TOKEN_KEY);
        if (!currentToken) return;

        try {
            const response = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${currentToken}` },
            });
            if (response.ok) {
                const data = await response.json();
                const updatedUser = data.user;
                localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (err) {
            console.error('Failed to refresh user:', err);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
