CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name varchar(25) NOT NULL,
    department_name varchar(25),
    price float(10,2),
    stock_quantity int
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Thing", "Things", 100.00, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Stuff", "Stuff", 4.99, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Other", "Misc.", 20.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Battle Necks", "Candy", 0.30, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Dummies", "Candy", 0.10, 1000);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Fingies Squares", "Candy", 0.50, 9);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Cheese-Thing", "Snack", 2.99, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Tire", "Auto", 150.00, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Big Crunch", "Gum", .99, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Creed", "Bad Music", 0.00, 0);

USE bamazon;
select * from products;