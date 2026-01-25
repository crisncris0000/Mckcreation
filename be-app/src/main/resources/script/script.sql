DROP TABLE IF EXISTS "placed_order";
DROP TABLE IF EXISTS "shipping";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "item";
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "post";

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password TEXT NOT NULL,
	role VARCHAR(50) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

CREATE TABLE "category" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE "item" (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL UNIQUE,
	image_data BYTEA NOT NULL,
	price FLOAT NOT NULL,
	sold INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
	category_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_category 
		FOREIGN KEY (category_id)
			REFERENCES "category"(id)
);

CREATE TABLE "order" (
	id SERIAL PRIMARY KEY,
	item_title VARCHAR(100) NOT NULL,
	customization TEXT NOT NULL,
	price FLOAT NOT NULL,
	category_id INT NOT NULL,
	user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES "user"(id),
	CONSTRAINT fk_category
		FOREIGN KEY(category_id)
			REFERENCES "category"(id)
);

CREATE TABLE "shipping" (
	id SERIAL PRIMARY KEY,
	address VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	zip_code VARCHAR(10) NOT NULL,
	user_id INT,
	
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES "user"(id)
);

CREATE TABLE "placed_order" (
	id SERIAL NOT NULL,
	order_details TEXT NOT NULL,
	total FLOAT NOT NULL,
	status VARCHAR(100) NOT NULL,
	shipping_id INT NOT NULL,
	user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_shipping
		FOREIGN KEY (shipping_id)
			REFERENCES "shipping"(id),

	CONSTRAINT fk_user
		FOREIGN KEY (user_id)
			REFERENCES "user"(id)
);

CREATE TABLE "post" (
	id SERIAL NOT NULL,
	image_data BYTEA NOT NULL,
	mime_type VARCHAR(100) NOT NULL
);

INSERT INTO "user" (first_name, last_name, email, password, role, created_at, updated_at)
VALUES('Christopher', 'Rivera', 
'christopherrivera384@gmail.com',
'$2y$10$0Fezfh9eKeoaQyr58QcN0.pcQdh8/VZhlGRsPHNg9/NzLF3trZ13a',
'ROLE_ADMIN',
CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

INSERT INTO "shipping" (address, state, city, zip_code, user_id)
VALUES('123 Elmo Street', 'New York', 'New York', 10038, 1);

SELECT first_name, last_name, address, city, state, zip_code
FROM "user" INNER JOIN shipping ON "user".id = shipping.user_id;

INSERT INTO "category" (name)
VALUES ('All'), ('Clothing'), ('Accessories'), ('Home Decor');

INSERT INTO "order" (id, item_title, customization, price, category_id, user_id, created_at, updated_at)
VALUES 
(1, 'T-Shirt', 'Medium, White', 20.0, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Socks', 'Black, Size M', 10.0, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Hoodie', 'Large, Navy Blue', 30.0, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Jeans', 'Black, Slim Fit', 40.0, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Pants', 'Khaki, Relaxed Fit', 35.0, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Dress Shirt', 'White, Long Sleeve', 25.0, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Jacket', 'Brown, Leather', 50.0, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Shoes', 'Black, Size 10', 60.0, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Hat', 'Red, Fitted', 15.0, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Watch', 'Silver, Leather Strap', 70.0, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Phone Case', 'White, Slim Fit', 12.0, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO "item"
(title, image_data, price, sold, mime_type, category_id, created_at, updated_at)
VALUES
-- Clothing (category_id = 2)
('Classic T-Shirt', decode('DEADBEEF','hex'), 20.00, 5, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Graphic Tee', decode('DEADBEEF','hex'), 22.00, 3, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hoodie', decode('DEADBEEF','hex'), 45.00, 8, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Crewneck Sweater', decode('DEADBEEF','hex'), 38.00, 2, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Denim Jacket', decode('DEADBEEF','hex'), 65.00, 6, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Joggers', decode('DEADBEEF','hex'), 30.00, 4, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cargo Pants', decode('DEADBEEF','hex'), 42.00, 7, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Flannel Shirt', decode('DEADBEEF','hex'), 28.00, 3, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tank Top', decode('DEADBEEF','hex'), 18.00, 1, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Winter Coat', decode('DEADBEEF','hex'), 120.00, 9, 'image/png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Accessories (category_id = 3)
('Leather Wallet', decode('DEADBEEF','hex'), 25.00, 12, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Baseball Cap', decode('DEADBEEF','hex'), 15.00, 10, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Beanie', decode('DEADBEEF','hex'), 14.00, 6, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sunglasses', decode('DEADBEEF','hex'), 35.00, 8, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Silver Necklace', decode('DEADBEEF','hex'), 55.00, 5, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Leather Belt', decode('DEADBEEF','hex'), 22.00, 4, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Watch', decode('DEADBEEF','hex'), 95.00, 11, 'image/png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Home Decor (category_id = 4)
('Decorative Vase', decode('DEADBEEF','hex'), 40.00, 2, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Wall Art Print', decode('DEADBEEF','hex'), 60.00, 7, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Throw Pillow', decode('DEADBEEF','hex'), 25.00, 3, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Scented Candle', decode('DEADBEEF','hex'), 18.00, 9, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Table Lamp', decode('DEADBEEF','hex'), 85.00, 4, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Wall Clock', decode('DEADBEEF','hex'), 55.00, 6, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Picture Frame', decode('DEADBEEF','hex'), 20.00, 1, 'image/png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

