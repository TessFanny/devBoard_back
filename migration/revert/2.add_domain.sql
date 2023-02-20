-- Revert devBoard:2.add_domain from pg

BEGIN;

ALTER TABLE post
ALTER COLUMN "like" TYPE int;

DROP DOMAIN pint;

ALTER TABLE "user"
ALTER COLUMN email TYPE text; 

DROP DOMAIN email_address;

COMMIT;
