-- =============================================
-- Dark Chic Emporium Data Seeder
-- =============================================
-- Created: 2025-10-20
-- Description: Sample data for testing and development
-- =============================================

-- =============================================
-- Seed: users
-- Note: Password is 'admin123' hashed with bcrypt
-- =============================================
INSERT INTO users (email, username, hashed_password, full_name, is_active, is_admin, created_at) VALUES
('admin@darkchic.com', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Admin User', 1, 1, CURRENT_TIMESTAMP),
('manager@darkchic.com', 'manager', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Store Manager', 1, 1, CURRENT_TIMESTAMP),
('staff@darkchic.com', 'staff', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Staff Member', 1, 0, CURRENT_TIMESTAMP);

-- =============================================
-- Seed: customers
-- =============================================
INSERT INTO customers (name, email, phone, address, city, province, postal_code, total_orders, total_spent, created_at, last_order_at) VALUES
('Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 15, 7500000, CURRENT_TIMESTAMP, DATETIME('now', '-2 days')),
('Siti Aminah', 'siti.aminah@email.com', '08234567890', 'Jl. Gatot Subroto No. 45', 'Bandung', 'Jawa Barat', '40123', 8, 4200000, CURRENT_TIMESTAMP, DATETIME('now', '-5 days')),
('Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 12, 6300000, CURRENT_TIMESTAMP, DATETIME('now', '-1 day')),
('Dewi Lestari', 'dewi.lestari@email.com', '08456789012', 'Jl. Asia Afrika No. 89', 'Jakarta', 'DKI Jakarta', '10270', 5, 2500000, CURRENT_TIMESTAMP, DATETIME('now', '-7 days')),
('Eko Prasetyo', 'eko.prasetyo@email.com', '08567890123', 'Jl. Thamrin No. 12', 'Yogyakarta', 'DI Yogyakarta', '55141', 20, 10500000, CURRENT_TIMESTAMP, DATETIME('now', '-3 days')),
('Fitri Handayani', 'fitri.handayani@email.com', '08678901234', 'Jl. Pemuda No. 34', 'Semarang', 'Jawa Tengah', '50132', 3, 1800000, CURRENT_TIMESTAMP, DATETIME('now', '-10 days')),
('Gunawan Wijaya', 'gunawan.wijaya@email.com', '08789012345', 'Jl. Ahmad Yani No. 56', 'Medan', 'Sumatera Utara', '20111', 7, 3500000, CURRENT_TIMESTAMP, DATETIME('now', '-4 days')),
('Hesti Purnama', 'hesti.purnama@email.com', '08890123456', 'Jl. Veteran No. 78', 'Malang', 'Jawa Timur', '65112', 4, 2100000, CURRENT_TIMESTAMP, DATETIME('now', '-8 days')),
('Irfan Hakim', 'irfan.hakim@email.com', '08901234567', 'Jl. Merdeka No. 90', 'Bali', 'Bali', '80361', 10, 5200000, CURRENT_TIMESTAMP, DATETIME('now', '-6 days')),
('Julia Rahmawati', 'julia.rahmawati@email.com', '08912345678', 'Jl. Pahlawan No. 111', 'Makassar', 'Sulawesi Selatan', '90111', 6, 3100000, CURRENT_TIMESTAMP, DATETIME('now', '-9 days'));

-- =============================================
-- Seed: categories
-- =============================================
INSERT INTO categories (name, slug, description, image, is_active, created_at) VALUES
('T-Shirts', 't-shirts', 'Premium cotton t-shirts and tops for everyday wear', '/images/category-tshirts.jpg', 1, CURRENT_TIMESTAMP),
('Pants', 'pants', 'Stylish pants, joggers, and trousers for modern lifestyle', '/images/category-pants.jpg', 1, CURRENT_TIMESTAMP),
('Shoes', 'shoes', 'Comfortable and fashionable footwear for urban explorers', '/images/category-shoes.jpg', 1, CURRENT_TIMESTAMP),
('Accessories', 'accessories', 'Complete your look with our curated accessories', '/images/category-accessories.jpg', 1, CURRENT_TIMESTAMP);

-- =============================================
-- Seed: products (Volume 1, 2, 3)
-- =============================================

-- Volume 1 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Essential Black Tee', 'essential-black-tee', 'Premium cotton t-shirt with a minimalist design. Perfect for everyday wear with superior comfort and durability.', 150000, 150000, 0, 100, 'DCE-TSHIRT-001', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.8, 2, 'vol 1', 1, 1, 1, CURRENT_TIMESTAMP),
('Urban Cargo Pants', 'urban-cargo-pants', 'Modern cargo pants with a streetwear aesthetic. Features multiple pockets and premium fabric for ultimate comfort and style.', 200000, 200000, 0, 75, 'DCE-PANTS-001', 2, '/images/product-pants.jpg', 'PREFACE', 4.9, 1, 'vol 2', 1, 1, 1, CURRENT_TIMESTAMP),
('Shadow Runner Sneakers', 'shadow-runner-sneakers', 'Minimalist black sneakers designed for urban exploration. Combines comfort with sleek aesthetics.', 300000, 300000, 0, 50, 'DCE-SHOES-001', 3, '/images/product-shoes.jpg', 'PREFACE', 4.7, 1, 'vol 3', 0, 1, 1, CURRENT_TIMESTAMP),
('Classic White Tee', 'classic-white-tee', 'Timeless white t-shirt made from premium organic cotton. A wardrobe staple.', 400000, 400000, 0, 80, 'DCE-TSHIRT-002', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 1', 0, 1, 0, CURRENT_TIMESTAMP),
('Slim Fit Joggers', 'slim-fit-joggers', 'Comfortable joggers with a modern slim fit. Perfect for casual wear.', 500000, 500000, 0, 60, 'DCE-PANTS-002', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 1', 0, 1, 0, CURRENT_TIMESTAMP),
('High-Top Sneakers', 'high-top-sneakers', 'Classic high-top design with premium materials and exceptional comfort.', 600000, 600000, 0, 45, 'DCE-SHOES-002', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 1', 1, 1, 0, CURRENT_TIMESTAMP);

-- Volume 2 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Vintage Graphic Tee', 'vintage-graphic-tee', 'Retro-inspired graphic tee with vintage aesthetics. Made from soft cotton blend.', 150000, 150000, 0, 90, 'DCE-TSHIRT-003', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.7, 0, 'vol 2', 0, 1, 0, CURRENT_TIMESTAMP),
('Street Denim Pants', 'street-denim-pants', 'Modern denim pants with streetwear influence. Comfortable fit with contemporary styling.', 200000, 200000, 0, 70, 'DCE-PANTS-003', 2, '/images/product-pants.jpg', 'PREFACE', 4.6, 0, 'vol 2', 0, 1, 0, CURRENT_TIMESTAMP),
('Urban Boots', 'urban-boots', 'Stylish urban boots perfect for city exploration. Durable construction meets modern design.', 300000, 300000, 0, 40, 'DCE-SHOES-003', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 2', 1, 1, 0, CURRENT_TIMESTAMP),
('Oversized Hoodie', 'oversized-hoodie', 'Comfortable oversized hoodie with relaxed fit. Perfect for layering or standalone wear.', 400000, 400000, 0, 65, 'DCE-TSHIRT-004', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.9, 0, 'vol 2', 0, 1, 0, CURRENT_TIMESTAMP),
('Tapered Chinos', 'tapered-chinos', 'Smart casual chinos with tapered fit. Versatile for both casual and semi-formal occasions.', 500000, 500000, 0, 55, 'DCE-PANTS-004', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 2', 0, 1, 0, CURRENT_TIMESTAMP),
('Canvas Sneakers', 'canvas-sneakers', 'Classic canvas sneakers with modern comfort technology. Timeless style meets contemporary comfort.', 600000, 600000, 0, 50, 'DCE-SHOES-004', 3, '/images/product-shoes.jpg', 'PREFACE', 4.4, 0, 'vol 2', 0, 1, 0, CURRENT_TIMESTAMP);

-- Volume 3 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Minimalist Tank Top', 'minimalist-tank-top', 'Clean minimalist tank top perfect for layering or summer wear. Premium cotton construction.', 150000, 150000, 0, 85, 'DCE-TSHIRT-005', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 3', 0, 1, 0, CURRENT_TIMESTAMP),
('Wide Leg Trousers', 'wide-leg-trousers', 'Contemporary wide leg trousers with flowing silhouette. Perfect for modern street style.', 200000, 200000, 0, 60, 'DCE-PANTS-005', 2, '/images/product-pants.jpg', 'PREFACE', 4.7, 0, 'vol 3', 0, 1, 0, CURRENT_TIMESTAMP),
('Platform Sneakers', 'platform-sneakers', 'Trendy platform sneakers with bold design. Statement piece for fashion-forward individuals.', 300000, 300000, 0, 35, 'DCE-SHOES-005', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 3', 0, 1, 1, CURRENT_TIMESTAMP),
('Long Sleeve Henley', 'long-sleeve-henley', 'Classic henley shirt with long sleeves. Versatile piece for any wardrobe.', 400000, 400000, 0, 70, 'DCE-TSHIRT-006', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.5, 0, 'vol 3', 0, 1, 0, CURRENT_TIMESTAMP),
('Cargo Shorts', 'cargo-shorts', 'Functional cargo shorts with multiple pockets. Perfect for outdoor activities and casual wear.', 500000, 500000, 0, 75, 'DCE-PANTS-006', 2, '/images/product-pants.jpg', 'PREFACE', 4.4, 0, 'vol 3', 0, 1, 0, CURRENT_TIMESTAMP),
('Slip-On Sneakers', 'slip-on-sneakers', 'Convenient slip-on sneakers with elastic panels. Easy to wear with maximum comfort.', 600000, 600000, 0, 40, 'DCE-SHOES-006', 3, '/images/product-shoes.jpg', 'PREFACE', 4.3, 0, 'vol 3', 0, 1, 0, CURRENT_TIMESTAMP);

-- =============================================
-- Seed: product_images
-- =============================================
INSERT INTO product_images (product_id, image_url, is_primary, sort_order, created_at) VALUES
-- Essential Black Tee images
(1, '/images/product-tshirt-1.jpg', 1, 1, CURRENT_TIMESTAMP),
(1, '/images/product-tshirt-2.jpg', 0, 2, CURRENT_TIMESTAMP),
(1, '/images/product-tshirt-3.jpg', 0, 3, CURRENT_TIMESTAMP),
-- Urban Cargo Pants images
(2, '/images/product-pants-1.jpg', 1, 1, CURRENT_TIMESTAMP),
(2, '/images/product-pants-2.jpg', 0, 2, CURRENT_TIMESTAMP),
-- Shadow Runner Sneakers images
(3, '/images/product-shoes-1.jpg', 1, 1, CURRENT_TIMESTAMP),
(3, '/images/product-shoes-2.jpg', 0, 2, CURRENT_TIMESTAMP),
(3, '/images/product-shoes-3.jpg', 0, 3, CURRENT_TIMESTAMP),
(3, '/images/product-shoes-4.jpg', 0, 4, CURRENT_TIMESTAMP);

-- =============================================
-- Seed: promotions
-- =============================================
INSERT INTO promotions (name, code, description, type, value, max_uses, current_uses, max_uses_per_customer, min_purchase, is_active, start_date, end_date, created_at) VALUES
('Welcome Discount', 'WELCOME10', 'Get 10% off on your first order', 'percentage', 10, 1000, 45, 1, 100000, 1, DATETIME('now', '-30 days'), DATETIME('now', '+60 days'), CURRENT_TIMESTAMP),
('Flash Sale', 'FLASH25', '25% off flash sale for limited time', 'percentage', 25, 500, 120, 1, 200000, 1, DATETIME('now', '-7 days'), DATETIME('now', '+7 days'), CURRENT_TIMESTAMP),
('Free Shipping', 'FREESHIP', 'Free shipping on orders above 500k', 'free_shipping', 0, NULL, 85, 1, 500000, 1, DATETIME('now', '-15 days'), DATETIME('now', '+45 days'), CURRENT_TIMESTAMP),
('Big Sale', 'BIGSALE50', 'Save 50k on orders above 1 million', 'fixed_amount', 50000, 200, 67, 1, 1000000, 1, DATETIME('now', '-5 days'), DATETIME('now', '+25 days'), CURRENT_TIMESTAMP),
('VIP Member', 'VIP15', '15% discount for VIP members', 'percentage', 15, NULL, 234, 5, 300000, 1, DATETIME('now', '-60 days'), DATETIME('now', '+120 days'), CURRENT_TIMESTAMP),
('Weekend Deal', 'WEEKEND20', '20% off weekend special', 'percentage', 20, 300, 89, 1, 150000, 1, DATETIME('now', '-2 days'), DATETIME('now', '+2 days'), CURRENT_TIMESTAMP),
('New Customer', 'NEW30', '30k off for new customers', 'fixed_amount', 30000, 500, 156, 1, 200000, 1, DATETIME('now', '-20 days'), DATETIME('now', '+40 days'), CURRENT_TIMESTAMP),
('Holiday Special', 'HOLIDAY35', '35% off holiday sale', 'percentage', 35, 150, 78, 1, 400000, 0, DATETIME('now', '-90 days'), DATETIME('now', '-30 days'), CURRENT_TIMESTAMP);

-- =============================================
-- Seed: orders
-- =============================================
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, shipping_city, shipping_province, shipping_postal_code, subtotal, shipping_cost, tax, discount, total, status, payment_status, payment_method, notes, created_at, shipped_at, delivered_at) VALUES
-- Recent Orders
('ORD-20251020-001', 'Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 750000, 15000, 75000, 0, 840000, 'delivered', 'paid', 'QRIS', 'Please deliver in the morning', DATETIME('now', '-15 days'), DATETIME('now', '-12 days'), DATETIME('now', '-10 days')),
('ORD-20251020-002', 'Siti Aminah', 'siti.aminah@email.com', '08234567890', 'Jl. Gatot Subroto No. 45', 'Bandung', 'Jawa Barat', '40123', 600000, 20000, 60000, 60000, 620000, 'delivered', 'paid', 'GoPay', NULL, DATETIME('now', '-13 days'), DATETIME('now', '-10 days'), DATETIME('now', '-8 days')),
('ORD-20251020-003', 'Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 900000, 18000, 90000, 0, 1008000, 'shipped', 'paid', 'BCA', 'Call before delivery', DATETIME('now', '-5 days'), DATETIME('now', '-2 days'), NULL),
('ORD-20251020-004', 'Dewi Lestari', 'dewi.lestari@email.com', '08456789012', 'Jl. Asia Afrika No. 89', 'Jakarta', 'DKI Jakarta', '10270', 450000, 15000, 45000, 45000, 465000, 'processing', 'paid', 'ShopeePay', NULL, DATETIME('now', '-3 days'), NULL, NULL),
('ORD-20251020-005', 'Eko Prasetyo', 'eko.prasetyo@email.com', '08567890123', 'Jl. Thamrin No. 12', 'Yogyakarta', 'DI Yogyakarta', '55141', 1200000, 22000, 120000, 120000, 1222000, 'pending', 'pending', 'BNI', 'Need invoice for company', DATETIME('now', '-1 day'), NULL, NULL),
('ORD-20251020-006', 'Fitri Handayani', 'fitri.handayani@email.com', '08678901234', 'Jl. Pemuda No. 34', 'Semarang', 'Jawa Tengah', '50132', 300000, 18000, 30000, 0, 348000, 'delivered', 'paid', 'DANA', NULL, DATETIME('now', '-20 days'), DATETIME('now', '-17 days'), DATETIME('now', '-15 days')),
('ORD-20251020-007', 'Gunawan Wijaya', 'gunawan.wijaya@email.com', '08789012345', 'Jl. Ahmad Yani No. 56', 'Medan', 'Sumatera Utara', '20111', 550000, 25000, 55000, 0, 630000, 'delivered', 'paid', 'BRI', NULL, DATETIME('now', '-18 days'), DATETIME('now', '-15 days'), DATETIME('now', '-13 days')),
('ORD-20251020-008', 'Hesti Purnama', 'hesti.purnama@email.com', '08890123456', 'Jl. Veteran No. 78', 'Malang', 'Jawa Timur', '65112', 400000, 20000, 40000, 40000, 420000, 'cancelled', 'refunded', 'QRIS', 'Customer requested cancellation', DATETIME('now', '-10 days'), NULL, NULL),
('ORD-20251020-009', 'Irfan Hakim', 'irfan.hakim@email.com', '08901234567', 'Jl. Merdeka No. 90', 'Bali', 'Bali', '80361', 800000, 30000, 80000, 0, 910000, 'delivered', 'paid', 'GoPay', NULL, DATETIME('now', '-25 days'), DATETIME('now', '-22 days'), DATETIME('now', '-20 days')),
('ORD-20251020-010', 'Julia Rahmawati', 'julia.rahmawati@email.com', '08912345678', 'Jl. Pahlawan No. 111', 'Makassar', 'Sulawesi Selatan', '90111', 650000, 28000, 65000, 65000, 678000, 'shipped', 'paid', 'BCA', 'Leave at security post if not home', DATETIME('now', '-7 days'), DATETIME('now', '-4 days'), NULL),
('ORD-20251020-011', 'Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 500000, 15000, 50000, 0, 565000, 'processing', 'paid', 'DANA', NULL, DATETIME('now', '-2 days'), NULL, NULL),
('ORD-20251020-012', 'Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 350000, 18000, 35000, 0, 403000, 'pending', 'pending', 'BRI', NULL, CURRENT_TIMESTAMP, NULL, NULL);

-- =============================================
-- Seed: order_items
-- =============================================
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES
-- Order 1 items
(1, 1, 'Essential Black Tee', 150000, 2, 300000),
(1, 2, 'Urban Cargo Pants', 200000, 1, 200000),
(1, 3, 'Shadow Runner Sneakers', 300000, 1, 300000),
-- Order 2 items
(2, 4, 'Classic White Tee', 400000, 1, 400000),
(2, 5, 'Slim Fit Joggers', 500000, 1, 500000),
-- Order 3 items
(3, 6, 'High-Top Sneakers', 600000, 1, 600000),
(3, 1, 'Essential Black Tee', 150000, 2, 300000),
-- Order 4 items
(4, 7, 'Vintage Graphic Tee', 150000, 3, 450000),
-- Order 5 items
(5, 10, 'Oversized Hoodie', 400000, 2, 800000),
(5, 11, 'Tapered Chinos', 500000, 1, 500000),
-- Order 6 items
(6, 1, 'Essential Black Tee', 150000, 2, 300000),
-- Order 7 items
(7, 8, 'Street Denim Pants', 200000, 1, 200000),
(7, 7, 'Vintage Graphic Tee', 150000, 1, 150000),
(7, 5, 'Slim Fit Joggers', 500000, 1, 500000),
-- Order 8 items
(8, 4, 'Classic White Tee', 400000, 1, 400000),
-- Order 9 items
(9, 9, 'Urban Boots', 300000, 1, 300000),
(9, 2, 'Urban Cargo Pants', 200000, 1, 200000),
(9, 1, 'Essential Black Tee', 150000, 2, 300000),
-- Order 10 items
(10, 12, 'Canvas Sneakers', 600000, 1, 600000),
(10, 13, 'Minimalist Tank Top', 150000, 1, 150000),
-- Order 11 items
(11, 14, 'Wide Leg Trousers', 200000, 1, 200000),
(11, 15, 'Platform Sneakers', 300000, 1, 300000),
-- Order 12 items
(12, 16, 'Long Sleeve Henley', 400000, 1, 400000);

-- =============================================
-- Update customer statistics based on orders
-- =============================================
UPDATE customers 
SET total_orders = (
    SELECT COUNT(*) 
    FROM orders 
    WHERE orders.customer_email = customers.email
),
total_spent = (
    SELECT COALESCE(SUM(total), 0)
    FROM orders 
    WHERE orders.customer_email = customers.email 
    AND payment_status = 'paid'
),
last_order_at = (
    SELECT MAX(created_at)
    FROM orders 
    WHERE orders.customer_email = customers.email
);

-- =============================================
-- End of Seeder
-- =============================================

-- Display summary
SELECT '=== DATABASE SEEDING COMPLETED ===' as message;
SELECT 'Users: ' || COUNT(*) as summary FROM users;
SELECT 'Customers: ' || COUNT(*) as summary FROM customers;
SELECT 'Categories: ' || COUNT(*) as summary FROM categories;
SELECT 'Products: ' || COUNT(*) as summary FROM products;
SELECT 'Product Images: ' || COUNT(*) as summary FROM product_images;
SELECT 'Orders: ' || COUNT(*) as summary FROM orders;
SELECT 'Order Items: ' || COUNT(*) as summary FROM order_items;
SELECT 'Promotions: ' || COUNT(*) as summary FROM promotions;

