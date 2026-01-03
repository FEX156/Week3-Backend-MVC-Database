CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES Products(product_id),
    quantity INT NOT NULL,
    location VARCHAR(255)
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrderDetails (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES Orders(order_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
    quantity INT NOT NULL
);

-- INSERT KE PRODUCTS
INSERT INTO Products (product_name, category, price)
VALUES 
    ('Laptop', 'Elektronik', 999.99),
    ('Meja Kursi', 'Perabot', 199.99),
    ('Printer', 'Elektronik', 299.99),
    ('Rak Buku', 'Perabot', 149.99);

SELECT product_name, price FROM Products
ORDER BY price DESC;

-- INSERT KE INVENTORY
INSERT INTO  Inventory (product_id, quantity, location)
VALUES
    (1, 50, 'Gudang A'),
    (2, 30, 'Gudang B'),
    (3, 20, 'Gudang A'),
    (4, 40, 'Gudang B');

SELECT 
    p.product_name,
    i.quantity,
    i.location
FROM Inventory i
JOIN Products p ON p.product_id = i.product_id;


-- SELECT 
--     product_name,
--     quantity,
--     location
-- FROM Inventory 
-- JOIN Products ON Products.product_id = Inventory.product_id;


UPDATE Products
SET price = 1099.99
WHERE product_name = 'Laptop';


SELECT 
    i.location,
    SUM(i.quantity * p.price) AS total_value
FROM Inventory i
JOIN Products p ON p.product_id = i.product_id
GROUP BY i.location;

INSERT INTO Orders (order_id, customer_id, order_date)
VALUES
    (1, 101, '2024-08-12'),
    (2, 102, '2024-08-13');


INSERT INTO OrderDetails (order_detail_id, order_id, product_id, quantity)
VALUES
    (1, 1, 1, 2),
    (2, 1, 3, 1),
    (3, 2, 2, 1),
    (4, 2, 4, 2);

SELECT
    o.order_id,
    o.order_date,
    SUM(od.quantity * p.price) AS total_amount
FROM Orders o
JOIN OrderDetails od ON o.order_id = od.order_id
JOIN Products p ON p.product_id = od.product_id
GROUP BY o.order_id, o.order_date
ORDER BY o.order_id;


SELECT 
    p.product_id,
    p.product_name
FROM Products p
LEFT JOIN OrderDetails od ON p.product_id = od.product_id
WHERE od.product_id IS NULL;

CREATE VIEW current_inventory AS
SELECT 
    p.product_name,
    i.quantity,
    i.location
FROM Inventory i
JOIN Products p ON p.product_id = i.product_id;
