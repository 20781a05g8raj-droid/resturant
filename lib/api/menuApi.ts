import { supabase } from '../supabase';
import { DbMenuItem } from '../database.types';

export async function getMenuItems(): Promise<DbMenuItem[]> {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
}

export async function getActiveMenuItems(): Promise<DbMenuItem[]> {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
}

export async function getMenuItemById(id: number): Promise<DbMenuItem | null> {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}

export async function createMenuItem(item: Omit<DbMenuItem, 'id' | 'created_at'>): Promise<DbMenuItem> {
    const { data, error } = await supabase
        .from('menu_items')
        .insert(item)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateMenuItem(id: number, updates: Partial<DbMenuItem>): Promise<DbMenuItem> {
    const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteMenuItem(id: number): Promise<void> {
    const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
    if (error) throw error;
}
