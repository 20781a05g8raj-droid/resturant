import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react';
import { getReviews, toggleReviewVisibility, deleteReview } from '../lib/api/reviewsApi';
import type { DbReview } from '../lib/database.types';

export const ReviewsManager: React.FC = () => {
    const [reviews, setReviews] = useState<DbReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => { loadReviews(); }, []);

    const loadReviews = async () => {
        try {
            const data = await getReviews();
            setReviews(data);
        } catch (err) {
            console.error('Failed to load reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id: number, current: boolean) => {
        try {
            const updated = await toggleReviewVisibility(id, !current);
            setReviews(reviews.map(r => r.id === id ? updated : r));
        } catch (err) {
            console.error('Toggle error:', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteReview(id);
            setReviews(reviews.filter(r => r.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-display text-white tracking-wider">Reviews</h1>
                <p className="text-stone-500 text-sm mt-1">{reviews.length} total reviews • {reviews.filter(r => r.is_visible).length} visible on site</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(review => (
                    <motion.div
                        key={review.id}
                        layout
                        className={`bg-stone-900 border rounded-xl p-5 transition-all ${review.is_visible ? 'border-stone-800' : 'border-stone-800 opacity-60'
                            }`}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            {review.image && (
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-stone-700" />
                            )}
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm">{review.name}</p>
                                <p className="text-stone-500 text-xs">Review for: <span className="text-gold-500">{review.dish}</span></p>
                            </div>
                            <div className="flex items-center gap-0.5 text-gold-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-stone-700'} />
                                ))}
                            </div>
                        </div>

                        <p className="text-stone-300 text-sm italic mb-4">"{review.text}"</p>

                        <div className="flex items-center justify-between border-t border-stone-800 pt-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${review.is_visible ? 'bg-green-500/20 text-green-400' : 'bg-stone-700/50 text-stone-500'}`}>
                                {review.is_visible ? 'Visible' : 'Hidden'}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggle(review.id, review.is_visible)}
                                    className={`p-1.5 rounded transition-all ${review.is_visible ? 'text-stone-400 hover:text-amber-400 hover:bg-amber-500/10' : 'text-stone-500 hover:text-green-400 hover:bg-green-500/10'}`}
                                    title={review.is_visible ? 'Hide' : 'Show'}
                                >
                                    {review.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                                {deleteConfirm === review.id ? (
                                    <div className="flex gap-1">
                                        <button onClick={() => handleDelete(review.id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Yes</button>
                                        <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-stone-700 text-white text-xs rounded">No</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeleteConfirm(review.id)}
                                        className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {reviews.length === 0 && (
                <p className="text-stone-600 text-center py-8">No reviews yet</p>
            )}
        </div>
    );
};
