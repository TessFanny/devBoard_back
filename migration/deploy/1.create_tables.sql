-- Deploy devBoard:1.create_tables to pg

BEGIN;

DROP TABLE IF EXISTS "user", skill, post, rss_flow, rss_has_user, user_has_skill;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text,
    lastname text,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    image_path VARCHAR(60),
    role text default 'member' 
);
CREATE TABLE skill (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text default '',
    level text default ''
);
CREATE TABLE post (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text default '',
    content text default '',
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NULL,
    "like" int DEFAULT 0
); 

CREATE TABLE rss_flow (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text default '',
    url VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE rss_has_user (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rss_flow_id int REFERENCES rss_flow(id),
    user_id  int REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE user_has_skill(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_id int REFERENCES skill(id),
    user_id int REFERENCES "user"(id) ON DELETE CASCADE
);
COMMIT;
