-- Deploy devBoard:4.add_github_id_col to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN githubId INT DEFAULT NULL;

COMMIT;
