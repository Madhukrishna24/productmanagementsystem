-- SQL query for audit_trails --

CREATE TABLE audit_trails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

--SQL query for notifications --

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    requestId INT NOT NULL,
    FOREIGN KEY (adminId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (requestId) REFERENCES product_requests(id) ON DELETE CASCADE
);

-- SQL query for product_requests --

CREATE TABLE product_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    status VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);


-- SQL query for products --

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    stock_quantity INT NOT NULL,
    manufacturer VARCHAR(255),
    release_date DATE,
    rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SQL query for user product list itemes --

CREATE TABLE user_product_list_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listId INT NOT NULL,
    productId INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listId) REFERENCES user_product_lists(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);


-- SQL query for user product list --

CREATE TABLE user_product_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- SQL query for users --

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
