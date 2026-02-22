import { supabase } from '../supabase';
import { DbOrder } from '../database.types';

export async function getOrders(): Promise<DbOrder[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function createOrder(order: Omit<DbOrder, 'id' | 'created_at'>): Promise<DbOrder> {
    const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateOrderStatus(id: number, status: DbOrder['status']): Promise<DbOrder> {
    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}
