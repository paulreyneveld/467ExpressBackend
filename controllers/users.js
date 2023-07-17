const usersRouter = require('express').Router();
const userModel = require('../models/user');

const { createUser, getAllUsers, getUser, putUser, patchUser, deleteUser } =
  userModel;

// TODO: GET all users.
usersRouter.get('/', (req, res) => {
  res.send('testing users route');
  // Admin: Can view all accounts. Can edit/delete here.
  // Public: No access?
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

// TODO: AUTH for deleting a user.
// Admin: Can delete any accounts.
// Public: Can only delete their own.
usersRouter.delete('/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  if (user[0] === undefined || user[0] === null) {
    return res.status(404).json({
      Error: 'No user with this user_id exists',
    });
  }

  await deleteUser(req.params.id);
  return res.status(204).end();
});

module.exports = usersRouter;
