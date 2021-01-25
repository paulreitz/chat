CREATE EXTENSION pgcrypto;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
    id serial PRIMARY KEY,
    user_key uuid unique,
    name varchar(256) unique,
    display_name varchar(256),
    avatar varchar(256),
    created_at date,
    password text
);

CREATE TABLE activation_codes (
    activation_key varchar(100) unique,
    valid boolean default true
);

CREATE TYPE auth_action_success AS (
    success boolean,
    name varchar(256),
    display_name varchar(256),
    avatar varchar(256),
    user_key uuid,
    created_at date
);

CREATE TYPE auth_action_failure AS (
    success boolean,
    message text
);