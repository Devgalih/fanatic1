-- Update Products Table with New Features
-- Run this script to add new columns to existing products table

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN short_description TEXT,
ADD COLUMN wholesale_price FLOAT,
ADD COLUMN cost_price FLOAT,
ADD COLUMN min_stock INT DEFAULT 0,
ADD COLUMN barcode VARCHAR(255),
ADD COLUMN subcategory_id INT,
ADD COLUMN video_url VARCHAR(500),
ADD COLUMN model VARCHAR(255),
ADD COLUMN has_variations BOOLEAN DEFAULT FALSE,
ADD COLUMN weight FLOAT,
ADD COLUMN length FLOAT,
ADD COLUMN width FLOAT,
ADD COLUMN height FLOAT,
ADD COLUMN meta_title VARCHAR(255),
ADD COLUMN meta_description TEXT,
ADD COLUMN meta_keywords VARCHAR(500),
ADD COLUMN certification VARCHAR(255),
ADD COLUMN brand_registration VARCHAR(255),
ADD COLUMN is_preorder BOOLEAN DEFAULT FALSE,
ADD COLUMN preorder_date DATETIME,
ADD COLUMN is_draft BOOLEAN DEFAULT FALSE;

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(500),
    category_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create product_variations table
CREATE TABLE IF NOT EXISTS product_variations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    sku VARCHAR(255) UNIQUE,
    price FLOAT,
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Add foreign key constraint for subcategory_id
ALTER TABLE products 
ADD CONSTRAINT fk_products_subcategory 
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

-- Insert sample subcategories
INSERT INTO subcategories (name, slug, description, category_id) VALUES
('T-Shirt', 't-shirt', 'Kategori t-shirt', 1),
('Hoodie', 'hoodie', 'Kategori hoodie', 1),
('Jacket', 'jacket', 'Kategori jacket', 1),
('Pants', 'pants', 'Kategori pants', 2),
('Shorts', 'shorts', 'Kategori shorts', 2),
('Jeans', 'jeans', 'Kategori jeans', 2),
('Sneakers', 'sneakers', 'Kategori sneakers', 3),
('Boots', 'boots', 'Kategori boots', 3),
('Sandals', 'sandals', 'Kategori sandals', 3);

-- Update existing products with some sample data
UPDATE products SET 
    short_description = 'Produk berkualitas tinggi dengan desain modern',
    wholesale_price = price * 0.8,
    cost_price = price * 0.6,
    min_stock = 5,
    weight = 300,
    length = 30,
    width = 20,
    height = 5,
    meta_title = CONCAT(name, ' - Dark Chic Emporium'),
    meta_description = CONCAT('Beli ', name, ' dengan kualitas terbaik di Dark Chic Emporium'),
    is_draft = FALSE
WHERE id > 0;
