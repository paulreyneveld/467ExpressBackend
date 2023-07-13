const express = require('express');
const app = express();
const cors = require('cors');
const petsRouter = require('./controllers/pets');
const usersRouter = require('./controllers/users');

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect')

app.use(cors());
app.use(express.json());
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3001',
  clientID: 'tgEXQutvJF9cZ6wC8UQdmHAaGZTUmBYn',
  issuerBaseURL: 'https://467oktaexample.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use('/pets', petsRouter);
app.use('/users', usersRouter);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send("Landing page - open for viewing")
});

module.exports = app;
