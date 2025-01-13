DROP TABLE IF EXISTS "placed_order";
DROP TABLE IF EXISTS "shipping";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "item",
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "user";

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
	title VARCHAR(255) NOT NULL,
	image_data BYTEA NOT NULL,
	price FLOAT NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
	category_id INT NOT NULL,

	CONSTRAINT fk_category 
		FOREIGN KEY (category_id)
			REFERENCES "category"(id)
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
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	CONSTRAINT fk_shipping
		FOREIGN KEY (shipping_id)
			REFERENCES "shipping"(id)
);