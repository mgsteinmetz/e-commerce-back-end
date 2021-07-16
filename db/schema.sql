-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- ADDING TABLES
CREATE TABLE Category (
    id INTEGER NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Product (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
        validate: {
            DECIMAL = true;
        },
    stock INTEGER NOT NULL,
        default: {
            value: 10;
        },
        validate: {
            INTEGER = true;
        },
    category_id INTEGER,
        references: {
            model: Category,
            id: category_id
        },
    PRIMARY KEY (id)
);

CREATE TABLE Tag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE ProductTag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_id INTEGER,
        references: {
            model: Product,
            id: product_id
        },
    tag_id INTEGER,
        references: {
            model: Tag,
            id: tag_id
        },
    PRIMARY KEY (id)
);