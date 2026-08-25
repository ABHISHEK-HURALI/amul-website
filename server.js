// Express Server for Amul Kool & Juices Full-Stack Platform
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5500;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname)));

// --- REST API ROUTES ---

// 1. Health Check Endpoint (useful for cloud monitoring & deployment)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Amul E-Commerce Backend API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 2. Authentication Endpoints
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: 'Please provide all required fields (name, email, phone, password).' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });
        }

        const result = db.createUser(name, email, phone, password);
        if (result.error) {
            return res.status(409).json({ error: result.error });
        }

        return res.status(201).json({
            message: 'Account created successfully!',
            user: result.user
        });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Internal server error during registration.' });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ error: 'Please provide email/mobile and password.' });
        }

        const result = db.verifyUser(identifier, password);
        if (result.error) {
            return res.status(401).json({ error: result.error });
        }

        return res.json({
            message: `Welcome back, ${result.user.name}!`,
            user: result.user
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error during login.' });
    }
});

// 3. Products Catalog Endpoints
app.get('/api/products', (req, res) => {
    try {
        let products = db.getAllProducts();
        const { category, search, sort } = req.query;

        if (category && category !== 'all') {
            products = products.filter(p => p.category === category);
        }

        if (search) {
            const q = search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.tag.toLowerCase().includes(q) ||
                p.flavour.toLowerCase().includes(q)
            );
        }

        if (sort === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            products.sort((a, b) => b.rating - a.rating);
        } else {
            products.sort((a, b) => b.reviewsCount - a.reviewsCount);
        }

        res.json({
            total: products.length,
            products: products
        });
    } catch (err) {
        console.error('Products error:', err);
        res.status(500).json({ error: 'Internal server error fetching products.' });
    }
});

app.get('/api/products/:id', (req, res) => {
    try {
        const product = db.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 4. Orders Management Endpoints
app.post('/api/orders', (req, res) => {
    try {
        const { customerName, customerPhone, address, paymentMethod, items, totals, userId } = req.body;

        if (!customerName || !customerPhone || !address || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required order information or cart is empty.' });
        }

        const newOrder = db.createOrder({
            userId: userId || 'guest',
            customerName,
            customerPhone,
            address,
            paymentMethod,
            items,
            totals
        });

        res.status(201).json({
            message: 'Order placed successfully!',
            order: newOrder
        });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ error: 'Internal server error while placing order.' });
    }
});

app.get('/api/orders', (req, res) => {
    try {
        const userId = req.query.userId;
        const orders = db.getOrders(userId);
        res.json({
            total: orders.length,
            orders: orders
        });
    } catch (err) {
        console.error('Fetch orders error:', err);
        res.status(500).json({ error: 'Internal server error fetching orders.' });
    }
});

app.get('/api/orders/:id', (req, res) => {
    try {
        const order = db.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 5. Coupons Validation Endpoint
app.post('/api/coupons/validate', (req, res) => {
    try {
        const { code } = req.body;
        const coupon = db.getCoupon(code);

        if (!coupon || !coupon.active) {
            return res.status(404).json({ valid: false, message: 'Invalid or expired coupon code. Try AMUL20 or FREESHIP' });
        }

        res.json({
            valid: true,
            coupon: coupon
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Serve frontend on root and all client routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export app for Vercel Serverless environment
module.exports = app;

// Start Server only if run directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`=============================================`);
        console.log(`🍦 Amul Full-Stack E-Commerce Server Running!`);
        console.log(`📍 Local URL: http://localhost:${PORT}`);
        console.log(`💾 Database: Connected (data/database.json)`);
        console.log(`=============================================`);
    });
}
