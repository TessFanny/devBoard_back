-- Revert devBoard:4.add_github_id_col from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN githubid;

COMMIT;
