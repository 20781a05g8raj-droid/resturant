import { supabase } from '../supabase';
import { DbContact } from '../database.types';

export async function getContacts(): Promise<DbContact[]> {
    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function createContact(contact: Omit<DbContact, 'id' | 'created_at' | 'is_read'>): Promise<DbContact> {
    const { data, error } = await supabase
        .from('contacts')
        .insert({ ...contact, is_read: false })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function markContactAsRead(id: number, is_read: boolean): Promise<DbContact> {
    const { data, error } = await supabase
        .from('contacts')
        .update({ is_read })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}
