// Persistent Database Module for Amul Store
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Data Structure & Seed Data
const INITIAL_PRODUCTS = [
    {
        id: "amul-kool-rose",
        name: "Amul Kool Gold Exotic Rose Flavour",
        category: "flavoured-milk",
        tag: "Signature Rose Milk",
        badge: "Hero Special",
        badgeColor: "bg-primary",
        price: 25,
        originalPrice: 30,
        rating: 4.9,
        reviewsCount: 612,
        volume: "200ml Bottle",
        image: "./images/amul-kool-rose.png",
        description: "Amul's iconic sterilized flavoured milk infused with natural rose extracts and rich toned milk. Delivering refreshing floral sweetness and pure milk nutrition in every sip.",
        ingredients: "Standardised Milk, Sugar, Permitted Synthetic Food Colour (INS 127) and Added Natural Identical Rose Flavour.",
        nutritional: { calories: "88 kcal", carbohydrates: "12.0g", protein: "3.2g", fat: "3.0g", calcium: "120mg" },
        packs: [
            { size: "200 ml Pet Bottle", price: 25 },
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "Pack of 6 Cans", price: 145 },
            { size: "Pack of 12 Cans (Party Pack)", price: 280 }
        ],
        colorGradient: "from-pink-500 via-rose-500 to-pink-600",
        accentColor: "#E91E63",
        icon: "local_florist",
        flavour: "Exotic Rose"
    },
    {
        id: "amul-mango-shake",
        name: "Amul Mango Shake (Real Alphonso)",
        category: "shakes-lassi",
        tag: "100% Real Alphonso Mango",
        badge: "Bestseller",
        badgeColor: "bg-amber-500",
        price: 25,
        originalPrice: 30,
        rating: 4.9,
        reviewsCount: 540,
        volume: "200ml Pouch",
        image: "./images/amul-mango-shake.jpg",
        description: "Rich, luscious mango milkshake made with sun-ripened Ratnagiri Alphonso mango pulp and thick creamy Amul milk. Convenient on-the-go spout pouch with easy-sip cap.",
        ingredients: "Standardised Milk, Alphonso Mango Pulp (25%), Sugar, Vitamin A & D Enriched, Natural Identical Flavour.",
        nutritional: { calories: "98 kcal", carbohydrates: "15.2g", naturalSugar: "13.8g", protein: "3.1g", vitaminA: "45mcg" },
        packs: [
            { size: "200 ml Spout Pouch", price: 25 },
            { size: "Pack of 6 Pouches (200ml)", price: 140 },
            { size: "Pack of 12 Pouches (Family Pack)", price: 270 }
        ],
        colorGradient: "from-amber-400 via-yellow-500 to-orange-500",
        accentColor: "#F59E0B",
        icon: "local_florist",
        flavour: "Alphonso Mango Shake"
    },
    {
        id: "amul-mango-milk",
        name: "Amul Mango Milk (The Royal Taste)",
        category: "flavoured-milk",
        tag: "Royal Alphonso with Dry Fruits",
        badge: "Royal Special",
        badgeColor: "bg-yellow-500",
        price: 25,
        originalPrice: 30,
        rating: 4.8,
        reviewsCount: 470,
        volume: "200ml Can",
        image: "./images/amul-mango-milk.jpg",
        description: "Thick, royal mango flavoured milk made with real mango nectar and pure Amul milk, garnished with almond and pistachio notes. A nutritious traditional delight.",
        ingredients: "Standardised Milk, Alphonso Mango Pulp (20%), Sugar, Saffron & Nut Essence, Permitted Stabilizer.",
        nutritional: { calories: "94 kcal", carbohydrates: "14.6g", naturalSugar: "13.0g", protein: "3.2g", calcium: "115mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "Pack of 6 Cans (200ml)", price: 145 },
            { size: "Pack of 12 Cans (Party Pack)", price: 280 }
        ],
        colorGradient: "from-yellow-400 via-amber-400 to-yellow-600",
        accentColor: "#EAB308",
        icon: "water_drop",
        flavour: "Royal Mango Milk"
    },
    {
        id: "amul-arabica-cafe",
        name: "Amul Arabica Café Cold Coffee",
        category: "flavoured-milk",
        tag: "Made with 100% Arabica Beans",
        badge: "Energy Pick",
        badgeColor: "bg-stone-800",
        price: 30,
        originalPrice: 35,
        rating: 4.9,
        reviewsCount: 720,
        volume: "200ml Can",
        image: "./images/amul-arabica-cafe.jpg",
        description: "Crafted from single-origin 100% roasted Arabica coffee beans brewed to perfection and blended with rich chilled Amul milk. The ultimate instant caffeine refreshment on the go.",
        ingredients: "Toned Milk, Sugar, 100% Arabica Coffee Extract (2.2%), Cocoa Solids, Acidity Regulator (INS 339(ii)).",
        nutritional: { calories: "96 kcal", carbohydrates: "13.5g", protein: "3.4g", fat: "3.2g", caffeine: "42mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 30 },
            { size: "250 ml Tetra Prisma", price: 35 },
            { size: "Pack of 6 Cans", price: 175 }
        ],
        colorGradient: "from-amber-900 via-stone-800 to-stone-950",
        accentColor: "#78350F",
        icon: "coffee",
        flavour: "Arabica Roast Coffee"
    },
    {
        id: "amul-coconut-water",
        name: "Amul Cool Tender Coconut Water",
        category: "fruit-juices",
        tag: "100% Natural Electrolytes",
        badge: "Hydration Hit",
        badgeColor: "bg-emerald-600",
        price: 25,
        originalPrice: 30,
        rating: 4.9,
        reviewsCount: 512,
        volume: "200ml Can",
        image: "./images/amul-coconut-water.jpg",
        description: "Pure, chilled tender coconut water packed straight from coastal Indian coconut groves. Loaded with potassium, bio-active enzymes, and natural electrolytes for instant rehydration.",
        ingredients: "100% Natural Tender Coconut Water, Bio-Preservative (INS 224), Vitamin C.",
        nutritional: { calories: "22 kcal", carbohydrates: "5.4g", naturalSugar: "4.8g", potassium: "240mg", sodium: "18mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "Pack of 6 Cans (200ml)", price: 145 },
            { size: "Pack of 12 Cans (Summer Pack)", price: 280 }
        ],
        colorGradient: "from-emerald-500 via-green-600 to-teal-700",
        accentColor: "#059669",
        icon: "eco",
        flavour: "Tender Coconut"
    },
    {
        id: "amul-pista-milk",
        name: "Amul Pista Milk (The Royal Taste)",
        category: "flavoured-milk",
        tag: "Crunchy Pistachio & Saffron",
        badge: "Nutri Special",
        badgeColor: "bg-lime-600",
        price: 25,
        originalPrice: 30,
        rating: 4.8,
        reviewsCount: 380,
        volume: "200ml Can",
        image: "./images/amul-pista-milk.jpg",
        description: "Traditional rich green pistachio flavoured milk churned with premium California pistachios and wholesome Amul toned milk. Rich in antioxidants and healthy proteins.",
        ingredients: "Standardised Milk, Sugar, Pistachio Extract (Pista), Natural Identical Flavours, Saffron.",
        nutritional: { calories: "92 kcal", carbohydrates: "12.8g", protein: "3.5g", fat: "3.2g", calcium: "125mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "Pack of 6 Cans (200ml)", price: 145 }
        ],
        colorGradient: "from-lime-400 via-emerald-500 to-green-600",
        accentColor: "#65A30D",
        icon: "nature",
        flavour: "Shahi Pista"
    },
    {
        id: "amul-strawberry-milk",
        name: "Amul Strawberry Milk (The Royal Taste)",
        category: "flavoured-milk",
        tag: "Fresh Mahabaleshwar Strawberries",
        badge: "Popular",
        badgeColor: "bg-rose-500",
        price: 25,
        originalPrice: 30,
        rating: 4.8,
        reviewsCount: 430,
        volume: "200ml Can",
        image: "./images/amul-strawberry-milk.jpg",
        description: "Delicious pink strawberry milk infused with sun-ripened Mahabaleshwar strawberry pulp and smooth homogenized Amul milk. Bursting with berry aroma and creamy joy.",
        ingredients: "Standardised Milk, Sugar, Real Strawberry Puree, Permitted Colour (INS 127), Calcium Enriched.",
        nutritional: { calories: "89 kcal", carbohydrates: "12.4g", protein: "3.2g", fat: "3.0g", calcium: "120mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "Pack of 6 Cans (200ml)", price: 145 }
        ],
        colorGradient: "from-rose-400 via-pink-500 to-rose-600",
        accentColor: "#F43F5E",
        icon: "favorite",
        flavour: "Fresh Strawberry"
    },
    {
        id: "amul-tru-guava",
        name: "Amul Tru Pink Guava with Chilli",
        category: "fruit-juices",
        tag: "Pink Guava & Mild Spice",
        badge: "Chef's Pick",
        badgeColor: "bg-pink-600",
        price: 20,
        originalPrice: 25,
        rating: 4.9,
        reviewsCount: 485,
        volume: "200ml Can",
        image: "./images/amul-tru-guava.jpg",
        description: "Velvety, exotic pink guava juice seasoned with a hint of rock salt and mild Indian red chilli. An authentic street-style taste sensation packed with Vitamin C and dietary fibre.",
        ingredients: "Water, Pink Guava Pulp (22%), Sugar, Iodized Salt, Red Chilli Powder, Black Salt, Acidity Regulator (INS 330), Vitamin C.",
        nutritional: { calories: "56 kcal", carbohydrates: "13.8g", naturalSugar: "11.5g", dietaryFiber: "1.4g", vitaminC: "26mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 20 },
            { size: "Pack of 6 Cans (200ml)", price: 110 },
            { size: "1 Litre Family Pack", price: 75 }
        ],
        colorGradient: "from-pink-500 via-rose-500 to-pink-600",
        accentColor: "#EC4899",
        icon: "eco",
        flavour: "Spiced Pink Guava"
    },
    {
        id: "amul-fruit-masti",
        name: "Amul Fruit Masti Fruitful Delight",
        category: "fruit-juices",
        tag: "With Real Mixed Fruit Juice",
        badge: "Immunity",
        badgeColor: "bg-orange-500",
        price: 20,
        originalPrice: 25,
        rating: 4.8,
        reviewsCount: 390,
        volume: "200ml Can",
        image: "./images/amul-fruit-masti.jpg",
        description: "A harmonious medley of real fruit juices including Apple, Orange, Alphonso Mango, Pink Guava, and Grapes. Loaded with essential antioxidants and natural fruit goodness.",
        ingredients: "Water, Mixed Fruit Juice Concentrate (Apple, Orange, Mango, Guava, Grape 25%), Sugar, Acidity Regulator (INS 330), Vitamin A, C & E.",
        nutritional: { calories: "52 kcal", carbohydrates: "13.0g", naturalSugar: "11.8g", protein: "0.3g", vitaminC: "28mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 20 },
            { size: "Pack of 6 Cans (200ml)", price: 110 },
            { size: "1 Litre Family Pack", price: 75 }
        ],
        colorGradient: "from-rose-400 via-orange-400 to-amber-500",
        accentColor: "#F97316",
        icon: "brightness_7",
        flavour: "Mixed Fruit Delight"
    },
    {
        id: "amul-kesar-milk",
        name: "Amul Kesar Flavoured Milk",
        category: "flavoured-milk",
        tag: "Pure Kashmir Saffron Threads",
        badge: "Royal Special",
        badgeColor: "bg-amber-600",
        price: 25,
        originalPrice: 30,
        rating: 4.8,
        reviewsCount: 510,
        volume: "200ml Can",
        image: "./images/amul-kesar-milk.jpg",
        description: "Infused with genuine Kashmir saffron (Kesar) and pure Amul standardised milk. An auspicious and royal Indian beverage that provides wholesome energy, calcium, and vitality.",
        ingredients: "Standardised Milk, Sugar, Saffron Extract (Kesar Threads), Permitted Stabilizer, Natural Identical Flavours.",
        nutritional: { calories: "90 kcal", carbohydrates: "12.2g", protein: "3.3g", fat: "3.1g", calcium: "125mg" },
        packs: [
            { size: "200 ml Aluminium Can", price: 25 },
            { size: "200 ml Pet Bottle", price: 25 },
            { size: "Pack of 6 Cans", price: 145 }
        ],
        colorGradient: "from-yellow-400 via-amber-500 to-yellow-600",
        accentColor: "#B8860B",
        icon: "grade",
        flavour: "Kashmiri Kesar"
    }
];

const INITIAL_COUPONS = {
    "AMUL20": { code: "AMUL20", discountPercent: 20, desc: "20% Off on All Amul Beverages", active: true },
    "AMUL10": { code: "AMUL10", discountPercent: 10, desc: "10% Instant Savings", active: true },
    "FREESHIP": { code: "FREESHIP", freeShipping: true, desc: "Free Express Delivery", active: true }
};

// Password Hashing Utility
function hashPassword(password, salt) {
    if (!salt) {
        salt = crypto.randomBytes(16).toString('hex');
    }
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

function verifyPassword(password, salt, hash) {
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return checkHash === hash;
}

// Database Class
class AmulDatabase {
    constructor() {
        this.data = {
            users: [],
            products: [],
            orders: [],
            coupons: {}
        };
        this.init();
    }

    init() {
        if (fs.existsSync(DB_FILE)) {
            try {
                const raw = fs.readFileSync(DB_FILE, 'utf8');
                this.data = JSON.parse(raw);
            } catch (err) {
                console.error("Error reading database file, re-initializing:", err);
                this.seed();
            }
        } else {
            this.seed();
        }

        // Always ensure products and coupons exist
        if (!this.data.products || this.data.products.length === 0) {
            this.data.products = INITIAL_PRODUCTS;
            this.save();
        }
        if (!this.data.coupons || Object.keys(this.data.coupons).length === 0) {
            this.data.coupons = INITIAL_COUPONS;
            this.save();
        }
    }

    seed() {
        // Create demo user
        const demoPwd = hashPassword('password123');
        const demoUser = {
            id: "user_" + Date.now(),
            name: "Rahul Sharma",
            email: "rahul@amul.com",
            phone: "9876543210",
            salt: demoPwd.salt,
            passwordHash: demoPwd.hash,
            createdAt: new Date().toISOString()
        };

        this.data = {
            users: [demoUser],
            products: INITIAL_PRODUCTS,
            orders: [],
            coupons: INITIAL_COUPONS
        };
        this.save();
    }

    save() {
        try {
            fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (err) {
            console.error("Error saving database file:", err);
        }
    }

    // --- Users API ---
    findUserByEmailOrPhone(identifier) {
        const id = identifier.trim().toLowerCase();
        return this.data.users.find(u => u.email.toLowerCase() === id || u.phone === id);
    }

    findUserById(userId) {
        return this.data.users.find(u => u.id === userId);
    }

    createUser(name, email, phone, password) {
        const existing = this.findUserByEmailOrPhone(email) || this.findUserByEmailOrPhone(phone);
        if (existing) {
            return { error: "An account with this email or mobile number already exists." };
        }

        const { salt, hash } = hashPassword(password);
        const newUser = {
            id: "user_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            salt: salt,
            passwordHash: hash,
            createdAt: new Date().toISOString()
        };

        this.data.users.push(newUser);
        this.save();

        // Return safe user object (without password hash & salt)
        return { user: this.sanitizeUser(newUser) };
    }

    verifyUser(identifier, password) {
        const user = this.findUserByEmailOrPhone(identifier);
        if (!user) {
            return { error: "Invalid email/mobile or password." };
        }

        const isValid = verifyPassword(password, user.salt, user.passwordHash);
        if (!isValid) {
            return { error: "Invalid email/mobile or password." };
        }

        return { user: this.sanitizeUser(user) };
    }

    sanitizeUser(user) {
        if (!user) return null;
        const { passwordHash, salt, ...safeUser } = user;
        return safeUser;
    }

    // --- Products API ---
    getAllProducts() {
        return this.data.products;
    }

    getProductById(id) {
        return this.data.products.find(p => p.id === id);
    }

    // --- Orders API ---
    createOrder(orderData) {
        const orderId = orderData.orderId || `AMUL-${Math.floor(100000 + Math.random() * 900000)}`;
        const newOrder = {
            id: "ord_" + Date.now(),
            orderId: orderId,
            userId: orderData.userId || "guest",
            customerName: orderData.customerName,
            customerPhone: orderData.customerPhone,
            address: orderData.address,
            paymentMethod: orderData.paymentMethod || "upi",
            items: orderData.items || [],
            totals: orderData.totals || {},
            status: "Order Confirmed",
            estimatedDelivery: "30-45 minutes",
            createdAt: new Date().toISOString()
        };

        this.data.orders.unshift(newOrder); // newest first
        this.save();
        return newOrder;
    }

    getOrders(userId = null) {
        if (userId && userId !== "guest") {
            return this.data.orders.filter(o => o.userId === userId);
        }
        return this.data.orders;
    }

    getOrderById(orderId) {
        return this.data.orders.find(o => o.orderId === orderId || o.id === orderId);
    }

    // --- Coupons API ---
    getCoupon(code) {
        if (!code) return null;
        const upper = code.trim().toUpperCase();
        return this.data.coupons[upper] || null;
    }
}

module.exports = new AmulDatabase();
