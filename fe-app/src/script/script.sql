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

CREATE TABLE category (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	image BYTEA NOT NULL
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

CREATE TABLE history(
	id SERIAL NOT NULL,
	details TEXT NOT NULL,
	total FLOAT NOT NULL,
	status VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL
);