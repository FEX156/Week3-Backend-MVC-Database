CREATE TABLE contacts (
  contact_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE,
  phone VARCHAR(50),
  company VARCHAR(50)
);

CREATE TABLE groups (
  group_id SERIAL PRIMARY KEY,
  group_name VARCHAR(50) NOT NULL
);

CREATE TABLE contact_groups (
  contact_group_id SERIAL PRIMARY KEY,

  contact_id INT NOT NULL
    REFERENCES contacts(contact_id)
    ON DELETE CASCADE,

  group_id INT NOT NULL
    REFERENCES groups(group_id)
    ON DELETE CASCADE,

  UNIQUE (contact_id, group_id)
);

