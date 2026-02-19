export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image?: string;
  rating?: number;
  reviews?: number;
  ingredients?: string[];
  nutrition?: string;
  benefits?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  table: string;
  type: string;
  phone?: string;
  address?: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
}