const express = require('express');
const app = express();
const cors = require('cors');
const petsRouter = require('./controllers/pets');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Landing page');
});

app.use('/pets', petsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

module.exports = app;
