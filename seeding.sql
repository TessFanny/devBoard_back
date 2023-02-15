BEGIN;

TRUNCATE "user", skill, post, rss_flow, rss_has_user, user_has_skill RESTART IDENTITY;

INSERT INTO "user" (firstname, lastname, username, email, password,image_path, role)
VALUES ('jean', 'david','gogodu93','jeandavid93@gmail.com','xxxxizjodjziojz', '/public/asset.png','member');

INSERT INTO skill(name, level)
VALUES ('debutant', 'expert');

INSERT INTO post (title, content, user_id, "like" )
VALUES ('React in 1 minute','blablabla', 1, 0);

INSERT INTO rss_flow (name, url)
VALUES('Dev.to','Dev.to/feed');

INSERT INTO rss_has_user (rss_flow_id, user_id) 
VALUES (1, 1);

INSERT INTO user_has_skill (skill_id, user_id) 
VALUES (1, 1);

COMMIT;