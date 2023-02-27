-- Deploy devBoard:1.create_tables to pg

BEGIN;

CREATE DOMAIN pint AS int CHECK(VALUE >= 0);

CREATE DOMAIN email_address AS text CHECK( VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

DROP TABLE IF EXISTS "user", skill, post, feed, rss_has_user, user_has_skill;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text,
    lastname text,
    username text NOT NULL UNIQUE,
    email email_address NOT NULL UNIQUE,
    password text NOT NULL,
    image_path VARCHAR(60),
    role text default 'member' 
);
CREATE TABLE skill (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text default '',
    level pint default 0
);
CREATE TABLE post (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL  default '',
    content text NOT NULL default '',
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL,
    "like" pint DEFAULT 0
); 

CREATE TABLE feed (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text default '',
    url VARCHAR(250),
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE feed_has_user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    feed_id int REFERENCES feed(id),
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE user_has_skill(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id int REFERENCES skill(id),
    user_id int REFERENCES "user"(id) ON DELETE CASCADE
);

COMMIT;
