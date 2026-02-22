import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, X, Save, Eye, EyeOff } from 'lucide-react';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../lib/api/menuApi';
import type { DbMenuItem } from '../lib/database.types';

const emptyItem: Partial<DbMenuItem> = {
    name: '', description: '', price: 0, category: 'starters', image: '',
    rating: 0, reviews_count: 0, ingredients: [], nutrition: '', benefits: [],
    sort_order: 0, is_active: true,
};

export const MenuManager: React.FC = () => {
    const [items, setItems] = useState<DbMenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<DbMenuItem>>(emptyItem);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => { loadItems(); }, []);

    const loadItems = async () => {
        try {
            const data = await getMenuItems();
            setItems(data);
        } catch (err) {
            console.error('Failed to load menu items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isEditing && editingItem.id) {
                const { id, created_at, ...updates } = editingItem as DbMenuItem;
                await updateMenuItem(id, updates);
            } else {
                const { id, created_at, ...newItem } = editingItem as any;
                await createMenuItem(newItem);
            }
            await loadItems();
            setShowModal(false);
            setEditingItem(emptyItem);
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteMenuItem(id);
            setItems(items.filter(i => i.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const openEdit = (item: DbMenuItem) => {
        setEditingItem({ ...item });
        setIsEditing(true);
        setShowModal(true);
    };

    const openNew = () => {
        setEditingItem({ ...emptyItem, sort_order: items.length + 1 });
        setIsEditing(false);
        setShowModal(true);
    };

    const filtered = items.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === 'all' || item.category === filterCat;
        return matchSearch && matchCat;
    });

    const categories = ['all', 'starters', 'mains', 'desserts', 'drinks'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-display text-white tracking-wider">Menu Manager</h1>
                    <p className="text-stone-500 text-sm mt-1">{items.length} items total</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 bg-gold-500 text-stone-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gold-400 transition-colors">
                    <Plus size={16} /> Add Item
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search menu items..."
                        className="w-full bg-stone-900 border border-stone-700 pl-10 pr-4 py-2 text-white rounded-lg text-sm focus:border-gold-500 focus:outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCat(cat)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all ${filterCat === cat
                                    ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
                                    : 'bg-stone-900 text-stone-500 border border-stone-700 hover:border-stone-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-stone-800 text-stone-500 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4 text-left">Item</th>
                            <th className="py-3 px-4 text-left hidden md:table-cell">Category</th>
                            <th className="py-3 px-4 text-right">Price</th>
                            <th className="py-3 px-4 text-center hidden md:table-cell">Rating</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => (
                            <tr key={item.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                                        )}
                                        <div>
                                            <p className="text-white text-sm font-medium">{item.name}</p>
                                            <p className="text-stone-500 text-xs truncate max-w-[200px]">{item.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 hidden md:table-cell">
                                    <span className="text-xs px-2 py-1 rounded-full bg-stone-800 text-stone-400 capitalize">{item.category}</span>
                                </td>
                                <td className="py-3 px-4 text-right text-white font-bold text-sm">€{Number(item.price).toFixed(2)}</td>
                                <td className="py-3 px-4 text-center text-gold-500 text-sm hidden md:table-cell">⭐ {item.rating}</td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`text-xs px-2 py-1 rounded-full ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {item.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => openEdit(item)} className="p-1.5 text-stone-500 hover:text-gold-500 hover:bg-gold-500/10 rounded transition-all">
                                            <Pencil size={14} />
                                        </button>
                                        {deleteConfirm === item.id ? (
                                            <div className="flex gap-1">
                                                <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Yes</button>
                                                <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-stone-700 text-white text-xs rounded">No</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className="text-stone-600 text-sm text-center py-8">No items found</p>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-stone-900 border border-stone-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-white font-display tracking-wider">{isEditing ? 'Edit Item' : 'New Item'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-stone-500 hover:text-white"><X size={20} /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Name</label>
                                    <input
                                        value={editingItem.name || ''}
                                        onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Category</label>
                                    <select
                                        value={editingItem.category || 'starters'}
                                        onChange={e => setEditingItem({ ...editingItem, category: e.target.value as any })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    >
                                        <option value="starters">Starters</option>
                                        <option value="mains">Mains</option>
                                        <option value="desserts">Desserts</option>
                                        <option value="drinks">Drinks</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Description</label>
                                    <textarea
                                        value={editingItem.description || ''}
                                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                        rows={2}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Price (€)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editingItem.price || 0}
                                        onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Image URL</label>
                                    <input
                                        value={editingItem.image || ''}
                                        onChange={e => setEditingItem({ ...editingItem, image: e.target.value })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={editingItem.rating || 0}
                                        onChange={e => setEditingItem({ ...editingItem, rating: parseFloat(e.target.value) })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Sort Order</label>
                                    <input
                                        type="number"
                                        value={editingItem.sort_order || 0}
                                        onChange={e => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Nutrition</label>
                                    <input
                                        value={editingItem.nutrition || ''}
                                        onChange={e => setEditingItem({ ...editingItem, nutrition: e.target.value })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Ingredients (comma-separated)</label>
                                    <input
                                        value={(editingItem.ingredients || []).join(', ')}
                                        onChange={e => setEditingItem({ ...editingItem, ingredients: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-stone-400 text-xs uppercase mb-1">Benefits (comma-separated)</label>
                                    <input
                                        value={(editingItem.benefits || []).join(', ')}
                                        onChange={e => setEditingItem({ ...editingItem, benefits: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                        className="w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 flex items-center gap-3">
                                    <label className="text-stone-400 text-xs uppercase">Active</label>
                                    <button
                                        onClick={() => setEditingItem({ ...editingItem, is_active: !editingItem.is_active })}
                                        className={`w-10 h-5 rounded-full transition-colors relative ${editingItem.is_active ? 'bg-green-500' : 'bg-stone-700'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${editingItem.is_active ? 'left-5' : 'left-0.5'}`}></div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-800">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-stone-400 hover:text-white text-sm transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-gold-500 text-stone-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gold-400 disabled:opacity-50 transition-all"
                                >
                                    <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
