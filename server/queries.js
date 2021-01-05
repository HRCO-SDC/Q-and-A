const Pool = require('pg').Pool;

const pool = new Pool({
  host: '3.139.37.166',
  port: 5432,
  database: 'qanda1',
  user: 'postgres',
  password: 'postgresftw',
  ssl: { rejectUnauthorized: false }
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
createAnswer = (callback, id, body, name, email, photos) => {
  let sqlQuery = 'INSERT INTO answers (question_id, body, date, answerer_name, helpfulness, reported, photos) VALUES ($1, $2, NOW(), $3, 0, FALSE, $4) RETURNING answer_id;'
  pool.query(sqlQuery, [id, body, name, JSON.stringify(photos)], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

// list questions
readQuestions = (callback, id) => {

  let sqlQuery = 'SELECT json_agg(ques) AS results FROM (SELECT A.*, (SELECT COALESCE(json_agg(ans),json_build_array())  FROM (SELECT * FROM answers WHERE question_id = A.question_id ) ans ) AS answers FROM questions as A LIMIT 5) ques WHERE ques.product_id = $1'

  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(null, res)
  })
}

// list answers
readAnswers = (callback, id) => {
  let sqlQuery = 'SELECT * FROM answers WHERE question_id = $1'
  // 'SELECT COALESCE(json_agg(ans),json_build_array()) as results FROM (SELECT A.*, (SELECT COALESCE(json_agg(phots),json_build_array())  FROM (SELECT * FROM photos WHERE answer_id = A.answer_id) phots) AS photos FROM answers as A) ans WHERE ans.question_id = $1 AND ans.reported = FALSE LIMIT 10;'
  // 'SELECT A.*, B.photo_id, B.url FROM answers A inner join photos B on A.answer_id = B. answer_id WHERE question_id = $1 AND reported = FALSE LIMIT 10'
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

module.exports = { readQuestions, readAnswers, createQuestion, createAnswer, incQuestion, incAnswer, reportQuestion, reportAnswer };
