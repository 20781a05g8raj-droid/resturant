// Database types matching Supabase tables

export interface DbMenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'starters' | 'mains' | 'desserts' | 'drinks';
    image: string | null;
    rating: number;
    reviews_count: number;
    ingredients: string[];
    nutrition: string | null;
    benefits: string[];
    sort_order: number;
    is_active: boolean;
    created_at: string;
}

export interface DbOrder {
    id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string | null;
    order_type: 'Dine In' | 'Take Away' | 'Delivery';
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    created_at: string;
}

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface DbReservation {
    id: number;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    occasion: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

export interface DbReview {
    id: number;
    name: string;
    dish: string;
    rating: number;
    text: string;
    image: string | null;
    is_visible: boolean;
    created_at: string;
}

export interface DbContact {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface DbSiteSetting {
    key: string;
    value: any;
    updated_at: string;
}
