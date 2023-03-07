-- Deploy devBoard:4.addcategory to pg

BEGIN;
-- Créer la table "Category"
CREATE TABLE Category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Ajouter une clé étrangère "category_id" à la table "Post"
ALTER TABLE post ADD COLUMN category_id INTEGER;

-- Créer une contrainte de clé étrangère reliant la colonne "category_id" de la table "Post" à la colonne "id" de la table "Category"
ALTER TABLE post ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES Category (id);


COMMIT;
