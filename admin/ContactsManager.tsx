import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Clock, Search } from 'lucide-react';
import { getContacts, markContactAsRead } from '../lib/api/contactsApi';
import type { DbContact } from '../lib/database.types';

export const ContactsManager: React.FC = () => {
    const [contacts, setContacts] = useState<DbContact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => { loadContacts(); }, []);

    const loadContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (err) {
            console.error('Failed to load contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRead = async (id: number, current: boolean) => {
        try {
            const updated = await markContactAsRead(id, !current);
            setContacts(contacts.map(c => c.id === id ? updated : c));
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    const filtered = contacts.filter(c => {
        const matchFilter = filter === 'all' || (filter === 'unread' ? !c.is_read : c.is_read);
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const selected = contacts.find(c => c.id === selectedId);

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
                <h1 className="text-2xl font-display text-white tracking-wider">Messages</h1>
                <p className="text-stone-500 text-sm mt-1">{contacts.filter(c => !c.is_read).length} unread of {contacts.length} total</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4" style={{ minHeight: '70vh' }}>
                {/* Message List */}
                <div className="lg:w-1/3 space-y-3">
                    {/* Search & Filter */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search messages..."
                            className="w-full bg-stone-900 border border-stone-700 pl-10 pr-4 py-2 text-white rounded-lg text-sm focus:border-gold-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-2 mb-3">
                        {['all', 'unread', 'read'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all border ${filter === s
                                        ? 'bg-gold-500/20 text-gold-500 border-gold-500/30'
                                        : 'bg-stone-900 text-stone-500 border-stone-700'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                        {filtered.map(contact => (
                            <div
                                key={contact.id}
                                onClick={() => {
                                    setSelectedId(contact.id);
                                    if (!contact.is_read) handleToggleRead(contact.id, false);
                                }}
                                className={`bg-stone-900 border rounded-lg p-3 cursor-pointer transition-all ${selectedId === contact.id
                                        ? 'border-gold-500/50 bg-gold-500/5'
                                        : contact.is_read
                                            ? 'border-stone-800 hover:border-stone-700'
                                            : 'border-stone-700 hover:border-stone-600'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {!contact.is_read && <div className="w-2 h-2 rounded-full bg-gold-500"></div>}
                                    <p className={`text-sm font-medium ${contact.is_read ? 'text-stone-400' : 'text-white'}`}>{contact.name}</p>
                                </div>
                                <p className="text-stone-500 text-xs truncate">{contact.subject}</p>
                                <p className="text-stone-600 text-[10px] mt-1 flex items-center gap-1">
                                    <Clock size={10} /> {new Date(contact.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                        {filtered.length === 0 && <p className="text-stone-600 text-sm text-center py-4">No messages</p>}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="flex-1">
                    {selected ? (
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-stone-900 border border-stone-800 rounded-xl p-6 h-full"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-white text-lg font-medium">{selected.subject || 'No Subject'}</h2>
                                    <p className="text-stone-500 text-sm">From: <span className="text-gold-500">{selected.name}</span></p>
                                    <p className="text-stone-600 text-xs">{selected.email} {selected.phone && `• ${selected.phone}`}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleRead(selected.id, selected.is_read)}
                                        className="p-2 text-stone-500 hover:text-gold-500 hover:bg-gold-500/10 rounded-lg transition-all"
                                        title={selected.is_read ? 'Mark unread' : 'Mark read'}
                                    >
                                        {selected.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="text-stone-600 text-xs mb-4">{new Date(selected.created_at).toLocaleString()}</div>
                            <div className="bg-stone-800/50 rounded-lg p-4">
                                <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-stone-900 border border-stone-800 rounded-xl flex items-center justify-center h-full min-h-[300px]">
                            <div className="text-center text-stone-600">
                                <Mail size={40} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Select a message to view</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
