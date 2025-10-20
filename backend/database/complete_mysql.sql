-- =============================================
-- Dark Chic Emporium - Complete MySQL Database
-- =============================================
-- Single file with schema + sample data
-- Created: 2025-10-20
-- Usage: Import this ONE file in phpMyAdmin
-- =============================================

-- Drop tables if exists (in reverse order due to foreign keys)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS promotions;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;

-- =============================================
-- SCHEMA: Create Tables
-- =============================================

-- Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    is_admin TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Table: customers
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(20),
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_order_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_customers_email ON customers(email);

-- Table: categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(500),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Table: products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    original_price DECIMAL(15,2),
    discount DECIMAL(5,2) DEFAULT 0,
    stock INT DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    category_id INT,
    thumbnail VARCHAR(500),
    brand VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    release_tag VARCHAR(50),
    is_featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    is_new_arrival TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_release_tag ON products(release_tag);
CREATE INDEX idx_products_category_id ON products(category_id);

-- Table: product_images
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary TINYINT(1) DEFAULT 0,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Table: orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(100) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_province VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20),
    subtotal DECIMAL(15,2) NOT NULL,
    shipping_cost DECIMAL(15,2) DEFAULT 0,
    tax DECIMAL(15,2) DEFAULT 0,
    discount DECIMAL(15,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Table: order_items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(15,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Table: promotions
CREATE TABLE promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    type ENUM('percentage', 'fixed_amount', 'free_shipping') NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    max_uses INT,
    current_uses INT DEFAULT 0,
    max_uses_per_customer INT DEFAULT 1,
    min_purchase DECIMAL(15,2) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_is_active ON promotions(is_active);

-- =============================================
-- DATA: Insert Sample Data
-- =============================================

-- Users (Password: admin123)
INSERT INTO users (email, username, hashed_password, full_name, is_active, is_admin) VALUES
('admin@darkchic.com', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Admin User', 1, 1),
('manager@darkchic.com', 'manager', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Store Manager', 1, 1),
('staff@darkchic.com', 'staff', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5Rc3FQ3p3uQ7u', 'Staff Member', 1, 0);

-- Customers
INSERT INTO customers (name, email, phone, address, city, province, postal_code, total_orders, total_spent, last_order_at) VALUES
('Budi Santoso', 'budi.santoso@email.com', '08123456789', 'Jl. Sudirman No. 123', 'Jakarta', 'DKI Jakarta', '12190', 15, 7500000.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Siti Aminah', 'siti.aminah@email.com', '08234567890', 'Jl. Gatot Subroto No. 45', 'Bandung', 'Jawa Barat', '40123', 8, 4200000.00, DATE_SUB(NOW(), INTERVAL 5 DAY)),
('Ahmad Rizki', 'ahmad.rizki@email.com', '08345678901', 'Jl. Diponegoro No. 67', 'Surabaya', 'Jawa Timur', '60265', 12, 6300000.00, DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Dewi Lestari', 'dewi.lestari@email.com', '08456789012', 'Jl. Asia Afrika No. 89', 'Jakarta', 'DKI Jakarta', '10270', 5, 2500000.00, DATE_SUB(NOW(), INTERVAL 7 DAY)),
('Eko Prasetyo', 'eko.prasetyo@email.com', '08567890123', 'Jl. Thamrin No. 12', 'Yogyakarta', 'DI Yogyakarta', '55141', 20, 10500000.00, DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Fitri Handayani', 'fitri.handayani@email.com', '08678901234', 'Jl. Pemuda No. 34', 'Semarang', 'Jawa Tengah', '50132', 3, 1800000.00, DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Gunawan Wijaya', 'gunawan.wijaya@email.com', '08789012345', 'Jl. Ahmad Yani No. 56', 'Medan', 'Sumatera Utara', '20111', 7, 3500000.00, DATE_SUB(NOW(), INTERVAL 4 DAY)),
('Hesti Purnama', 'hesti.purnama@email.com', '08890123456', 'Jl. Veteran No. 78', 'Malang', 'Jawa Timur', '65112', 4, 2100000.00, DATE_SUB(NOW(), INTERVAL 8 DAY)),
('Irfan Hakim', 'irfan.hakim@email.com', '08901234567', 'Jl. Merdeka No. 90', 'Bali', 'Bali', '80361', 10, 5200000.00, DATE_SUB(NOW(), INTERVAL 6 DAY)),
('Julia Rahmawati', 'julia.rahmawati@email.com', '08912345678', 'Jl. Pahlawan No. 111', 'Makassar', 'Sulawesi Selatan', '90111', 6, 3100000.00, DATE_SUB(NOW(), INTERVAL 9 DAY));

-- Categories
INSERT INTO categories (name, slug, description, image, is_active) VALUES
('T-Shirts', 't-shirts', 'Premium cotton t-shirts and tops for everyday wear', '/images/category-tshirts.jpg', 1),
('Pants', 'pants', 'Stylish pants, joggers, and trousers for modern lifestyle', '/images/category-pants.jpg', 1),
('Shoes', 'shoes', 'Comfortable and fashionable footwear for urban explorers', '/images/category-shoes.jpg', 1),
('Accessories', 'accessories', 'Complete your look with our curated accessories', '/images/category-accessories.jpg', 1);

-- Products (18 products across 3 volumes)
INSERT INTO products (name, slug, description, price, original_price, discount, stock, sku, category_id, thumbnail, brand, rating, reviews_count, release_tag, is_featured, is_active, is_new_arrival) VALUES
-- Volume 1
('Essential Black Tee', 'essential-black-tee', 'Premium cotton t-shirt with a minimalist design. Perfect for everyday wear with superior comfort and durability.', 150000.00, 150000.00, 0, 100, 'DCE-TSHIRT-001', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.8, 2, 'vol 1', 1, 1, 1),
('Urban Cargo Pants', 'urban-cargo-pants', 'Modern cargo pants with a streetwear aesthetic. Features multiple pockets and premium fabric for ultimate comfort and style.', 200000.00, 200000.00, 0, 75, 'DCE-PANTS-001', 2, '/images/product-pants.jpg', 'PREFACE', 4.9, 1, 'vol 2', 1, 1, 1),
('Shadow Runner Sneakers', 'shadow-runner-sneakers', 'Minimalist black sneakers designed for urban exploration. Combines comfort with sleek aesthetics.', 300000.00, 300000.00, 0, 50, 'DCE-SHOES-001', 3, '/images/product-shoes.jpg', 'PREFACE', 4.7, 1, 'vol 3', 0, 1, 1),
('Classic White Tee', 'classic-white-tee', 'Timeless white t-shirt made from premium organic cotton. A wardrobe staple.', 400000.00, 400000.00, 0, 80, 'DCE-TSHIRT-002', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 1', 0, 1, 0),
('Slim Fit Joggers', 'slim-fit-joggers', 'Comfortable joggers with a modern slim fit. Perfect for casual wear.', 500000.00, 500000.00, 0, 60, 'DCE-PANTS-002', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 1', 0, 1, 0),
('High-Top Sneakers', 'high-top-sneakers', 'Classic high-top design with premium materials and exceptional comfort.', 600000.00, 600000.00, 0, 45, 'DCE-SHOES-002', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 1', 1, 1, 0),
-- Volume 2
('Vintage Graphic Tee', 'vintage-graphic-tee', 'Retro-inspired graphic tee with vintage aesthetics. Made from soft cotton blend.', 150000.00, 150000.00, 0, 90, 'DCE-TSHIRT-003', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.7, 0, 'vol 2', 0, 1, 0),
('Street Denim Pants', 'street-denim-pants', 'Modern denim pants with streetwear influence. Comfortable fit with contemporary styling.', 200000.00, 200000.00, 0, 70, 'DCE-PANTS-003', 2, '/images/product-pants.jpg', 'PREFACE', 4.6, 0, 'vol 2', 0, 1, 0),
('Urban Boots', 'urban-boots', 'Stylish urban boots perfect for city exploration. Durable construction meets modern design.', 300000.00, 300000.00, 0, 40, 'DCE-SHOES-003', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 2', 1, 1, 0),
('Oversized Hoodie', 'oversized-hoodie', 'Comfortable oversized hoodie with relaxed fit. Perfect for layering or standalone wear.', 400000.00, 400000.00, 0, 65, 'DCE-TSHIRT-004', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.9, 0, 'vol 2', 0, 1, 0),
('Tapered Chinos', 'tapered-chinos', 'Smart casual chinos with tapered fit. Versatile for both casual and semi-formal occasions.', 500000.00, 500000.00, 0, 55, 'DCE-PANTS-004', 2, '/images/product-pants.jpg', 'PREFACE', 4.5, 0, 'vol 2', 0, 1, 0),
('Canvas Sneakers', 'canvas-sneakers', 'Classic canvas sneakers with modern comfort technology. Timeless style meets contemporary comfort.', 600000.00, 600000.00, 0, 50, 'DCE-SHOES-004', 3, '/images/product-shoes.jpg', 'PREFACE', 4.4, 0, 'vol 2', 0, 1, 0),
-- Volume 3
('Minimalist Tank Top', 'minimalist-tank-top', 'Clean minimalist tank top perfect for layering or summer wear. Premium cotton construction.', 150000.00, 150000.00, 0, 85, 'DCE-TSHIRT-005', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.6, 0, 'vol 3', 0, 1, 0),
('Wide Leg Trousers', 'wide-leg-trousers', 'Contemporary wide leg trousers with flowing silhouette. Perfect for modern street style.', 200000.00, 200000.00, 0, 60, 'DCE-PANTS-005', 2, '/images/product-pants.jpg', 'PREFACE', 4.7, 0, 'vol 3', 0, 1, 0),
('Platform Sneakers', 'platform-sneakers', 'Trendy platform sneakers with bold design. Statement piece for fashion-forward individuals.', 300000.00, 300000.00, 0, 35, 'DCE-SHOES-005', 3, '/images/product-shoes.jpg', 'PREFACE', 4.8, 0, 'vol 3', 0, 1, 1),
('Long Sleeve Henley', 'long-sleeve-henley', 'Classic henley shirt with long sleeves. Versatile piece for any wardrobe.', 400000.00, 400000.00, 0, 70, 'DCE-TSHIRT-006', 1, '/images/product-tshirt.jpg', 'PREFACE', 4.5, 0, 'vol 3', 0, 1, 0),
('Cargo Shorts', 'cargo-shorts', 'Functional cargo shorts with multiple pockets. Perfect for outdoor activities and casual wear.', 500000.00, 500000.00, 0, 75, 'DCE-PANTS-006', 2, '/images/product-pants.jpg', 'PREFACE', 4.4, 0, 'vol 3', 0, 1, 0),
('Slip-On Sneakers', 'slip-on-sneakers', 'Convenient slip-on sneakers with elastic panels. Easy to wear with maximum comfort.', 600000.00, 600000.00, 0, 40, 'DCE-SHOES-006', 3, '/images/product-shoes.jpg', 'PREFACE', 4.3, 0, 'vol 3', 0, 1, 0);

-- Product Images
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
(1, '/images/product-tshirt-1.jpg', 1, 1),
(1, '/images/product-tshirt-2.jpg', 0, 2),
(1, '/images/product-tshirt-3.jpg', 0, 3),
(2, '/images/product-pants-1.jpg', 1, 1),
(2, '/images/product-pants-2.jpg', 0, 2),
(3, '/images/product-shoes-1.jpg', 1, 1),
(3, '/images/product-shoes-2.jpg', 0, 2),
(3, '/images/product-shoes-3.jpg', 0, 3),
(3, '/images/product-shoes-4.jpg', 0, 4);

-- Promotions
INSERT INTO promotions (name, code, description, type, value, max_uses, current_uses, max_uses_per_customer, min_purchase, is_active, start_date, end_date) VALUES
('Welcome Discount', 'WELCOME10', 'Get 10% off on your first order', 'percentage', 10.00, 1000, 45, 1, 100000.00, 1, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 60 DAY)),
('Flash Sale', 'FLASH25', '25% off flash sale for limited time', 'percentage', 25.00, 500, 120, 1, 200000.00, 1, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 7 DAY)),
('Free Shipping', 'FREESHIP', 'Free shipping on orders above 500k', 'free_shipping', 0, NULL, 85, 1, 500000.00, 1, DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY)),
('Big Sale', 'BIGSALE50', 'Save 50k on orders above 1 million', 'fixed_amount', 50000.00, 200, 67, 1, 1000000.00, 1, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 25 DAY)),
('VIP Member', 'VIP15', '15% discount for VIP members', 'percentage', 15.00, NULL, 234, 5, 300000.00, 1, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_ADD(NOW(), INTERVAL 120 DAY)),
('Weekend Deal', 'WEEKEND20', '20% off weekend special', 'percentage', 20.00, 300, 89, 1, 150000.00, 1, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 2 DAY)),
('New Customer', 'NEW30', '30k off for new customers', 'fixed_amount', 30000.00, 500, 156, 1, 200000.00, 1, DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_ADD(NOW(), INTERVAL 40 DAY)),
('Holiday Special', 'HOLIDAY35', '35% off holiday sale', 'percentage', 35.00, 150, 78, 1, 400000.00, 0, DATE_SUB(NOW(), INTERVAL 90 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY));

-- Orders
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, shipping_city, shipping_province, shipping_postal_code, subtotal, shipping_cost, tax, discount, total, status, payment_status, payment_method, notes, created_at, shipped_at, delivered_at) VALUES
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

-- Order Items
INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal) VALUES
(1, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
(1, 2, 'Urban Cargo Pants', 200000.00, 1, 200000.00),
(1, 3, 'Shadow Runner Sneakers', 300000.00, 1, 300000.00),
(2, 4, 'Classic White Tee', 400000.00, 1, 400000.00),
(2, 5, 'Slim Fit Joggers', 500000.00, 1, 500000.00),
(3, 6, 'High-Top Sneakers', 600000.00, 1, 600000.00),
(3, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
(4, 7, 'Vintage Graphic Tee', 150000.00, 3, 450000.00),
(5, 10, 'Oversized Hoodie', 400000.00, 2, 800000.00),
(5, 11, 'Tapered Chinos', 500000.00, 1, 500000.00),
(6, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
(7, 8, 'Street Denim Pants', 200000.00, 1, 200000.00),
(7, 7, 'Vintage Graphic Tee', 150000.00, 1, 150000.00),
(7, 5, 'Slim Fit Joggers', 500000.00, 1, 500000.00),
(8, 4, 'Classic White Tee', 400000.00, 1, 400000.00),
(9, 9, 'Urban Boots', 300000.00, 1, 300000.00),
(9, 2, 'Urban Cargo Pants', 200000.00, 1, 200000.00),
(9, 1, 'Essential Black Tee', 150000.00, 2, 300000.00),
(10, 12, 'Canvas Sneakers', 600000.00, 1, 600000.00),
(10, 13, 'Minimalist Tank Top', 150000.00, 1, 150000.00),
(11, 14, 'Wide Leg Trousers', 200000.00, 1, 200000.00),
(11, 15, 'Platform Sneakers', 300000.00, 1, 300000.00),
(12, 16, 'Long Sleeve Henley', 400000.00, 1, 400000.00);

-- =============================================
-- Display Summary
-- =============================================
SELECT '=== DATABASE SETUP COMPLETED ===' as message;
SELECT CONCAT('✓ Users: ', COUNT(*)) as summary FROM users;
SELECT CONCAT('✓ Customers: ', COUNT(*)) as summary FROM customers;
SELECT CONCAT('✓ Categories: ', COUNT(*)) as summary FROM categories;
SELECT CONCAT('✓ Products: ', COUNT(*)) as summary FROM products;
SELECT CONCAT('✓ Product Images: ', COUNT(*)) as summary FROM product_images;
SELECT CONCAT('✓ Orders: ', COUNT(*)) as summary FROM orders;
SELECT CONCAT('✓ Order Items: ', COUNT(*)) as summary FROM order_items;
SELECT CONCAT('✓ Promotions: ', COUNT(*)) as summary FROM promotions;

-- Show default admin account
SELECT '=== DEFAULT LOGIN ===' as message;
SELECT username, email, 'admin123' as password, 
       CASE WHEN is_admin = 1 THEN 'Admin' ELSE 'Staff' END as role 
FROM users;

-- =============================================
-- END OF FILE
-- =============================================

