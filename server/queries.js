const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  database: 'qanda'
})

// add question
create = (cb, body, name, email) => {

}

// add answer


// list questions
read = (cb) => {

}

// list answers

//increment question as helpful

//increment answer as helpful

//report question

//report answer


module.exports = { create, read, update, delete};
