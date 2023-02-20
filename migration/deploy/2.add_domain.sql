-- Deploy devBoard:2.add_domain to pg

BEGIN;

-- le domain pint contiendra les entiers positifs (tous les nombres supérieurs à zéro)
-- mon domaine va permettre de venir effectuer une vérification dans les colonnes dont le type est pint

CREATE DOMAIN pint AS int CHECK(VALUE >= 0);

ALTER TABLE post
ALTER COLUMN "like" TYPE pint;  

CREATE DOMAIN email_address AS text CHECK( VALUE ~  '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

ALTER TABLE "user"
ALTER COLUMN email TYPE email_address; 

COMMIT;
