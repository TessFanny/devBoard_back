-- Revert devBoard:3.create_index from pg

BEGIN;

 DROP INDEX index_like; 
-- DROP INDEX index_created_at
COMMIT;
