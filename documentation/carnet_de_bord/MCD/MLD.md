### Rédaction du modèle Entité-Association MLD

user (<u>_id</u>, firstname, lastname, email, password, image_path,pseudo, role )

skill(<u>_id</u>, name, level)

post(<u>_id</u>, #user_id, title, content, created_at, updated_at)

feed( <u>_id</u>, name, url, created_at, updated_at)

feed_has_user(<u>_id</u>, #feed_id,  #user_id)

user_has_skill(<u>_id</u>, #user_id,  #skill_id)

user_likes(<u>_id</u>, #user_id,  #post_id)



