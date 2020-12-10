const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  database: 'qanda'
})

// add question
createQuestion = (callback, id, body, name) => {
  let sqlQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, helpfulness, reported) VALUES ($1, $2, NOW(), $3, 0, TRUE)'
  pool.query(sqlQuery, [id, body, name], (err, res) => {
    if (err) {
      throw err
    }
    callback(res)
  })
}

// add answer


// list questions
readQuestions = (callback, id) => {
  let sqlQuery = 'SELECT * FROM questions WHERE product_id = $1 LIMIT 10'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(res)
  })
}

// list answers
readAnswers = (callback, id) => {
  let sqlQuery = 'SELECT * FROM answers WHERE question_id = $1 LIMIT 10'
  pool.query(sqlQuery, [id], (err, res) => {
    if (err) {
      throw err
    }
    callback(res)
  })
}

//increment question as helpful

//increment answer as helpful

//report question

//report answer


module.exports = { readQuestions, readAnswers, createQuestion };
