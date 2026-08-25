# Amul Kool & Juices E-Commerce Platform

A premium, interactive full-stack e-commerce experience showcasing Amul Kool and juice beverages. Built with a rich GSAP scroll-based animation, user authentication, a cart system, checkout flow, and a Node.js Express backend.

## 🚀 Features

- **Interactive Canvas Experience**: Smooth scroll-based frame-by-frame bottle animation powered by GSAP and ScrollTrigger.
- **Product Catalog**: Real Amul juices and flavoured milk varieties with detailed ingredients, nutrition facts, and customizable pack sizes.
- **Persistent Cart & Checkout**: Fully functional cart management with automatic subtotal, tax, coupon validation (`AMUL20`, `AMUL10`, `FREESHIP`), and order creation.
- **Express Backend API**: REST endpoints for health checks, user registration/login, products, order management, and coupon validation.
- **Stateless/Vercel Compatibility**: Configured to run flawlessly on Vercel Serverless Functions with a self-seeding temporary file database.
- **Graceful Client-Side Fallback**: If the API server is offline or unreachable, the frontend automatically falls back to `localStorage` for database operations, ensuring a resilient user experience.

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
The server will run at [http://localhost:5500](http://localhost:5500).

---

## ☁️ Deploying to Vercel

This repository has been fully configured for one-click deployment to Vercel:

1. **GitHub Integration**: Connect this repository to your Vercel account.
2. **Framework Preset**: Vercel will automatically detect the settings from `vercel.json`.
3. **Database Portability**: The database automatically switches to `/tmp/database.json` and copies default seed data when deployed on Vercel to prevent read-only filesystem issues.