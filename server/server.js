const newRelic = require('newrelic');

const express = require('express');
const app = express();
const PORT = 3003;
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const queries = require('./queries')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('../client/dist'));
app.use(express.json());
app.use(cors());
app.use(compression());

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'), err => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });


// {
//   "question_body": "TEST",
//   "asker_name": "TEST",
//   "email": test@test.com
// }

//POST Question
app.post('/qa/:product_id', (req, res) => {
  queries.createQuestion((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data)
    }
  }, req.params.product_id, req.body.question_body, req.body.asker_name, req.body.email)
});

// {
//   "answer_body": "TEST",
//   "answerer_name": "TEST",
//   "photos": [{"url": "TEST"}],
//   "email": test@test.com
// }
//POST answer
app.post('/qa/:question_id/answers', (req, res) => {
  queries.createAnswer((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  }, req.params.question_id, req.body.body, req.body.answerer_name, req.body.email, req.body.photos)
});

// GET questions
app.get('/qa/:product_id', (req, res) => {
  queries.readQuestions((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data.rows)
    }
  }, req.params.product_id)
});

//GET answers
app.get('/qa/:question_id/answers', (req, res) => {
  queries.readAnswers((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(data.rows)
    }
  }, req.params.question_id)
});

//PUT question helpfulness
app.put('/qa/question/:question_id/helpful', (req, res) => {
  queries.incQuestion((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  }, req.params.question_id)
});

//PUT answer helpfulness
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  queries.incAnswer((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  }, req.params.answer_id)
});

//PUT question reported
app.put('/qa/question/:question_id/report', (req, res) => {
  queries.reportQuestion((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  }, req.params.question_id)
});

//PUT answer reported
app.put('/qa/answer/:answer_id/report', (req, res) => {
  queries.reportAnswer((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  }, req.params.answer_id)
});

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));