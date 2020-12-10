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

//POST Question
app.post('/qa/:product_id', (req, res) => {
  queries.createQuestion((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }, req.params.product_id, req.body.question_body, req.body.asker_name)
});

//POST answer
app.post('/qa/:question_id/answers', (req, res) => {
  queries.createAnswer((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }, req.params.product_id, req.body.question_body, req.body.asker_name)
});

// GET questions
app.get('/qa/:product_id', (req, res) => {
  queries.readQuestions((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }, req.params.product_id)
});

//Get answers
app.get('/qa/:question_id/answers', (req, res) => {
  queries.readAnswers((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }, req.params.question_id)
});


app.listen(PORT, () => console.log('Server is listening on port ' + PORT));