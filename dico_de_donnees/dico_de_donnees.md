# Dictionnaire de données

A partir du Modèle Logique de Données / MLD, nous pouvons rédiger un _dictionnaire de données_ **listant l'ensemble des tables, des champs qui les composent, et des relations qui les lient**.

1. Tout d'abord, nous listons chacune des **tables** présentes dans le MLD.

2. Ensuite, pour chaque table, nous listons chaque **information / champ** qui la compose.

3. Puis, pour chaque champ, nous allons :
    - Indiquer son **type** (nombre, texte, booléen, calculé à partir d'autres informations...)
    - Définir ses **spécificités** ou contraintes (clé primaire, auto-incrémenté, unique, non nul...)
    - Ajouter une **description**
    - Ajouter un **commentaire** si besoin

> :warning: Pour les types et spécificités des champs, nous avons décidé dans notre exemple de nous baser sur le [Système de Gestion de Bases de Données Relationnelles] postgresql.

1. Enfin, nous rapportons les relations entre les tables :
    - Pour les relations dont les cardinalités sont (0,1) (1,1) (0,n) (1,n), il faut définir quelle table contient la clé étrangère faisant la liaison entre les deux tables ;
    - Pour les relations dont les cardinalités sont de type (n,n), il faut créer une table d'association entre les deux tables.

## Exemple de dictionnaire de données avec nos livres (cf. [fiche recap MCD](./conception-03-mcd.md#association-binaire-ternaire-n-aire) et [fiche recap MLD](./conception-04-mld.md#ecriture))



### Table _user_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_user | INT | PRIMARY KEY, NOT NULL | L'identifiant de l'utilisateur |
| firstname | TEXT | ------- | Prénom de l'utilisateur |
| lastname | TEXT | -------| Nom de l'utilisateur|
| username | TEXT | NOT NULL | Pseudo de l'utilisateur |
| email | TEXT | NOT NULL | Email de l'utilisateur |
| password| TEXT | NOT NULL| Mot de passe de l'utilisateur |
| role | TEXT | DEFAULT 'member'| Le rôle de l'utilisateur |


### Table _skill_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_skill | INT | PRIMARY KEY, NOT NULL | L'identifiant de la compétence |
| name | TEXT  | DEFAULT '' | nom de la compétence |
| level | INT | -------| Niveau de la compétence|


### Table _post_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_post | INT | PRIMARY KEY, NOT NULL | L'identifiant du post |
| title | TEXT | ----- | Titre du post |
| content | TEXT | -------| Contenu du post|
| code_user | INT | REFERENCES "user"(id)| L'identifiant de l'utilisateur |
| created_at | TIMESTAMPTZ  | DEFAULT NOW() | Date de création |
| updated_at| TIMESTAMPTZ  | DEFAULT NULL| Date de mise à jour |
| like | int | DEFAULT 0 | Nombre de like d'un post|

> Le champ *code_user* correspond à la clé étrangère permettant de faire la relation entre la table *user* et la table *post*.
>
> > _Pourquoi cette clé étrangère ici ?_ Dans notre exemple, un post ne peut être crée que par une et une seule personne tandis qu'une personne peut avoir crée plusieurs posts. La **table porteuse de la relation** est par conséquent la table _post_ puisqu'elle ne fait référence qu'à une et une seule entrée de la table _user_ (cf. [règle n°2 du MLD](./conception-04-mld.md#r%C3%A8gle-n2)).

### Table _rss_flow_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_rss_flow | INT | PRIMARY KEY, NOT NULL | L'identifiant du flux rss |
| name | TEXT | ------- | Nom du flux rss  |
| url | VARCHAR(60) | -------  | L'url du flux rss|
| created_at | TIMESTAMPTZ  | DEFAULT NOW() | Date de création |
| updated_at| TIMESTAMPTZ  | DEFAULT NULL| Date de mise à jour |

### Table d'association _CREATE_ entre les tables _user_ et rss_flow (facultative)

### Table _rss_has_user_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_rss_has_user | INT | PRIMARY KEY, NOT NULL | L'identifiant de la table de liaison user/ rss|
| code_rss_flow |  INT | REFERENCES rss_flow(id)| L'identifiant du flux rss |
| code_user | INT | REFERENCES "user"(id)| L'identifiant de l'utilisateur |



### Table d'association _HAS entre les tables _user_ et _skill (facultative)

### Table _user_has_skill_

| Champ | Type | Spécificités | Description |
| - | - | - | - |
| code_rss_has_user | INT | PRIMARY KEY, NOT NULL | L'identifiant de la table de liaison user/ skill|
| code_skill |  INT | REFERENCES skill(id)| L'identifiant de la compétence |
| code_user | INT | REFERENCES "user"(id)| L'identifiant de l'utilisateur |
