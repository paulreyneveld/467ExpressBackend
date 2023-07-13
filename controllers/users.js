const usersRouter = require('express').Router();
const userModel = require('../models/user');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const { createUser, getAllUsers, getUser, putUser, patchUser, deleteUser } =
  userModel;

const checkJwt = auth({
  audience: 'http://localhost:3001',
  issuerBaseURL: `https://467oktaexample.us.auth0.com/`,
});

// TODO: GET all users.
usersRouter.get('/', checkJwt, (req, res) => {
  res.send('testing users route - authenticated');
  // Admin: Can view all accounts. Can edit/delete here.
  // Public: No access?
});

// TODO: READ a user.
usersRouter.get('/:id', checkJwt, (req, res) => {
  res.send('testing individual user - authenticated');
  // Admin: Can retrieve any accounts (public or private).
  // Public: Can only retrieve publicly shown account details. Can also retrieve their own.
});

// TODO: UPDATE a user (PUT and/or PATCH).
usersRouter.put('/:id', (req, res) => {
  // Admin: Can edit any account.
  // Public: Can only edit their own account.
});

// TODO: DELETE a user.
usersRouter.delete('/:id', (req, res) => {
  // Admin: Can delete any account.
  // Public: Can only delete their own account.
});

module.exports = usersRouter;
