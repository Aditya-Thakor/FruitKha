# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Retail consumers ordering fresh organic fruit for home delivery, plus store administrators managing inventory, users, and product catalog.

## Product Purpose

Fruitkha provides an accessible online fruit market delivering farm-fresh, seasonal organic produce directly to consumers, paired with an admin management portal for inventory, catalog updates, and user accounts.

## Positioning

Everyday budget-friendly organic produce directly sourced from regional growers, eliminating middlemen to provide affordable freshness and nutritional transparency.

## Operating Context

Consumers browse seasonal collections, inspect fruit nutritional profiles and pricing, and place delivery orders across desktop and mobile web. Store admins monitor real-time stock levels (in stock, low stock, out of stock), maintain catalog details, and oversee registered users.

## Capabilities and Constraints

- Customer storefront: Hero showcase, seasonal fruit collections, shopping catalog with filtering, product details with nutritional data (calories, fat, sugar, carbs, protein), promotional offers, reviews, about, news/blog, and contact.
- Admin portal (`/admin`): Dashboard KPIs, catalog & inventory management (`/admin/products`), user account directory (`/admin/users`).
- Tech stack: React 19 SPA with React Router v7, Bootstrap 5 & custom CSS, Express/Node backend API with MongoDB connection and Fruityvice API proxying.
- Authentication: Client-side session tracking via `localStorage` (`fruitkha_active_user`).

## Brand Commitments

- Name: Fruitkha
- Core messaging: "Fresh & Organic", "Delicious Seasonal Fruits"
- Warm, earthy, trustworthy direct-from-grower fresh market presence.

## Evidence on Hand

- Fully scaffolded React SPA with responsive views, store pages, and admin dashboard.
- Express API server in `api/api.js` with Fruit schema and Fruityvice API bridge.
- Brand logo in `src/assets/images/logo.png` and related imagery in `src/assets/images/`.

## Product Principles

1. Direct-from-Farm Freshness: Connect shoppers directly to regional growers for peak ripeness and budget-friendly pricing.
2. Nutritional Transparency: Give shoppers clear nutritional data (calories, vitamins, macronutrients) alongside pricing.
3. Frictionless Shopping & Admin Control: Maintain effortless browsing and purchasing for shoppers while giving administrators streamlined stock and catalog visibility.
4. Reliable Availability: Provide clear stock and inventory indicators to avoid customer disappointment on seasonal items.
