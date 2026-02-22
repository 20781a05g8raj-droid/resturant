import { supabase } from '../supabase';
import { DbReview } from '../database.types';

export async function getReviews(): Promise<DbReview[]> {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function getVisibleReviews(): Promise<DbReview[]> {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function toggleReviewVisibility(id: number, is_visible: boolean): Promise<DbReview> {
    const { data, error } = await supabase
        .from('reviews')
        .update({ is_visible })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteReview(id: number): Promise<void> {
    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
    if (error) throw error;
}
