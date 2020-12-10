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

COPY questions(product_id, question_body, question_date, asker_name, helpfulness, reported)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(question_id, answer_body, answer_date, answerer_name, helpfulness)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(answer_id, url)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/photos.csv'
DELIMITER ','
CSV HEADER;



-- EXPLAIN ANALYZE SELECT * FROM questions A LEFT JOIN answers B ON A.question_id = B.question_id LEFT JOIN photos C ON B.answer_id = C.answer_id;