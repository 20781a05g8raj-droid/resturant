import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Starters
  { 
    id: 1, 
    name: "Gyoza Selection", 
    description: "Pan-fried dumplings with sesame soy.", 
    price: 8, 
    category: "starters", 
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c423c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 124,
    ingredients: ["Minced Chicken/Veg", "Wheat Wrapper", "Sesame Oil", "Soy Sauce", "Ginger", "Garlic", "Scallions"],
    nutrition: "240 kcal • 12g Protein",
    benefits: ["Rich in protein", "Ginger aids digestion", "Steamed option available for lower fat"]
  },
  { 
    id: 2, 
    name: "Tuna Tataki", 
    description: "Seared fresh tuna with ponzu sauce.", 
    price: 14, 
    category: "starters", 
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2080&auto=format&fit=crop",
    rating: 4.9,
    reviews: 89,
    ingredients: ["Fresh Tuna Sashimi", "Ponzu Sauce", "Sesame Seeds", "Radish", "Citrus Juice"],
    nutrition: "180 kcal • 25g Protein",
    benefits: ["High Omega-3 fatty acids", "Low calorie", "Excellent source of lean protein"]
  },
  { 
    id: 3, 
    name: "Tom Kha Gai", 
    description: "Coconut soup with chicken & galangal.", 
    price: 9, 
    category: "starters", 
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    reviews: 210,
    ingredients: ["Coconut Milk", "Chicken Breast", "Galangal", "Lemongrass", "Kaffir Lime Leaves", "Mushrooms", "Chili"],
    nutrition: "320 kcal • Creamy & Spicy",
    benefits: ["Coconut milk provides energy", "Galangal has anti-inflammatory properties", "Immune boosting herbs"]
  },
  { 
    id: 4, 
    name: "Veg Spring Rolls", 
    description: "Crispy rolls with sweet chili sauce.", 
    price: 7, 
    category: "starters", 
    image: "https://images.unsplash.com/photo-1544510808-91bcbee1df55?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    reviews: 156,
    ingredients: ["Cabbage", "Carrots", "Glass Noodles", "Pastry Wrapper", "Sweet Chili Sauce"],
    nutrition: "190 kcal • Vegetarian",
    benefits: ["Packed with vegetables", "Light appetizer", "Crunchy texture stimulates appetite"]
  },
  
  // Mains
  { 
    id: 5, 
    name: "Omakase Nigiri", 
    description: "12pcs Chef's premium selection.", 
    price: 28, 
    category: "mains", 
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop",
    rating: 5.0,
    reviews: 342,
    ingredients: ["Sushi Rice", "Salmon", "Tuna", "Yellowtail", "Eel", "Shrimp", "Wasabi", "Ginger"],
    nutrition: "580 kcal • High Protein",
    benefits: ["Complete protein source", "Heart-healthy fats", "Rich in iodine and vitamins"]
  },
  { 
    id: 6, 
    name: "Dragon Roll", 
    description: "Tempura shrimp, avocado, eel.", 
    price: 16, 
    category: "mains", 
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1974&auto=format&fit=crop",
    rating: 4.8,
    reviews: 275,
    ingredients: ["Shrimp Tempura", "Avocado", "BBQ Eel", "Cucumber", "Unagi Sauce", "Sesame Seeds", "Nori"],
    nutrition: "480 kcal • Rich Flavor",
    benefits: ["Avocado provides healthy monounsaturated fats", "Eel helps stamina", "Energy boosting"]
  },
  { 
    id: 7, 
    name: "Thai Green Curry", 
    description: "Spicy coconut curry with basil.", 
    price: 17, 
    category: "mains", 
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
    rating: 4.6,
    reviews: 198,
    ingredients: ["Green Curry Paste", "Coconut Milk", "Bamboo Shoots", "Thai Basil", "Eggplant", "Chicken/Tofu"],
    nutrition: "450 kcal • Spicy",
    benefits: ["Spices boost metabolism", "Basil is an antioxidant", "Comforting and warming"]
  },
  { 
    id: 8, 
    name: "Pad Thai", 
    description: "Stir-fried noodles with tamarind.", 
    price: 15, 
    category: "mains", 
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1979&auto=format&fit=crop",
    rating: 4.9,
    reviews: 412,
    ingredients: ["Rice Noodles", "Tamarind Pulp", "Peanuts", "Egg", "Bean Sprouts", "Chives", "Shrimp/Chicken"],
    nutrition: "520 kcal • Balanced Meal",
    benefits: ["Gluten-free noodles", "Peanuts provide energy", "Tamarind aids digestion"]
  },
  { 
    id: 9, 
    name: "Salmon Teriyaki", 
    description: "Grilled fillet with glaze.", 
    price: 19, 
    category: "mains", 
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=1974&auto=format&fit=crop",
    rating: 4.7,
    reviews: 145,
    ingredients: ["Salmon Fillet", "Teriyaki Sauce (Soy, Mirin, Sugar)", "Steamed Broccoli", "Sesame Seeds", "Rice"],
    nutrition: "460 kcal • High Omega-3",
    benefits: ["Supports brain health", "High quality protein", "Broccoli adds fiber and vitamins"]
  },
  
  // Desserts
  { 
    id: 10, 
    name: "Mango Sticky Rice", 
    description: "Sweet rice with fresh mango.", 
    price: 9, 
    category: "desserts", 
    image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=1974&auto=format&fit=crop",
    rating: 4.8,
    reviews: 220,
    ingredients: ["Glutinous Rice", "Coconut Milk", "Ripe Mango", "Palm Sugar", "Mung Beans"],
    nutrition: "380 kcal • Sweet Treat",
    benefits: ["Mango is rich in Vitamin C", "Coconut milk provides healthy fats", "Gluten-free dessert"]
  },
  { 
    id: 11, 
    name: "Mochi Ice Cream", 
    description: "Green Tea, Mango, Vanilla.", 
    price: 7, 
    category: "desserts", 
    image: "https://images.unsplash.com/photo-1623592863821-6d7730e46048?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    reviews: 180,
    ingredients: ["Rice Flour", "Ice Cream Filling", "Sugar", "Cornstarch"],
    nutrition: "120 kcal per piece",
    benefits: ["Portion controlled treat", "Green tea flavor has antioxidants", "Fun texture"]
  },
  
  // Drinks
  { 
    id: 13, 
    name: "Sake Junmai", 
    description: "Premium rice wine (180ml).", 
    price: 12, 
    category: "drinks", 
    image: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?q=80&w=1974&auto=format&fit=crop",
    rating: 4.5,
    reviews: 65,
    ingredients: ["Rice", "Water", "Koji Mold", "Yeast"],
    nutrition: "130 kcal",
    benefits: ["Contains amino acids", "Gluten-free alcohol option", "Traditional pairing"]
  },
  { 
    id: 14, 
    name: "Thai Iced Tea", 
    description: "Sweet spiced tea with milk.", 
    price: 5, 
    category: "drinks", 
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    reviews: 310,
    ingredients: ["Black Tea", "Star Anise", "Cardamom", "Condensed Milk", "Sugar", "Ice"],
    nutrition: "220 kcal • Sweet & Creamy",
    benefits: ["Spices provide antioxidants", "Cooling effect", "Energy boost from caffeine"]
  },
];