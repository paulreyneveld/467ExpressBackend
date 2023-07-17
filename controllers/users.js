const usersRouter = require('express').Router();
const userModel = require('../models/user');

const { createUser, getAllUsers, getUser, putUser, patchUser, deleteUser } =
  userModel;

// TODO: AUTH for getting all users.
// Admin: Can view all accounts.
// Public: No access to all users.
usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();
  return res.status(200).json(users);
});

// TODO: AUTH for getting a user.
// Admin: Can view any accounts.
// Public: Can only access their own.
usersRouter.get('/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  if (user[0] === undefined || user[0] === null) {
    res.status(404).json({
      Error: 'No user with this user_id exists',
    });
  } else {
    res.status(200).json(user[0]);
  }
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
