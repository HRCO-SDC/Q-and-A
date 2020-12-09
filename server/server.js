const express = require('express');
const app = express();
const PORT = 3003;
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const queries = require('./queries')
const pool = require('./schema.sql')

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(cors());
app.use(compression());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Create/POST
// {
//   "body": "TEST",
//   "name": "TESTTEST",
//   "email": "TEST@test.com"
// }
app.post('/qa/:product_id', (req, res) => {
  queries.create(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }
}, res.body, res.name, res.email);

// Read/GET
app.get('/qa/:product_id', (req, res) => {
  queries.read(err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  }
}, body);


// Update/PUT
// Delete/DELETE

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));