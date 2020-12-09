DROP DATABASE IF EXISTS qanda;


CREATE DATABASE qanda;

\c qanda;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT,
  question_body TEXT,
  question_date DATE,
  asker_name VARCHAR (255),
  helpfulness INT,
  reported BOOLEAN
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT,
  answer_body TEXT,
  answer_date DATE,
  answerer_name VARCHAR (255),
  helpfulness INT
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (255)
);