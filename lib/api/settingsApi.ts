import { supabase } from '../supabase';
import { DbSiteSetting } from '../database.types';

export async function getSetting(key: string): Promise<any | null> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();
    if (error) return null;
    return data?.value ?? null;
}

export async function getAllSettings(): Promise<DbSiteSetting[]> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*');
    if (error) throw error;
    return data || [];
}

export async function updateSetting(key: string, value: any): Promise<DbSiteSetting> {
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select()
        .single();
    if (error) throw error;
    return data;
}
