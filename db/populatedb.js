#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    brand VARCHAR (255),
    size VARCHAR (50),
    price NUMERIC (10, 2),
    quantity_in_stock INTEGER DEFAULT 0
);

-- Clear old date
DELETE FROM items;
DELETE FROM categories;

-- Insert categories
INSERT INTO categories (name) VALUES
('Tops'), ('Bottoms'), ('Shoes'), ('Accessories');

-- Insert items (reference categories by id)
INSERT INTO items (name, category_id, brand, size, price, quantity_in_stock) VALUES
('Black T-Shirt', 1, 'Uniqlo', 'M', 19.99, 50),
('Blue Jeans', 2, 'Levi''s', '32', 49.99, 30),
('Running Shoes', 3, 'Nike', '9', 89.99, 20),
('Leather Belt', 4, 'Gucci', 'One Size', 129.99, 10);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done.");
}

main();
