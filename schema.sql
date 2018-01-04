DROP DATABASE IF EXISTS ethics;

CREATE DATABASE ethics;

USE ethics;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE papers (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NUll,
  body LONGTEXT,
  PRIMARY KEY (ID),
  user_id int,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
