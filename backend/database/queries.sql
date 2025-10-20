-- =============================================
-- Common SQL Queries Reference
-- =============================================
-- Useful queries for working with the database
-- =============================================

-- =============================================
-- USERS & AUTHENTICATION
-- =============================================

-- Get all admin users
SELECT id, username, email, full_name, is_admin, created_at
FROM users
WHERE is_admin = 1
ORDER BY created_at DESC;

-- Check user authentication
SELECT id, username, email, hashed_password, is_active, is_admin
FROM users
WHERE email = 'admin@darkchic.com' AND is_active = 1;

-- =============================================
-- CUSTOMERS
-- =============================================

-- Get top customers by spending
SELECT 
    name,
    email,
    total_orders,
    total_spent,
    last_order_at
FROM customers
ORDER BY total_spent DESC
LIMIT 10;

-- Get customers with recent orders
SELECT 
    c.name,
    c.email,
    c.total_orders,
    c.last_order_at,
    CASE 
        WHEN julianday('now') - julianday(c.last_order_at) <= 7 THEN 'Active'
        WHEN julianday('now') - julianday(c.last_order_at) <= 30 THEN 'Recent'
        ELSE 'Inactive'
    END as status
FROM customers c
ORDER BY c.last_order_at DESC;

-- Get customers who haven't ordered recently
SELECT name, email, phone, last_order_at
FROM customers
WHERE julianday('now') - julianday(last_order_at) > 30
ORDER BY last_order_at DESC;

-- =============================================
-- PRODUCTS
-- =============================================

-- Get all active products with category
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock,
    p.rating,
    p.release_tag,
    c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = 1
ORDER BY p.created_at DESC;

-- Get bestselling products
SELECT 
    p.name,
    p.price,
    COUNT(oi.id) as order_count,
    SUM(oi.quantity) as total_sold,
    SUM(oi.subtotal) as revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 10;

-- Get low stock products
SELECT 
    p.name,
    p.sku,
    p.stock,
    c.name as category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.stock < 20 AND p.is_active = 1
ORDER BY p.stock ASC;

-- Get products by release tag
SELECT name, price, stock, rating
FROM products
WHERE release_tag = 'vol 1' AND is_active = 1
ORDER BY name;

-- Get featured products
SELECT 
    p.name,
    p.price,
    p.rating,
    p.reviews_count,
    c.name as category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_featured = 1 AND p.is_active = 1
ORDER BY p.rating DESC;

-- =============================================
-- ORDERS
-- =============================================

-- Get recent orders with totals
SELECT 
    order_number,
    customer_name,
    customer_email,
    total,
    status,
    payment_status,
    created_at
FROM orders
ORDER BY created_at DESC
LIMIT 20;

-- Get order details with items
SELECT 
    o.order_number,
    o.customer_name,
    o.status,
    o.total,
    oi.product_name,
    oi.quantity,
    oi.product_price,
    oi.subtotal
FROM orders o
INNER JOIN order_items oi ON o.id = oi.order_id
WHERE o.order_number = 'ORD-20251020-001';

-- Get orders by status
SELECT 
    status,
    COUNT(*) as count,
    SUM(total) as total_value
FROM orders
GROUP BY status
ORDER BY count DESC;

-- Get pending orders
SELECT 
    order_number,
    customer_name,
    customer_phone,
    total,
    created_at
FROM orders
WHERE status = 'pending'
ORDER BY created_at ASC;

-- Get revenue by payment method
SELECT 
    payment_method,
    COUNT(*) as order_count,
    SUM(total) as total_revenue
FROM orders
WHERE payment_status = 'paid'
GROUP BY payment_method
ORDER BY total_revenue DESC;

-- Get daily sales report
SELECT 
    DATE(created_at) as date,
    COUNT(*) as orders,
    SUM(total) as revenue,
    AVG(total) as avg_order_value
FROM orders
WHERE payment_status = 'paid'
GROUP BY DATE(created_at)
ORDER BY date DESC
LIMIT 30;

-- =============================================
-- ANALYTICS
-- =============================================

-- Sales summary
SELECT 
    COUNT(*) as total_orders,
    COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_orders,
    COUNT(CASE WHEN payment_status = 'pending' THEN 1 END) as pending_orders,
    SUM(CASE WHEN payment_status = 'paid' THEN total ELSE 0 END) as total_revenue,
    AVG(CASE WHEN payment_status = 'paid' THEN total ELSE NULL END) as avg_order_value
FROM orders;

-- Revenue by category
SELECT 
    c.name as category,
    COUNT(oi.id) as items_sold,
    SUM(oi.subtotal) as revenue
FROM categories c
INNER JOIN products p ON c.id = p.category_id
INNER JOIN order_items oi ON p.id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.payment_status = 'paid'
GROUP BY c.id
ORDER BY revenue DESC;

-- Product performance
SELECT 
    p.name,
    p.price,
    p.stock,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as units_sold,
    SUM(oi.subtotal) as revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.payment_status = 'paid'
GROUP BY p.id
ORDER BY revenue DESC
LIMIT 20;

-- =============================================
-- PROMOTIONS
-- =============================================

-- Get active promotions
SELECT 
    code,
    name,
    type,
    value,
    max_uses,
    current_uses,
    min_purchase,
    start_date,
    end_date
FROM promotions
WHERE is_active = 1 
AND (start_date IS NULL OR start_date <= CURRENT_TIMESTAMP)
AND (end_date IS NULL OR end_date >= CURRENT_TIMESTAMP)
ORDER BY created_at DESC;

-- Get promotion usage statistics
SELECT 
    name,
    code,
    type,
    current_uses,
    max_uses,
    CASE 
        WHEN max_uses IS NULL THEN 'Unlimited'
        ELSE ROUND(current_uses * 100.0 / max_uses, 2) || '%'
    END as usage_percentage
FROM promotions
WHERE current_uses > 0
ORDER BY current_uses DESC;

-- =============================================
-- INVENTORY MANAGEMENT
-- =============================================

-- Stock value by category
SELECT 
    c.name as category,
    COUNT(p.id) as product_count,
    SUM(p.stock) as total_units,
    SUM(p.stock * p.price) as inventory_value
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
WHERE p.is_active = 1
GROUP BY c.id
ORDER BY inventory_value DESC;

-- Products needing restock
SELECT 
    p.name,
    p.sku,
    p.stock,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as total_sold
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE p.stock < 30 AND p.is_active = 1
GROUP BY p.id
ORDER BY total_sold DESC, p.stock ASC;

-- =============================================
-- CUSTOMER INSIGHTS
-- =============================================

-- Customer lifetime value
SELECT 
    c.name,
    c.email,
    c.total_orders,
    c.total_spent,
    ROUND(c.total_spent * 1.0 / c.total_orders, 2) as avg_order_value,
    c.last_order_at
FROM customers c
WHERE c.total_orders > 0
ORDER BY c.total_spent DESC;

-- Customer segments
SELECT 
    CASE 
        WHEN total_spent >= 5000000 THEN 'VIP'
        WHEN total_spent >= 2000000 THEN 'Gold'
        WHEN total_spent >= 1000000 THEN 'Silver'
        ELSE 'Bronze'
    END as segment,
    COUNT(*) as customer_count,
    AVG(total_spent) as avg_spending,
    AVG(total_orders) as avg_orders
FROM customers
GROUP BY segment
ORDER BY avg_spending DESC;

-- =============================================
-- DATA CLEANUP & MAINTENANCE
-- =============================================

-- Find orphaned records (products without categories)
SELECT id, name, category_id
FROM products
WHERE category_id IS NULL OR category_id NOT IN (SELECT id FROM categories);

-- Find orders without items
SELECT o.id, o.order_number, o.status
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE oi.id IS NULL;

-- Update product ratings based on reviews
-- (This would need a reviews table implementation)
-- UPDATE products SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = products.id);

-- =============================================
-- BACKUP QUERIES
-- =============================================

-- Export customers for backup
-- .mode csv
-- .output customers_backup.csv
-- SELECT * FROM customers;
-- .output stdout

-- Export orders for backup
-- .mode csv
-- .output orders_backup.csv
-- SELECT * FROM orders;
-- .output stdout

-- =============================================
-- End of Queries Reference
-- =============================================

