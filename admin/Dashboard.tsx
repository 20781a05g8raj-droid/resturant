import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, CalendarDays, Mail, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { getOrders } from '../lib/api/ordersApi';
import { getReservations } from '../lib/api/reservationsApi';
import { getContacts } from '../lib/api/contactsApi';
import type { DbOrder, DbReservation, DbContact } from '../lib/database.types';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<DbOrder[]>([]);
    const [reservations, setReservations] = useState<DbReservation[]>([]);
    const [contacts, setContacts] = useState<DbContact[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [o, r, c] = await Promise.all([getOrders(), getReservations(), getContacts()]);
            setOrders(o);
            setReservations(r);
            setContacts(c);
        } catch (err) {
            console.error('Dashboard load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const todayStr = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.created_at?.startsWith(todayStr));
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
    const pendingReservations = reservations.filter(r => r.status === 'pending');
    const unreadMessages = contacts.filter(c => !c.is_read);

    const stats = [
        { label: 'Total Revenue', value: `€${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
        { label: 'Orders Today', value: todayOrders.length.toString(), icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { label: 'Pending Reservations', value: pendingReservations.length.toString(), icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        { label: 'Unread Messages', value: unreadMessages.length.toString(), icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const statusColor: Record<string, string> = {
        new: 'bg-blue-500/20 text-blue-400',
        preparing: 'bg-amber-500/20 text-amber-400',
        ready: 'bg-green-500/20 text-green-400',
        delivered: 'bg-stone-500/20 text-stone-400',
        cancelled: 'bg-red-500/20 text-red-400',
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-display text-white tracking-wider">Dashboard</h1>
                <p className="text-stone-500 text-sm mt-1">Welcome back — here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${stat.bg} border ${stat.border} rounded-xl p-5`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className={stat.color} size={22} />
                            <TrendingUp className="text-stone-600" size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-stone-500 text-xs mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders & Reservations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-white font-display text-sm tracking-wider flex items-center gap-2">
                            <Clock size={16} className="text-gold-500" />
                            RECENT ORDERS
                        </h2>
                        <button onClick={() => navigate('/admin/orders')} className="text-gold-500 text-xs hover:text-gold-400 flex items-center gap-1">
                            View All <ArrowRight size={12} />
                        </button>
                    </div>
                    {orders.slice(0, 5).length === 0 ? (
                        <p className="text-stone-600 text-sm py-4 text-center">No orders yet</p>
                    ) : (
                        <div className="space-y-3">
                            {orders.slice(0, 5).map(order => (
                                <div key={order.id} className="flex items-center justify-between bg-stone-800/50 rounded-lg px-4 py-3">
                                    <div>
                                        <p className="text-white text-sm font-medium">{order.customer_name}</p>
                                        <p className="text-stone-500 text-xs">{order.order_type} • {(order.items as any[])?.length || 0} items</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-sm font-bold">€{Number(order.total).toFixed(2)}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status] || ''}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pending Reservations */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-white font-display text-sm tracking-wider flex items-center gap-2">
                            <CalendarDays size={16} className="text-gold-500" />
                            PENDING RESERVATIONS
                        </h2>
                        <button onClick={() => navigate('/admin/reservations')} className="text-gold-500 text-xs hover:text-gold-400 flex items-center gap-1">
                            View All <ArrowRight size={12} />
                        </button>
                    </div>
                    {pendingReservations.length === 0 ? (
                        <p className="text-stone-600 text-sm py-4 text-center">No pending reservations</p>
                    ) : (
                        <div className="space-y-3">
                            {pendingReservations.slice(0, 5).map(res => (
                                <div key={res.id} className="flex items-center justify-between bg-stone-800/50 rounded-lg px-4 py-3">
                                    <div>
                                        <p className="text-white text-sm font-medium">{res.name}</p>
                                        <p className="text-stone-500 text-xs">{res.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gold-500 text-sm font-bold">{res.date}</p>
                                        <p className="text-stone-500 text-xs">{res.time} • {res.guests} guests</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
