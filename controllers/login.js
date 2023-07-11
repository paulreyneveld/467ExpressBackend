const loginRouter = require('express').Router();

// TODO: Look into Auth0.
loginRouter.get('/', (req, res) => {
  res.send('testing login route');
});

// TODO: Login.
loginRouter.post('/login', (req, res) => {});

// TODO: Logout.
loginRouter.post('/logout', (req, res) => {});

// TODO: Register.
loginRouter.post('/register', (req, res) => {});

module.exports = loginRouter;
