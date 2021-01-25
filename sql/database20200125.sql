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

CREATE or replace function createUser(userName varchar(256), userPass text, activationKey varchar(100))
returns json as $createUser$
declare
    result json;
    createdAt date = now();
    userKey uuid = uuid_generate_v4();
    foundUser record;
    foundCode record;
begin
    select * from users into foundUser where name=userName or user_key=userKey;
    if not found then
        select * from activation_codes into foundCode where activation_key=activationKey and valid=true;
        if not found then
            result = row_to_json(row(false, 'Invalid activation code')::auth_action_failure);
        else
            insert into users (user_key, name, display_name, avatar, created_at, password) VALUES (userKey, userName, userName, 'default.jpg', createdAt, crypt(userPass, gen_salt('bf')));
            update activation_codes set valid=false where activation_key=activation_key;
            result = row_to_json(row(true, userName, userName, 'default.jpg', userKey, createdAt)::auth_action_success);
        end if;
    else
        result = row_to_json(row(false, 'Username already in use')::auth_action_failure);
    end if;
    return result;
end;
$createUser$ language plpgsql;