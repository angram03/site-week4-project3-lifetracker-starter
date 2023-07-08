CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nutrition (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  calories   INTEGER NOT NULL,
  category   TEXT NOT NULL,
  image_url  TEXT NOT NULL,
  user_id    INTEGER REFERENCES users ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 
);

CREATE TABLE IF NOT EXISTS exercise (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  category   TEXT NOT NULL,
  duration_min INTEGER NOT NULL,
  user_id    INTEGER REFERENCES users ON DELETE CASCADE,
  intensity INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL
 
);
CREATE TABLE IF NOT EXISTS sleep (
  id         SERIAL PRIMARY KEY,
  start_at TIME (0) NOT NULL,
  end_at TIME (0) NOT NULL
 
);
