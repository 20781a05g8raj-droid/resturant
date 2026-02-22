import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isConfigured } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ error: string | null }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isConfigured) {
            setIsLoading(false);
            return;
        }

        supabase.auth.getSession().then(({ data }) => {
            setSession(data?.session ?? null);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        }) as any;

        const subscription = data?.subscription;
        return () => subscription?.unsubscribe?.();
    }, []);

    const login = async (email: string, password: string) => {
        if (!isConfigured) {
            // Demo mode fallback
            if (email === 'admin@nosso.com' && password === 'admin') {
                setSession({
                    access_token: 'demo-token',
                    refresh_token: 'demo',
                    expires_in: 3600,
                    expires_at: Math.floor(Date.now() / 1000) + 3600,
                    token_type: 'bearer',
                    user: { id: 'demo-user', email: 'admin@nosso.com', app_metadata: {}, user_metadata: {}, aud: 'authenticated', created_at: '' }
                } as Session);
                return { error: null };
            }
            return { error: 'Supabase not configured. Use admin@nosso.com / admin for demo mode.' };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error ? error.message : null };
    };

    const logout = async () => {
        if (isConfigured) {
            await supabase.auth.signOut();
        }
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{
            user: session?.user ?? null,
            session,
            isAuthenticated: !!session,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
