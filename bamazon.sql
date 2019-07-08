CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name varchar(25) NOT NULL,
    department_name varchar(25),
    price float(10,2),
    stock_quantity int
);