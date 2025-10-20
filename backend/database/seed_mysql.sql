-- =============================================
-- Dark Chic Emporium Data Seeder (MySQL)
-- =============================================
-- Created: 2025-10-20
-- Description: Sample data for testing and development (MySQL/MariaDB)
-- =============================================

-- =============================================
-- Seed: users
-- Note: Password is 'admin123' hashed with bcrypt
-- =============================================
INSERT INTO users (email, username, hashed_password, full_name, is_active, is_admin, created_at) VALUES
('admin@darkchic.com', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Admin User', 1, 1, NOW()),
('manager@darkchic.com', 'manager', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Store Manager', 1, 1, NOW()),
('staff@darkchic.com', 'staff', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Staff Member', 1, 0, NOW());

-- =============================================
-- Seed: customers
-- =============================================
INSERT INTO customers (name, email, phone, address, city, province, postal_code, total_orders, total_spent, created_at, last_order_at) VALUES
('Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 15, 7500000.00, NOW(), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Siti Aminah', 'siti.aminah@email.com', '08234567890', 'Jl. Gatot Subroto No. 45', 'Bandung', 'Jawa Barat', '40123', 8, 4200000.00, NOW(), DATE_SUB(NOW(), INTERVAL 5 DAY)),
('Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 12, 6300000.00, NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Dewi Lestari', 'dewi.lestari@email.com', '08456789012', 'Jl. Asia Afrika No. 89', 'Jakarta', 'DKI Jakarta', '10270', 5, 2500000.00, NOW(), DATE_SUB(NOW(), INTERVAL 7 DAY)),
('Eko Prasetyo', 'eko.prasetyo@email.com', '08567890123', 'Jl. Thamrin No. 12', 'Yogyakarta', 'DI Yogyakarta', '55141', 20, 10500000.00, NOW(), DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Fitri Handayani', 'fitri.handayani@email.com', '08678901234', 'Jl. Pemuda No. 34', 'Semarang', 'Jawa Tengah', '50132', 3, 1800000.00, NOW(), DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Gunawan Wijaya', 'gunawan.wijaya@email.com', '08789012345', 'Jl. Ahmad Yani No. 56', 'Medan', 'Sumatera Utara', '20111', 7, 3500000.00, NOW(), DATE_SUB(NOW(), INTERVAL 4 DAY)),
('Hesti Purnama', 'hesti.purnama@email.com', '08890123456', 'Jl. Veteran No. 78', 'Malang', 'Jawa Timur', '65112', 4, 2100000.00, NOW(), DATE_SUB(NOW(), INTERVAL 8 DAY)),
('Irfan Hakim', 'irfan.hakim@email.com', '08901234567', 'Jl. Merdeka No. 90', 'Bali', 'Bali', '80361', 10, 5200000.00, NOW(), DATE_SUB(NOW(), INTERVAL 6 DAY)),
('Julia Rahmawati', 'julia.rahmawati@email.com', '08912345678', 'Jl. Pahlawan No. 111', 'Makassar', 'Sulawesi Selatan', '90111', 6, 3100000.00, NOW(), DATE_SUB(NOW(), INTERVAL 9 DAY));

-- =============================================
-- Seed: categories
-- =============================================
INSERT INTO categories (name, slug, description, image, is_active, created_at) VALUES
('T-Shirts', 't-shirts', 'Premium cotton t-shirts and tops for everyday wear', '/images/category-tshirts.jpg', 1, NOW()),
('Pants', 'pants', 'Stylish pants, joggers, and trousers for modern lifestyle', '/images/category-pants.jpg', 1, NOW()),
('Shoes', 'shoes', 'Comfortable and fashionable footwear for urban explorers', '/images/category-shoes.jpg', 1, NOW()),
('Accessories', 'accessories', 'Complete your look with our curated accessories', '/images/category-accessories.jpg', 1, NOW());

-- =============================================
-- Seed: products (Volume 1, 2, 3)
-- =============================================

-- Volume 1 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Essential Black Tee', 'essential-black-tee', 'Premium cotton t-shirt with a minimalist design. Perfect for everyday wear with superior comfort and durability.', 150000.00, 150000.00, 0, 100, 'DCE-TSHIRT-001', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.8, 2, 'vol 1', 1, 1, 1, NOW()),
('Urban Cargo Pants', 'urban-cargo-pants', 'Modern cargo pants with a streetwear aesthetic. Features multiple pockets and premium fabric for ultimate comfort and style.', 200000.00, 200000.00, 0, 75, 'DCE-PANTS-001', 2, '/images/product-pants.jpg', 'PREFACE', 4.9, 1, 'vol 2', 1, 1, 1, NOW()),
('Shadow Runner Sneakers', 'shadow-runner-sneakers', 'Minimalist black sneakers designed for urban exploration. Combines comfort with sleek aesthetics.', 300000.00, 300000.00, 0, 50, 'DCE-SHOES-001', 3, '/images/product-shoes.jpg', 'PREFACE', 4.7, 1, 'vol 3', 0, 1, 1, NOW()),
('Classic White Tee', 'classic-white-tee', 'Timeless white t-shirt made from premium organic cotton. A wardrobe staple.', 400000.00, 400000.00, 0, 80, 'DCE-TSHIRT-002', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 1', 0, 1, 0, NOW()),
('Slim Fit Joggers', 'slim-fit-joggers', 'Comfortable joggers with a modern slim fit. Perfect for casual wear.', 500000.00, 500000.00, 0, 60, 'DCE-PANTS-002', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 1', 0, 1, 0, NOW()),
('High-Top Sneakers', 'high-top-sneakers', 'Classic high-top design with premium materials and exceptional comfort.', 600000.00, 600000.00, 0, 45, 'DCE-SHOES-002', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 1', 1, 1, 0, NOW());

-- Volume 2 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Vintage Graphic Tee', 'vintage-graphic-tee', 'Retro-inspired graphic tee with vintage aesthetics. Made from soft cotton blend.', 150000.00, 150000.00, 0, 90, 'DCE-TSHIRT-003', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.7, 0, 'vol 2', 0, 1, 0, NOW()),
('Street Denim Pants', 'street-denim-pants', 'Modern denim pants with streetwear influence. Comfortable fit with contemporary styling.', 200000.00, 200000.00, 0, 70, 'DCE-PANTS-003', 2, '/images/product-pants.jpg', 'PREFACE', 4.6, 0, 'vol 2', 0, 1, 0, NOW()),
('Urban Boots', 'urban-boots', 'Stylish urban boots perfect for city exploration. Durable construction meets modern design.', 300000.00, 300000.00, 0, 40, 'DCE-SHOES-003', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 2', 1, 1, 0, NOW()),
('Oversized Hoodie', 'oversized-hoodie', 'Comfortable oversized hoodie with relaxed fit. Perfect for layering or standalone wear.', 400000.00, 400000.00, 0, 65, 'DCE-TSHIRT-004', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.9, 0, 'vol 2', 0, 1, 0, NOW()),
('Tapered Chinos', 'tapered-chinos', 'Smart casual chinos with tapered fit. Versatile for both casual and semi-formal occasions.', 500000.00, 500000.00, 0, 55, 'DCE-PANTS-004', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 2', 0, 1, 0, NOW()),
('Canvas Sneakers', 'canvas-sneakers', 'Classic canvas sneakers with modern comfort technology. Timeless style meets contemporary comfort.', 600000.00, 600000.00, 0, 50, 'DCE-SHOES-004', 3, '/images/product-shoes.jpg', 'PREFACE', 4.4, 0, 'vol 2', 0, 1, 0, NOW());

-- Volume 3 Products
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival, created_at) VALUES
('Minimalist Tank Top', 'minimalist-tank-top', 'Clean minimalist tank top perfect for layering or summer wear. Premium cotton construction.', 150000.00, 150000.00, 0, 85, 'DCE-TSHIRT-005', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 3', 0, 1, 0, NOW()),
('Wide Leg Trousers', 'wide-leg-trousers', 'Contemporary wide leg trousers with flowing silhouette. Perfect for modern street style.', 200000.00, 200000.00, 0, 60, 'DCE-PANTS-005', 2, '/images/product-pants.jpg', 'PREFACE', 4.7, 0, 'vol 3', 0, 1, 0, NOW()),
('Platform Sneakers', 'platform-sneakers', 'Trendy platform sneakers with bold design. Statement piece for fashion-forward individuals.', 300000.00, 300000.00, 0, 35, 'DCE-SHOES-005', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 3', 0, 1, 1, NOW()),
('Long Sleeve Henley', 'long-sleeve-henley', 'Classic henley shirt with long sleeves. Versatile piece for any wardrobe.', 400000.00, 400000.00, 0, 70, 'DCE-TSHIRT-006', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.5, 0, 'vol 3', 0, 1, 0, NOW()),
('Cargo Shorts', 'cargo-shorts', 'Functional cargo shorts with multiple pockets. Perfect for outdoor activities and casual wear.', 500000.00, 500000.00, 0, 75, 'DCE-PANTS-006', 2, '/images/product-pants.jpg', 'PREFACE', 4.4, 0, 'vol 3', 0, 1, 0, NOW()),
('Slip-On Sneakers', 'slip-on-sneakers', 'Convenient slip-on sneakers with elastic panels. Easy to wear with maximum comfort.', 600000.00, 600000.00, 0, 40, 'DCE-SHOES-006', 3, '/images/product-shoes.jpg', 'PREFACE', 4.3, 0, 'vol 3', 0, 1, 0, NOW());

-- =============================================
-- Seed: product_images
-- =============================================
INSERT INTO product_images (product_id, image_url, is_primary, sort_order, created_at) VALUES
-- Essential Black Tee images
(1, '/images/product-tshirt-1.jpg', 1, 1, NOW()),
(1, '/images/product-tshirt-2.jpg', 0, 2, NOW()),
(1, '/images/product-tshirt-3.jpg', 0, 3, NOW()),
-- Urban Cargo Pants images
(2, '/images/product-pants-1.jpg', 1, 1, NOW()),
(2, '/images/product-pants-2.jpg', 0, 2, NOW()),
-- Shadow Runner Sneakers images
(3, '/images/product-shoes-1.jpg', 1, 1, NOW()),
(3, '/images/product-shoes-2.jpg', 0, 2, NOW()),
(3, '/images/product-shoes-3.jpg', 0, 3, NOW()),
(3, '/images/product-shoes-4.jpg', 0, 4, NOW());

-- =============================================
-- Seed: promotions
-- =============================================
INSERT INTO promotions (name, code, description, type, value, max_uses, current_uses, max_uses_per_customer, min_purchase, is_active, start_date, end_date, created_at) VALUES
('Welcome Discount', 'WELCOME10', 'Get 10% off on your first order', 'percentage', 10.00, 1000, 45, 1, 100000.00, 1, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 60 DAY), NOW()),
('Flash Sale', 'FLASH25', '25% off flash sale for limited time', 'percentage', 25.00, 500, 120, 1, 200000.00, 1, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY), NOW()),
('Free Shipping', 'FREESHIP', 'Free shipping on orders above 500k', 'free_shipping', 0, NULL, 85, 1, 500000.00, 1, DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY), NOW()),
('Big Sale', 'BIGSALE50', 'Save 50k on orders above 1 million', 'fixed_amount', 50000.00, 200, 67, 1, 1000000.00, 1, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 25 DAY), NOW()),
('VIP Member', 'VIP15', '15% discount for VIP members', 'percentage', 15.00, NULL, 234, 5, 300000.00, 1, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_ADD(NOW(), INTERVAL 120 DAY), NOW()),
('Weekend Deal', 'WEEKEND20', '20% off weekend special', 'percentage', 20.00, 300, 89, 1, 150000.00, 1, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 2 DAY), NOW()),
('New Customer', 'NEW30', '30k off for new customers', 'fixed_amount', 30000.00, 500, 156, 1, 200000.00, 1, DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_ADD(NOW(), INTERVAL 40 DAY), NOW()),
('Holiday Special', 'HOLIDAY35', '35% off holiday sale', 'percentage', 35.00, 150, 78, 1, 400000.00, 0, DATE_SUB(NOW(), INTERVAL 90 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY), NOW());

-- =============================================
-- Seed: orders
-- =============================================
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, shipping_city, shipping_province, shipping_postal_code, subtotal, shipping_cost, tax, discount, total, status, payment_status, payment_method, notes, created_at, shipped_at, delivered_at) VALUES
-- Recent Orders
('ORD-20251020-001', 'Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 750000.00, 15000.00, 75000.00, 0, 840000.00, 'delivered', 'paid', 'QRIS', 'Please deliver in the morning', DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_SUB(NOW(), INTERVAL 12 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY)),
('ORD-20251020-002', 'Siti Aminah', 'siti.aminah@email.com', '08234567890', 'Jl. Gatot Subroto No. 45', 'Bandung', 'Jawa Barat', '40123', 600000.00, 20000.00, 60000.00, 60000.00, 620000.00, 'delivered', 'paid', 'GoPay', NULL, DATE_SUB(NOW(), INTERVAL 13 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 8 DAY)),
('ORD-20251020-003', 'Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 900000.00, 18000.00, 90000.00, 0, 1008000.00, 'shipped', 'paid', 'BCA', 'Call before delivery', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY), NULL),
('ORD-20251020-004', 'Dewi Lestari', 'dewi.lestari@email.com', '08456789012', 'Jl. Asia Afrika No. 89', 'Jakarta', 'DKI Jakarta', '10270', 450000.00, 15000.00, 45000.00, 45000.00, 465000.00, 'processing', 'paid', 'ShopeePay', NULL, DATE_SUB(NOW(), INTERVAL 3 DAY), NULL, NULL),
('ORD-20251020-005', 'Eko Prasetyo', 'eko.prasetyo@email.com', '08567890123', 'Jl. Thamrin No. 12', 'Yogyakarta', 'DI Yogyakarta', '55141', 1200000.00, 22000.00, 120000.00, 120000.00, 1222000.00, 'pending', 'pending', 'BNI', 'Need invoice for company', DATE_SUB(NOW(), INTERVAL 1 DAY), NULL, NULL),
('ORD-20251020-006', 'Fitri Handayani', 'fitri.handayani@email.com', '08678901234', 'Jl. Pemuda No. 34', 'Semarang', 'Jawa Tengah', '50132', 300000.00, 18000.00, 30000.00, 0, 348000.00, 'delivered', 'paid', 'DANA', NULL, DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_SUB(NOW(), INTERVAL 17 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY)),
('ORD-20251020-007', 'Gunawan Wijaya', 'gunawan.wijaya@email.com', '08789012345', 'Jl. Ahmad Yani No. 56', 'Medan', 'Sumatera Utara', '20111', 550000.00, 25000.00, 55000.00, 0, 630000.00, 'delivered', 'paid', 'BRI', NULL, DATE_SUB(NOW(), INTERVAL 18 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_SUB(NOW(), INTERVAL 13 DAY)),
('ORD-20251020-008', 'Hesti Purnama', 'hesti.purnama@email.com', '08890123456', 'Jl. Veteran No. 78', 'Malang', 'Jawa Timur', '65112', 400000.00, 20000.00, 40000.00, 40000.00, 420000.00, 'cancelled', 'refunded', 'QRIS', 'Customer requested cancellation', DATE_SUB(NOW(), INTERVAL 10 DAY), NULL, NULL),
('ORD-20251020-009', 'Irfan Hakim', 'irfan.hakim@email.com', '08901234567', 'Jl. Merdeka No. 90', 'Bali', 'Bali', '80361', 800000.00, 30000.00, 80000.00, 0, 910000.00, 'delivered', 'paid', 'GoPay', NULL, DATE_SUB(NOW(), INTERVAL 25 DAY), DATE_SUB(NOW(), INTERVAL 22 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY)),
('ORD-20251020-010', 'Julia Rahmawati', 'julia.rahmawati@email.com', '08912345678', 'Jl. Pahlawan No. 111', 'Makassar', 'Sulawesi Selatan', '90111', 650000.00, 28000.00, 65000.00, 65000.00, 678000.00, 'shipped', 'paid', 'BCA', 'Leave at security post if not home', DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 4 DAY), NULL),
('ORD-20251020-011', 'Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 500000.00, 15000.00, 50000.00, 0, 565000.00, 'processing', 'paid', 'DANA', NULL, DATE_SUB(NOW(), INTERVAL 2 DAY), NULL, NULL),
('ORD-20251020-012', 'Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 350000.00, 18000.00, 35000.00, 0, 403000.00, 'pending', 'pending', 'BRI', NULL, NOW(), NULL, NULL);

-- =============================================
-- Seed: order_items
-- =============================================
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES
-- Order 1 items
(1, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
(1, 2, 'Urban Cargo Pants', 200000.00, 1, 200000.00),
(1, 3, 'Shadow Runner Sneakers', 300000.00, 1, 300000.00),
-- Order 2 items
(2, 4, 'Classic White Tee', 400000.00, 1, 400000.00),
(2, 5, 'Slim Fit Joggers', 500000.00, 1, 500000.00),
-- Order 3 items
(3, 6, 'High-Top Sneakers', 600000.00, 1, 600000.00),
(3, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
-- Order 4 items
(4, 7, 'Vintage Graphic Tee', 150000.00, 3, 450000.00),
-- Order 5 items
(5, 10, 'Oversized Hoodie', 400000.00, 2, 800000.00),
(5, 11, 'Tapered Chinos', 500000.00, 1, 500000.00),
-- Order 6 items
(6, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
-- Order 7 items
(7, 8, 'Street Denim Pants', 200000.00, 1, 200000.00),
(7, 7, 'Vintage Graphic Tee', 150000.00, 1, 150000.00),
(7, 5, 'Slim Fit Joggers', 500000.00, 1, 500000.00),
-- Order 8 items
(8, 4, 'Classic White Tee', 400000.00, 1, 400000.00),
-- Order 9 items
(9, 9, 'Urban Boots', 300000.00, 1, 300000.00),
(9, 2, 'Urban Cargo Pants', 200000.00, 1, 200000.00),
(9, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
-- Order 10 items
(10, 12, 'Canvas Sneakers', 600000.00, 1, 600000.00),
(10, 13, 'Minimalist Tank Top', 150000.00, 1, 150000.00),
-- Order 11 items
(11, 14, 'Wide Leg Trousers', 200000.00, 1, 200000.00),
(11, 15, 'Platform Sneakers', 300000.00, 1, 300000.00),
-- Order 12 items
(12, 16, 'Long Sleeve Henley', 400000.00, 1, 400000.00);

-- =============================================
-- Update customer statistics based on orders
-- =============================================
UPDATE customers c
SET 
    total_orders = (
        SELECT COUNT(*) 
        FROM orders 
        WHERE orders.customer_email = c.email
    ),
    total_spent = (
        SELECT COALESCE(SUM(total), 0)
        FROM orders 
        WHERE orders.customer_email = c.email 
        AND payment_status = 'paid'
    ),
    last_order_at = (
        SELECT MAX(created_at)
        FROM orders 
        WHERE orders.customer_email = c.email
    );

-- =============================================
-- End of Seeder
-- =============================================

-- Display summary
SELECT '=== DATABASE SEEDING COMPLETED ===' as message;
SELECT CONCAT('Users: ', COUNT(*)) as summary FROM users;
SELECT CONCAT('Customers: ', COUNT(*)) as summary FROM customers;
SELECT CONCAT('Categories: ', COUNT(*)) as summary FROM categories;
SELECT CONCAT('Products: ', COUNT(*)) as summary FROM products;
SELECT CONCAT('Product Images: ', COUNT(*)) as summary FROM product_images;
SELECT CONCAT('Orders: ', COUNT(*)) as summary FROM orders;
SELECT CONCAT('Order Items: ', COUNT(*)) as summary FROM order_items;
SELECT CONCAT('Promotions: ', COUNT(*)) as summary FROM promotions;

