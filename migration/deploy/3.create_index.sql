-- Deploy devBoard:3.create_index to pg

BEGIN;

CREATE INDEX index_like ON post USING hash ("like");

-- CREATE INDEX created_at ON post(created_at);

COMMIT;
