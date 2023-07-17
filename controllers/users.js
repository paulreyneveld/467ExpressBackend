const usersRouter = require('express').Router();
const userModel = require('../models/user');

const { createUser, getAllUsers, getUser, putUser, patchUser, deleteUser } =
  userModel;

// TODO: AUTH for getting all users.
// Admin   (1) Can view all accounts
//         (2) Can edit/delete here.
// Public
//         (1)No access to all users.
usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
});

// TODO: READ a user.
usersRouter.get('/:id', (req, res) => {
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
