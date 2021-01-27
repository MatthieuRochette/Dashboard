CREATE TABLE IF NOT EXISTS users
(
  email text PRIMARY KEY NOT NULL,
  username text NOT NULL,
  pw_hash text,
  city text
);

CREATE TABLE IF NOT EXISTS user_services
(
  email text NOT NULL,
  service text NOT NULL
);