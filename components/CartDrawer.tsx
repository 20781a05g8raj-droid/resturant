import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, Minus, Plus, ChefHat, CheckCircle2, Phone, MapPin, Package, Bike, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { createOrder } from '../lib/api/ordersApi';

export const CartDrawer: React.FC = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        tax,
        total,
        customerInfo,
        setCustomerInfo
    } = useCart();

    const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

    const handlePlaceOrder = async () => {
        // Validation
        const errors: { [key: string]: boolean } = {};
        if (!customerInfo.name) errors.name = true;

        if (customerInfo.type === 'Dine In' && !customerInfo.table) errors.table = true;
        if (customerInfo.type === 'Delivery') {
            if (!customerInfo.address) errors.address = true;
            if (!customerInfo.phone) errors.phone = true;
        }
        if (customerInfo.type === 'Takeaway' && !customerInfo.phone) errors.phone = true;

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});

        setOrderStatus('processing');

        try {
            const orderType = customerInfo.type === 'Takeaway' ? 'Take Away' : customerInfo.type as any;
            await createOrder({
                customer_name: customerInfo.name,
                customer_phone: customerInfo.phone || '',
                customer_address: customerInfo.address || null,
                order_type: orderType,
                items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
                subtotal,
                tax,
                total,
                status: 'new',
            });
        } catch (err) {
            console.error('Order creation error:', err);
        }

        setOrderStatus('success');
        setTimeout(() => {
            clearCart();
            setOrderStatus('idle');
            setCustomerInfo({ ...customerInfo, name: '', phone: '', address: '', table: '' });
            toggleCart();
        }, 3000);
    };

    const getOrderTypeIcon = () => {
        switch (customerInfo.type) {
            case 'Delivery': return <Bike size={18} />;
            case 'Takeaway': return <Package size={18} />;
            default: return <Utensils size={18} />;
        }
    }

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-white">
                            <h2 className="font-display font-bold text-xl text-stone-900 flex items-center gap-2">
                                <ShoppingBag className="text-gold-500" size={20} /> Your Cart
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Customer Details Form */}
                        <div className="p-5 border-b border-stone-100 space-y-4 bg-stone-50/50 overflow-y-auto max-h-[40vh] custom-scrollbar">
                            {/* Order Type */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Order Type</label>
                                <div className="grid grid-cols-3 gap-2 bg-stone-200 p-1 rounded-lg">
                                    {['Dine In', 'Takeaway', 'Delivery'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setCustomerInfo({ ...customerInfo, type: type as any })}
                                            className={`text-[10px] sm:text-xs font-bold py-2 rounded-md transition-all ${customerInfo.type === type
                                                ? 'bg-white text-stone-900 shadow-sm'
                                                : 'text-stone-500 hover:text-stone-700'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamic Inputs */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Customer Name"
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                        className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none transition-colors ${formErrors.name ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                                    />
                                </div>

                                {customerInfo.type === 'Dine In' && (
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Table <span className="text-red-500">*</span></label>
                                        <select
                                            value={customerInfo.table}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, table: e.target.value })}
                                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none cursor-pointer ${formErrors.table ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                                        >
                                            <option value="">Select Table</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>Table {n}</option>)}
                                        </select>
                                    </div>
                                )}

                                {(customerInfo.type === 'Takeaway' || customerInfo.type === 'Delivery') && (
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                                            <Phone size={12} /> Phone <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+351..."
                                            value={customerInfo.phone || ''}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none transition-colors ${formErrors.phone ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                                        />
                                    </div>
                                )}

                                {customerInfo.type === 'Delivery' && (
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                                            <MapPin size={12} /> Address <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            placeholder="Full delivery address..."
                                            rows={2}
                                            value={customerInfo.address || ''}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                            className={`w-full bg-white border rounded-md px-3 py-2 text-sm outline-none resize-none transition-colors ${formErrors.address ? 'border-red-500' : 'border-stone-200 focus:border-gold-500'}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-stone-400 opacity-50 py-10">
                                    <ChefHat size={48} strokeWidth={1} />
                                    <p className="mt-2 text-sm font-serif italic">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex gap-3 items-center group">
                                            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-stone-100">
                                                <img src={item.image || ''} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm text-stone-800 truncate leading-tight">{item.name}</h4>
                                                <p className="text-xs text-stone-500 mt-1">€{item.price} each</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <p className="font-bold text-stone-900 text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                                                <div className="flex items-center gap-2 bg-stone-100 rounded-full px-1 py-0.5">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"><Minus size={10} /></button>
                                                    <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"><Plus size={10} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-5 bg-stone-50 border-t border-stone-200 relative">
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {orderStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.5 }}
                                            animate={{ scale: 1 }}
                                            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                                        >
                                            <CheckCircle2 size={32} />
                                        </motion.div>
                                        <h3 className="font-display font-bold text-xl text-stone-900 mb-2">Order Placed!</h3>
                                        <p className="text-stone-500 text-sm">Your order has been sent to the kitchen.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {cart.length > 0 && (
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{cart.length} Items</span>
                                    <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold"><Trash2 size={12} /> Clear Order</button>
                                </div>
                            )}

                            <div className="space-y-2 mb-6 text-sm">
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal</span>
                                    <span>€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Tax (10%)</span>
                                    <span>€{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-stone-900 border-t border-stone-200 pt-2 mt-2">
                                    <span>Grand Total</span>
                                    <span>€{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full !rounded-xl !py-4 flex justify-center items-center gap-2"
                                disabled={cart.length === 0 || orderStatus !== 'idle'}
                                onClick={handlePlaceOrder}
                            >
                                {orderStatus === 'processing' ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        Place {customerInfo.type} Order {getOrderTypeIcon()}
                                    </>
                                )}
                            </Button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
