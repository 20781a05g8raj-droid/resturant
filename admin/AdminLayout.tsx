import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, UtensilsCrossed, ShoppingCart, CalendarDays,
    Star, Mail, Settings, LogOut, ChevronLeft, Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy imports for admin pages
import { Dashboard } from './Dashboard';
import { MenuManager } from './MenuManager';
import { OrdersManager } from './OrdersManager';
import { ReservationsManager } from './ReservationsManager';
import { ReviewsManager } from './ReviewsManager';
import { ContactsManager } from './ContactsManager';
import { SiteSettings } from './SiteSettings';

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
    { path: '/admin/reviews', label: 'Reviews', icon: Star },
    { path: '/admin/contacts', label: 'Messages', icon: Mail },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminSidebar: React.FC<{ collapsed: boolean; onToggle: () => void }> = ({ collapsed, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <aside className={`fixed top-0 left-0 h-full bg-stone-900 border-r border-stone-800 z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-60'}`}>
            {/* Logo */}
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                {!collapsed && (
                    <div>
                        <h1 className="font-display text-sm text-white tracking-widest">NOSSO</h1>
                        <div className="flex gap-1 text-[10px] font-bold">
                            <span className="text-gold-500">SUSHI</span>
                            <span className="text-brand-red font-script text-sm">&</span>
                            <span className="text-stone-300">THAI</span>
                        </div>
                    </div>
                )}
                <button onClick={onToggle} className="text-stone-500 hover:text-white transition-colors p-1">
                    {collapsed ? <MenuIcon size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <button
                        key={path}
                        onClick={() => navigate(path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive(path)
                                ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                                : 'text-stone-400 hover:text-white hover:bg-stone-800'
                            }`}
                        title={collapsed ? label : undefined}
                    >
                        <Icon size={18} />
                        {!collapsed && <span className="font-medium">{label}</span>}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-2 border-t border-stone-800">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-stone-500 hover:text-white text-sm rounded-lg hover:bg-stone-800 transition-all mb-1"
                    title={collapsed ? 'View Site' : undefined}
                >
                    <ChevronLeft size={18} />
                    {!collapsed && <span>View Site</span>}
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 text-sm rounded-lg hover:bg-red-500/10 transition-all"
                    title={collapsed ? 'Logout' : undefined}
                >
                    <LogOut size={18} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

const AdminContent: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className="min-h-screen bg-stone-950">
            <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <main className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'} min-h-screen`}>
                <div className="p-6">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="menu" element={<MenuManager />} />
                        <Route path="orders" element={<OrdersManager />} />
                        <Route path="reservations" element={<ReservationsManager />} />
                        <Route path="reviews" element={<ReviewsManager />} />
                        <Route path="contacts" element={<ContactsManager />} />
                        <Route path="settings" element={<SiteSettings />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export const AdminLayout: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-2 border-gold-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route path="*" element={isAuthenticated ? <AdminContent /> : <AdminLogin />} />
        </Routes>
    );
};
