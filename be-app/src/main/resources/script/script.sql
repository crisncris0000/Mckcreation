DROP TABLE IF EXISTS "placed_orders";
DROP TABLE IF EXISTS "shipping";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password TEXT NOT NULL,
	is_admin BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

CREATE TABLE "category" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    image_data BYTEA NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
);

CREATE TABLE "order" (
	id SERIAL PRIMARY KEY,
	customize TEXT NOT NULL,
	price FLOAT NOT NULL,
	category_id INT NOT NULL,
	user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_user 
		FOREIGN KEY(user_id)
			REFERENCES "user"(id),
	CONSTRAINT fk_catrgory
		FOREIGN KEY(category_id)
			REFERENCES "order"(id)
);

CREATE TABLE "shipping" (
	id SERIAL PRIMARY KEY,
	address VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	zip_code VARCHAR(10)
);

CREATE TABLE "placed_orders" (
	id SERIAL NOT NULL,
	order_details TEXT NOT NULL,
	total FLOAT NOT NULL,
	status VARCHAR(100) NOT NULL,
	shipping_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_shipping
		FOREIGN KEY (shipping_id)
			REFERENCES "shipping"(id)
);