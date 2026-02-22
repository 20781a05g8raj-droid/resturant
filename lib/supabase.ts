import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create a real client if valid credentials are provided
const isConfigured = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 20;

let supabase: SupabaseClient;

if (isConfigured) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    // Create a dummy proxy so the app doesn't crash without Supabase configured
    console.warn('[Supabase] Not configured — using placeholder. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
    const handler: ProxyHandler<any> = {
        get: (_target, prop) => {
            if (prop === 'auth') {
                return new Proxy({}, {
                    get: () => (..._args: any[]) => Promise.resolve({ data: { session: null, subscription: { unsubscribe: () => { } } }, error: { message: 'Supabase not configured' } }),
                });
            }
            // from().select/insert/update/delete chain
            return () => new Proxy({}, {
                get: () => (..._args: any[]) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
            });
        },
    };
    supabase = new Proxy({} as SupabaseClient, handler);
}

export { supabase, isConfigured };
