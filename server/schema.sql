-- DROP DATABASE IF EXISTS qanda;


CREATE DATABASE qanda1;

\c qanda1;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body TEXT,
  question_date DATE,
  asker_name VARCHAR (255),
  helpfulness INT,
  reported BOOLEAN
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  answer_body TEXT,
  answer_date DATE,
  answerer_name VARCHAR (255),
  helpfulness INT,
  reported BOOLEAN,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(question_id)
);
CREATE INDEX index_question_id ON answers(question_id);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (255),
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(answer_id)
);

CREATE INDEX index_answer_id ON photos(answer_id);

COPY questions(product_id, question_body, question_date, asker_name, helpfulness, reported)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/questionstest.csv'
DELIMITER ','
CSV HEADER;

COPY answers(question_id, answer_body, answer_date, answerer_name, helpfulness, reported)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/answerstest.csv'
DELIMITER ','
CSV HEADER;

COPY photos(answer_id, url)
FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/photostest.csv'
DELIMITER ','
CSV HEADER;



-- EXPLAIN ANALYZE SELECT * FROM questions A LEFT JOIN answers B ON A.question_id = B.question_id LEFT JOIN photos C ON B.answer_id = C.answer_id;