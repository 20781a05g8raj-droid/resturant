-- =============================================
-- Nosso Sushi & Thai — Supabase Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Menu Items
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN ('starters','mains','desserts','drinks')),
  image TEXT,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  reviews_count INT NOT NULL DEFAULT 0,
  ingredients TEXT[] DEFAULT '{}',
  nutrition TEXT,
  benefits TEXT[] DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  customer_address TEXT,
  order_type TEXT NOT NULL CHECK (order_type IN ('Dine In','Take Away','Delivery')),
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','preparing','ready','delivered','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Reservations
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  occasion TEXT NOT NULL DEFAULT 'Dinner',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  dish TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  image TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Contacts
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Site Settings (key-value store)
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- RLS Policies
-- =============================================

-- Allow public read for active menu items
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active menu" ON menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access menu" ON menu_items FOR ALL USING (auth.role() = 'authenticated');

-- Orders: public insert, admin read/update
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- Reservations: public insert, admin read/update
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access reservations" ON reservations FOR ALL USING (auth.role() = 'authenticated');

-- Reviews: public read visible, admin full
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible reviews" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Admin full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');

-- Contacts: public insert, admin full
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access contacts" ON contacts FOR ALL USING (auth.role() = 'authenticated');

-- Site settings: public read, admin write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Seed Data
-- =============================================

-- Seed menu items
INSERT INTO menu_items (id, name, description, price, category, image, rating, reviews_count, ingredients, nutrition, benefits, sort_order) VALUES
(1, 'Gyoza Selection', 'Pan-fried dumplings with sesame soy.', 8, 'starters', 'https://images.unsplash.com/photo-1496116218417-1a781b1c423c?q=80&w=2070&auto=format&fit=crop', 4.8, 124, '{"Minced Chicken/Veg","Wheat Wrapper","Sesame Oil","Soy Sauce","Ginger","Garlic","Scallions"}', '240 kcal · 12g Protein', '{"Rich in protein","Ginger aids digestion","Steamed option available for lower fat"}', 1),
(2, 'Tuna Tataki', 'Seared fresh tuna with ponzu sauce.', 14, 'starters', 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop', 4.9, 89, '{"Fresh Tuna Sashimi","Ponzu Sauce","Sesame Seeds","Radish","Citrus Juice"}', '180 kcal · 25g Protein', '{"High Omega-3 fatty acids","Low calorie","Excellent source of lean protein"}', 2),
(3, 'Tom Kha Gai', 'Coconut soup with chicken & galangal.', 9, 'starters', 'https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=2070&auto=format&fit=crop', 4.7, 210, '{"Coconut Milk","Chicken Breast","Galangal","Lemongrass","Kaffir Lime Leaves","Mushrooms","Chili"}', '320 kcal · Creamy & Spicy', '{"Coconut milk provides energy","Galangal has anti-inflammatory properties","Immune boosting herbs"}', 3),
(4, 'Veg Spring Rolls', 'Crispy rolls with sweet chili sauce.', 7, 'starters', 'https://images.unsplash.com/photo-1544510808-91bcbee1df55?q=80&w=2070&auto=format&fit=crop', 4.5, 156, '{"Cabbage","Carrots","Glass Noodles","Pastry Wrapper","Sweet Chili Sauce"}', '190 kcal · Vegetarian', '{"Packed with vegetables","Light appetizer","Crunchy texture stimulates appetite"}', 4),
(5, 'Omakase Nigiri', '12pcs Chef''s premium selection.', 28, 'mains', 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop', 5.0, 342, '{"Sushi Rice","Salmon","Tuna","Yellowtail","Eel","Shrimp","Wasabi","Ginger"}', '580 kcal · High Protein', '{"Complete protein source","Heart-healthy fats","Rich in iodine and vitamins"}', 5),
(6, 'Dragon Roll', 'Tempura shrimp, avocado, eel.', 16, 'mains', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1974&auto=format&fit=crop', 4.8, 275, '{"Shrimp Tempura","Avocado","BBQ Eel","Cucumber","Unagi Sauce","Sesame Seeds","Nori"}', '480 kcal · Rich Flavor', '{"Avocado provides healthy monounsaturated fats","Eel helps stamina","Energy boosting"}', 6),
(7, 'Thai Green Curry', 'Spicy coconut curry with basil.', 17, 'mains', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop', 4.6, 198, '{"Green Curry Paste","Coconut Milk","Bamboo Shoots","Thai Basil","Eggplant","Chicken/Tofu"}', '450 kcal · Spicy', '{"Spices boost metabolism","Basil is an antioxidant","Comforting and warming"}', 7),
(8, 'Pad Thai', 'Stir-fried noodles with tamarind.', 15, 'mains', 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1979&auto=format&fit=crop', 4.9, 412, '{"Rice Noodles","Tamarind Pulp","Peanuts","Egg","Bean Sprouts","Chives","Shrimp/Chicken"}', '520 kcal · Balanced Meal', '{"Gluten-free noodles","Peanuts provide energy","Tamarind aids digestion"}', 8),
(9, 'Salmon Teriyaki', 'Grilled fillet with glaze.', 19, 'mains', 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=1974&auto=format&fit=crop', 4.7, 145, '{"Salmon Fillet","Teriyaki Sauce (Soy, Mirin, Sugar)","Steamed Broccoli","Sesame Seeds","Rice"}', '460 kcal · High Omega-3', '{"Supports brain health","High quality protein","Broccoli adds fiber and vitamins"}', 9),
(10, 'Mango Sticky Rice', 'Sweet rice with fresh mango.', 9, 'desserts', 'https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=1974&auto=format&fit=crop', 4.8, 220, '{"Glutinous Rice","Coconut Milk","Ripe Mango","Palm Sugar","Mung Beans"}', '380 kcal · Sweet Treat', '{"Mango is rich in Vitamin C","Coconut milk provides healthy fats","Gluten-free dessert"}', 10),
(11, 'Mochi Ice Cream', 'Green Tea, Mango, Vanilla.', 7, 'desserts', 'https://images.unsplash.com/photo-1623592863821-6d7730e46048?q=80&w=2070&auto=format&fit=crop', 4.6, 180, '{"Rice Flour","Ice Cream Filling","Sugar","Cornstarch"}', '120 kcal per piece', '{"Portion controlled treat","Green tea flavor has antioxidants","Fun texture"}', 11),
(13, 'Sake Junmai', 'Premium rice wine (180ml).', 12, 'drinks', 'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?q=80&w=1974&auto=format&fit=crop', 4.5, 65, '{"Rice","Water","Koji Mold","Yeast"}', '130 kcal', '{"Contains amino acids","Gluten-free alcohol option","Traditional pairing"}', 12),
(14, 'Thai Iced Tea', 'Sweet spiced tea with milk.', 5, 'drinks', 'https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=1974&auto=format&fit=crop', 4.9, 310, '{"Black Tea","Star Anise","Cardamom","Condensed Milk","Sugar","Ice"}', '220 kcal · Sweet & Creamy', '{"Spices provide antioxidants","Cooling effect","Energy boost from caffeine"}', 13);

-- Seed reviews
INSERT INTO reviews (name, dish, rating, text, image) VALUES
('Elena Rodriguez', 'Omakase Nigiri', 5, 'The Omakase was an absolute masterpiece. The freshness of the fish paired with the chef''s precision made for an unforgettable evening.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'),
('Thomas Weber', 'Thai Green Curry', 5, 'Authentic heat and creamy coconut richness. It transported me back to Bangkok. Highly recommend the beef option!', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'),
('Sarah Jenkins', 'Dragon Roll', 4, 'A visual delight and a flavor explosion. The unagi sauce gives it that perfect sweet finish. Service was impeccable.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop');

-- Seed site settings
INSERT INTO site_settings (key, value) VALUES
('hero_images', '["https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop","https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop","https://images.unsplash.com/photo-1617196019294-dc44dfac01d5?q=80&w=2070&auto=format&fit=crop"]'),
('restaurant_info', '{"name":"Nosso Sushi & Thai","address":"Rua da Gastronomia 123, 2870 Montijo, Portugal","phone":"+351 123 456 789","email":"reservas@nossoptdemo.com"}'),
('hours', '{"lunch":"12:00 - 15:00","dinner":"19:00 - 23:00","closed":"Monday","lunch_days":"Tue-Sun","dinner_days":"Tue-Sun"}'),
('social_links', '{"facebook":"#","twitter":"#","instagram":"#"}');

-- Reset sequence
SELECT setval('menu_items_id_seq', (SELECT MAX(id) FROM menu_items));
