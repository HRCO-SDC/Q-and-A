DROP DATABASE IF EXISTS qanda;

CREATE DATABASE qanda;

DROP TABLE IF EXISTS product_to_question;

CREATE TABLE product_to_question (
  product_id INT,
  question_id INT
);

DROP TABLE  IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  body VARCHAR (255),
  date DATE,
  username VARCHAR (255),
  helpfulness INT,
  reported INT
);

DROP TABLE IF EXISTS question_to_answer;

CREATE TABLE question_to_answer (
  question_id INT,
  answer_id INT
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  body VARCHAR (255),
  date DATE,
  helpfulness INT
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (255)
);