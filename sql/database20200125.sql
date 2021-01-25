CREATE EXTENSION pgcrypto;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
    id serial PRIMARY KEY,
    user_key uuid unique,
    name varchar(256) unique,
    avatar varchar(256),
    created_at date,
    password text
);

CREATE TABLE activation_codes (
    activation_key varchar(100) unique,
    valid boolean default true
);