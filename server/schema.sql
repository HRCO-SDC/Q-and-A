-- DROP DATABASE IF EXISTS qanda;


CREATE DATABASE qanda1;

\c qanda1;

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS photos CASCADE;

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
  body TEXT,
  date DATE,
  answerer_name VARCHAR (255),
  helpfulness INT,
  reported BOOLEAN,
  photos JSONB
);
CREATE INDEX index_question_id ON answers(question_id);


-- Uncomment for normalized version

-- CREATE TABLE photos (
--   photo_id SERIAL PRIMARY KEY,
--   answer_id INT NOT NULL,
--   url VARCHAR (255),
--   CONSTRAINT fk_answer
--     FOREIGN KEY(answer_id)
--       REFERENCES answers(answer_id)
-- );

-- CREATE INDEX index_answer_id ON photos(answer_id);


-- COPY questions(product_id, question_body, question_date, asker_name, helpfulness, reported)
-- FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY questions(product_id, question_body, question_date, asker_name, helpfulness, reported)
FROM '/home/ubuntu/data/questions.csv'
DELIMITER ','
CSV HEADER;


-- COPY answers(question_id, body, date, answerer_name, helpfulness, reported, photos)
-- FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/answers.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY answers(question_id, body, date, answerer_name, helpfulness, reported, photos)
FROM '/home/ubuntu/data/answer.csv'
DELIMITER ','
CSV HEADER;



-- COPY photos(answer_id, url)
-- FROM '/Users/alirangwala/Documents/HackReactor/ClarkFECSource/photostest.csv'
-- DELIMITER ','
-- CSV HEADER;
