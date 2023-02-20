-- Verify devBoard:1.create_tables on pg

BEGIN;

SELECT * FROM "user";
SELECT * FROM "skill";
SELECT * FROM "post";
SELECT * FROM "rss_flow";
SELECT * FROM "rss_has_user";
SELECT * FROM "user_has_skill";

ROLLBACK;
