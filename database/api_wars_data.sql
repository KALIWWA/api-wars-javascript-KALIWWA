ALTER TABLE IF EXISTS ONLY public.users
  DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes
  DROP CONSTRAINT IF EXISTS pk_planet_votes_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes
  DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users
(
  id       SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50)        NOT NULL,
  password VARCHAR(200)       NOT NULL
);

DROP TABLE IF EXISTS public.planet_votes;
CREATE TABLE planet_votes
(
  id              SERIAL PRIMARY KEY NOT NULL,
  planet_id       INTEGER            NOT NULL,
  planet_name     VARCHAR(50),
  user_id         INTEGER,
  submission_time TIMESTAMP WITHOUT TIME ZONE
);


ALTER TABLE ONLY planet_votes
  ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id);


SELECT pg_catalog.setval('users_id_seq', (SELECT MAX(id) from "users"), true);

SELECT pg_catalog.setval('planet_votes_id_seq', (SELECT MAX(id) from "planet_votes"), true);