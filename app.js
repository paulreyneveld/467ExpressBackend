const express = require('express');
const app = express();
const cors = require('cors');
const petsRouter = require('./controllers/pets');
const usersRouter = require('./controllers/users');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Landing page');
});

app.get('/api/messages/public', (req, res) => {
  res.json({ 'Message': 'Backend public resource' });
});

app.use('/pets', petsRouter);
app.use('/users', usersRouter);

module.exports = app;
