const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  database: 'qanda'
})

// add question
createQuestion = (callback, id, body, name, email) => {
  let sqlQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, helpfulness, reported) VALUES ($1, $2, NOW(), $3, 0, FALSE)'
  pool.query(sqlQuery, [id, body, name], (err, res) => {
    if (err) {
      throw err;
    }
    callback(null, res)
  })
}

// add answer
createAnswer = (callback, id, body, name, email) => {
  let sqlQuery = 'INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, helpfulness, reported) VALUES ($1, $2, NOW(), $3, 0, FALSE) RETURNING answer_id;'
  pool.query(sqlQuery, [id, body, name], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

// add photo
createPhoto = (callback, id, url) => {
  let sqlQuery = 'INSERT INTO photos (answer_id, url) VALUES ($1, $2)'
  pool.query(sqlQuery, [id, url], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

// list questions
readQuestions = (callback, id) => {

  let sqlQuery = 'SELECT row_to_json(ques) AS results FROM (SELECT A.*, (SELECT json_agg(ans) FROM (select * from answers where question_id = A.question_id) ans) as answers from questions as A) ques WHERE ques.product_id = $1 AND ques.reported = FALSE LIMIT 10'


  // 'SELECT A.question_body, A.question_date , json_agg((B.answer_id, B.answer_body)) as answers FROM questions A JOIN answers B ON A.question_id = B.question_id GROUP BY A.question_body, A.question_date LIMIT 10'
  // WHERE product_id = $1 AND questions.reported = FALSE
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

// list answers
readAnswers = (callback, id) => {
  let sqlQuery = 'SELECT A.*, B.photo_id, B.url FROM answers A inner join photos B on A.answer_id = B. answer_id WHERE question_id = $1 AND reported = FALSE LIMIT 10'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

//increment question as helpful
incQuestion = (callback, id) => {
  let sqlQuery = 'UPDATE questions SET helpfulness = helpfulness + 1 WHERE question_id = $1'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}
//increment answer as helpful
incAnswer = (callback, id) => {
  let sqlQuery = 'UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

//report question
reportQuestion = (callback, id) => {
  let sqlQuery = 'UPDATE questions SET reported = TRUE WHERE question_id = $1'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

//report answer
reportAnswer = (callback, id) => {
  let sqlQuery = 'UPDATE answers SET reported = TRUE WHERE answer_id = $1'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

module.exports = { readQuestions, readAnswers, createQuestion, createAnswer, createPhoto, incQuestion, incAnswer, reportQuestion, reportAnswer };
