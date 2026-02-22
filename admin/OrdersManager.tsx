import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronDown, Eye, Package, Bike, Utensils, X } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../lib/api/ordersApi';
import type { DbOrder } from '../lib/database.types';

const statusFlow: DbOrder['status'][] = ['new', 'preparing', 'ready', 'delivered'];

const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    preparing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    ready: 'bg-green-500/20 text-green-400 border-green-500/30',
    delivered: 'bg-stone-500/20 text-stone-400 border-stone-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const orderTypeIcon: Record<string, React.ReactNode> = {
    'Dine In': <Utensils size={14} />,
    'Take Away': <Package size={14} />,
    'Delivery': <Bike size={14} />,
};

export const OrdersManager: React.FC = () => {
    const [orders, setOrders] = useState<DbOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => { loadOrders(); }, []);

    const loadOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error('Failed to load orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: number, newStatus: DbOrder['status']) => {
        try {
            const updated = await updateOrderStatus(id, newStatus);
            setOrders(orders.map(o => o.id === id ? updated : o));
        } catch (err) {
            console.error('Status update error:', err);
        }
    };

    const getNextStatus = (current: DbOrder['status']): DbOrder['status'] | null => {
        const idx = statusFlow.indexOf(current);
        return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
    };

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

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
                <h1 className="text-2xl font-display text-white tracking-wider">Orders</h1>
                <p className="text-stone-500 text-sm mt-1">{orders.length} total orders</p>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {['all', ...statusFlow, 'cancelled'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all border ${filter === s
                                ? 'bg-gold-500/20 text-gold-500 border-gold-500/30'
                                : 'bg-stone-900 text-stone-500 border-stone-700 hover:border-stone-600'
                            }`}
                    >
                        {s} {s !== 'all' && `(${orders.filter(o => o.status === s).length})`}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-3">
                {filtered.length === 0 && (
                    <p className="text-stone-600 text-center py-8">No orders found</p>
                )}
                {filtered.map(order => (
                    <motion.div
                        key={order.id}
                        layout
                        className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-stone-800/50 transition-colors"
                            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-gold-500">
                                    {orderTypeIcon[order.order_type] || <Package size={14} />}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{order.customer_name}</p>
                                    <p className="text-stone-500 text-xs">{order.order_type} • {new Date(order.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-bold text-sm">€{Number(order.total).toFixed(2)}</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                                <ChevronDown size={16} className={`text-stone-500 transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {expandedId === order.id && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                className="border-t border-stone-800 px-5 py-4"
                            >
                                {/* Order Items */}
                                <div className="space-y-2 mb-4">
                                    {(order.items as any[])?.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between bg-stone-800/50 rounded-lg px-3 py-2">
                                            <div className="flex items-center gap-3">
                                                {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />}
                                                <span className="text-white text-sm">{item.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-stone-400 text-xs">x{item.quantity}</span>
                                                <span className="text-white text-sm ml-3">€{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="text-sm border-t border-stone-800 pt-3 mb-4 space-y-1">
                                    <div className="flex justify-between text-stone-400"><span>Subtotal</span><span>€{Number(order.subtotal).toFixed(2)}</span></div>
                                    <div className="flex justify-between text-stone-400"><span>Tax</span><span>€{Number(order.tax).toFixed(2)}</span></div>
                                    <div className="flex justify-between text-white font-bold"><span>Total</span><span>€{Number(order.total).toFixed(2)}</span></div>
                                </div>

                                {/* Customer Info */}
                                <div className="text-xs text-stone-500 space-y-1 mb-4">
                                    {order.customer_phone && <p>📞 {order.customer_phone}</p>}
                                    {order.customer_address && <p>📍 {order.customer_address}</p>}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {getNextStatus(order.status) && (
                                        <button
                                            onClick={() => handleStatusChange(order.id, getNextStatus(order.status)!)}
                                            className="flex-1 py-2 bg-gold-500 text-stone-900 rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors"
                                        >
                                            Mark as {getNextStatus(order.status)}
                                        </button>
                                    )}
                                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                        <button
                                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                                            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
