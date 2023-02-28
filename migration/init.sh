## A lancer DANS LE REPERTOIRE MIGRATION !!!!


# je prends l'identité de devboard
export PGUSER=postgres

# je supprime la BDD
dropdb devboard

# # je supprime l'utilisateur si il existe 
dropuser admin_devboard

# je veux lancer le script pour la creation du rôle et de la db
psql -f init_db.sql -d devboard

# j'initialise SQITCH
sqitch init devBoard --engine pg --target db:pg:devboard


