import { supabase } from '../supabase';
import { DbReservation } from '../database.types';

export async function getReservations(): Promise<DbReservation[]> {
    const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function createReservation(reservation: Omit<DbReservation, 'id' | 'created_at' | 'status'>): Promise<DbReservation> {
    const { data, error } = await supabase
        .from('reservations')
        .insert({ ...reservation, status: 'pending' })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateReservationStatus(id: number, status: DbReservation['status']): Promise<DbReservation> {
    const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}
