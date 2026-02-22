import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Check, X, Clock, Users, Filter } from 'lucide-react';
import { getReservations, updateReservationStatus } from '../lib/api/reservationsApi';
import type { DbReservation } from '../lib/database.types';

const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const ReservationsManager: React.FC = () => {
    const [reservations, setReservations] = useState<DbReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (err) {
            console.error('Failed to load reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (id: number, status: DbReservation['status']) => {
        try {
            const updated = await updateReservationStatus(id, status);
            setReservations(reservations.map(r => r.id === id ? updated : r));
        } catch (err) {
            console.error('Status update error:', err);
        }
    };

    const filtered = filter === 'all' ? reservations : reservations.filter(r => r.status === filter);

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
                <h1 className="text-2xl font-display text-white tracking-wider">Reservations</h1>
                <p className="text-stone-500 text-sm mt-1">{reservations.length} total reservations</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all border ${filter === s
                                ? 'bg-gold-500/20 text-gold-500 border-gold-500/30'
                                : 'bg-stone-900 text-stone-500 border-stone-700 hover:border-stone-600'
                            }`}
                    >
                        {s} {s !== 'all' && `(${reservations.filter(r => r.status === s).length})`}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-stone-800 text-stone-500 text-xs uppercase tracking-wider">
                                <th className="py-3 px-4 text-left">Guest</th>
                                <th className="py-3 px-4 text-left hidden md:table-cell">Contact</th>
                                <th className="py-3 px-4 text-center">Date & Time</th>
                                <th className="py-3 px-4 text-center">Guests</th>
                                <th className="py-3 px-4 text-center hidden md:table-cell">Occasion</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(res => (
                                <tr key={res.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                                    <td className="py-3 px-4">
                                        <p className="text-white text-sm font-medium">{res.name}</p>
                                    </td>
                                    <td className="py-3 px-4 hidden md:table-cell">
                                        <p className="text-stone-400 text-xs">{res.email}</p>
                                        <p className="text-stone-500 text-xs">{res.phone}</p>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <p className="text-gold-500 text-sm font-bold">{res.date}</p>
                                        <p className="text-stone-500 text-xs flex items-center justify-center gap-1"><Clock size={10} /> {res.time}</p>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="text-white text-sm flex items-center justify-center gap-1"><Users size={12} className="text-stone-500" /> {res.guests}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center hidden md:table-cell">
                                        <span className="text-stone-400 text-xs">{res.occasion}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[res.status]}`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {res.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatus(res.id, 'confirmed')}
                                                        className="p-1.5 text-green-400 hover:bg-green-500/10 rounded transition-all"
                                                        title="Confirm"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(res.id, 'cancelled')}
                                                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-all"
                                                        title="Cancel"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </>
                                            )}
                                            {res.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleStatus(res.id, 'cancelled')}
                                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-all"
                                                    title="Cancel"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                            {res.status === 'cancelled' && (
                                                <button
                                                    onClick={() => handleStatus(res.id, 'pending')}
                                                    className="px-2 py-1 text-stone-400 hover:text-white text-xs bg-stone-800 rounded transition-all"
                                                >
                                                    Restore
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <p className="text-stone-600 text-sm text-center py-8">No reservations found</p>
                )}
            </div>
        </div>
    );
};
