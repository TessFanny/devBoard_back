-- Revert devBoard:1.create_tables from pg
-- Deploy devBoard:1.create_tables to pg

BEGIN;

DROP TABLE  "user", skill, post, rss_flow, rss_has_user, user_has_skill;

COMMIT;