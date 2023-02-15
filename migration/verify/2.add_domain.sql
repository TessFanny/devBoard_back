-- Verify devBoard:2.add_domain on pg

BEGIN;

SELECT EXISTS (
    SELECT 1 
    FROM pg_type 
    WHERE typname = 'pint'
    AND typtype = 'd'
);
SELECT EXISTS (
    SELECT 1 
    FROM pg_type 
    WHERE typname = 'email_address'
    AND typtype = 'd'
);

ROLLBACK;
