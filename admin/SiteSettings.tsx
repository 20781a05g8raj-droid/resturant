import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ImagePlus, Trash2, Plus, Check } from 'lucide-react';
import { getSetting, updateSetting } from '../lib/api/settingsApi';

export const SiteSettings: React.FC = () => {
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [restaurantInfo, setRestaurantInfo] = useState({
        name: '', address: '', phone: '', email: '',
    });
    const [hours, setHours] = useState({
        lunch: '', dinner: '', closed: '', lunch_days: '', dinner_days: '',
    });
    const [socialLinks, setSocialLinks] = useState({
        facebook: '', twitter: '', instagram: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => { loadSettings(); }, []);

    const loadSettings = async () => {
        try {
            const [hero, info, hrs, social] = await Promise.all([
                getSetting('hero_images'),
                getSetting('restaurant_info'),
                getSetting('hours'),
                getSetting('social_links'),
            ]);
            if (hero) setHeroImages(Array.isArray(hero) ? hero : JSON.parse(hero));
            if (info) setRestaurantInfo(typeof info === 'string' ? JSON.parse(info) : info);
            if (hrs) setHours(typeof hrs === 'string' ? JSON.parse(hrs) : hrs);
            if (social) setSocialLinks(typeof social === 'string' ? JSON.parse(social) : social);
        } catch (err) {
            console.error('Failed to load settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                updateSetting('hero_images', heroImages),
                updateSetting('restaurant_info', restaurantInfo),
                updateSetting('hours', hours),
                updateSetting('social_links', socialLinks),
            ]);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setSaving(false);
        }
    };

    const addHeroImage = () => {
        if (newImageUrl.trim()) {
            setHeroImages([...heroImages, newImageUrl.trim()]);
            setNewImageUrl('');
        }
    };

    const removeHeroImage = (index: number) => {
        setHeroImages(heroImages.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const inputClass = "w-full bg-stone-800 border border-stone-700 px-3 py-2 text-white rounded text-sm focus:border-gold-500 focus:outline-none";
    const labelClass = "block text-stone-400 text-xs uppercase tracking-wider mb-1";

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-display text-white tracking-wider">Site Settings</h1>
                    <p className="text-stone-500 text-sm mt-1">Manage your website content</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${saved
                            ? 'bg-green-500 text-white'
                            : 'bg-gold-500 text-stone-900 hover:bg-gold-400'
                        } disabled:opacity-50`}
                >
                    {saved ? <><Check size={16} /> Saved!</> : saving ? 'Saving...' : <><Save size={16} /> Save All</>}
                </button>
            </div>

            <div className="space-y-6">
                {/* Hero Images */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <h2 className="text-white font-display text-sm tracking-wider mb-4 flex items-center gap-2">
                        <ImagePlus size={16} className="text-gold-500" /> HERO SLIDER IMAGES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {heroImages.map((url, i) => (
                            <div key={i} className="relative group">
                                <img src={url} alt={`Hero ${i + 1}`} className="w-full aspect-video object-cover rounded-lg border border-stone-700" />
                                <button
                                    onClick={() => removeHeroImage(i)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">#{i + 1}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={newImageUrl}
                            onChange={e => setNewImageUrl(e.target.value)}
                            placeholder="Paste image URL..."
                            className={`${inputClass} flex-1`}
                        />
                        <button onClick={addHeroImage} className="px-3 py-2 bg-stone-800 text-gold-500 border border-stone-700 rounded hover:bg-stone-700 transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Restaurant Info */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <h2 className="text-white font-display text-sm tracking-wider mb-4">RESTAURANT INFO</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Name</label>
                            <input value={restaurantInfo.name} onChange={e => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Phone</label>
                            <input value={restaurantInfo.phone} onChange={e => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input value={restaurantInfo.email} onChange={e => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Address</label>
                            <input value={restaurantInfo.address} onChange={e => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })} className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <h2 className="text-white font-display text-sm tracking-wider mb-4">OPERATING HOURS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Lunch Hours</label>
                            <input value={hours.lunch} onChange={e => setHours({ ...hours, lunch: e.target.value })} className={inputClass} placeholder="12:00 - 15:00" />
                        </div>
                        <div>
                            <label className={labelClass}>Lunch Days</label>
                            <input value={hours.lunch_days} onChange={e => setHours({ ...hours, lunch_days: e.target.value })} className={inputClass} placeholder="Tue-Sun" />
                        </div>
                        <div>
                            <label className={labelClass}>Dinner Hours</label>
                            <input value={hours.dinner} onChange={e => setHours({ ...hours, dinner: e.target.value })} className={inputClass} placeholder="19:00 - 23:00" />
                        </div>
                        <div>
                            <label className={labelClass}>Dinner Days</label>
                            <input value={hours.dinner_days} onChange={e => setHours({ ...hours, dinner_days: e.target.value })} className={inputClass} placeholder="Tue-Sun" />
                        </div>
                        <div>
                            <label className={labelClass}>Closed Day</label>
                            <input value={hours.closed} onChange={e => setHours({ ...hours, closed: e.target.value })} className={inputClass} placeholder="Monday" />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                    <h2 className="text-white font-display text-sm tracking-wider mb-4">SOCIAL MEDIA LINKS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className={labelClass}>Facebook</label>
                            <input value={socialLinks.facebook} onChange={e => setSocialLinks({ ...socialLinks, facebook: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Twitter</label>
                            <input value={socialLinks.twitter} onChange={e => setSocialLinks({ ...socialLinks, twitter: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Instagram</label>
                            <input value={socialLinks.instagram} onChange={e => setSocialLinks({ ...socialLinks, instagram: e.target.value })} className={inputClass} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
