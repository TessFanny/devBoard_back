### Rédaction du modèle Entité-Association MLD

user (<u>_id</u>, firstname, lastname, email, password, image_path,pseudo, role )

skill(<u>_id</u>, name, level)

post(<u>_id</u>, title, content, created_at, updated_at)

rss_flow( <u>_id</u>, name, url, created_at, updated_at)

rss_has_user(<u>_id</u>, #rss_flow_id,  #user_id)

user_has_skill(<u>_id</u>, #user_id,  #skill_id)


