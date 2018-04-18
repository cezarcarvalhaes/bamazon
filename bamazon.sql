DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (7, 2) default 1.00,
  stock_quantity INT default 10,
  product_sales DECIMAL (9, 2), 
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  product_sales DECIMAL (9, 2),
  over_head_costs DECIMAL (9, 2) default 1.00,
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Unicorn Mask", "Giggles", 21.50, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Russell Crowe's 'The Art of Divorce'", "Literature", 14.99, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VCR", "Electronics", 49.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Party Mix (100g)", "Food and Beverage", 1.50, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whoopie Cushions (25-pack)", "Giggles", 10.50, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("King Lear: William Shakespeare", "Literature", 4.79, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iBook", "Electronics", 99.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("RC Cola 2-liter", "Food and Beverage", 1.50, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stone Cold Steve Austin T-shirt", "Apparrel", 2.50, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Felt Bowler Hat", "Apparrel", 2550.00, 15);


INSERT INTO departments (department_name, product_sales, over_head_costs)
VALUES ("Apparel", 0, 50);

INSERT INTO departments (department_name,  product_sales, over_head_costs)
VALUES ("Food and Beverage",  0, 35);

INSERT INTO departments (department_name,  product_sales, over_head_costs)
VALUES ("Electronics",  0, 75);

INSERT INTO departments (department_name,  product_sales, over_head_costs)
VALUES ("Literature",  0, 15);

INSERT INTO departments (department_name,  product_sales, over_head_costs)
VALUES ("Giggles",  0, 54);
