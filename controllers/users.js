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

// TODO: DELETE a user.
usersRouter.delete('/:id', (req, res) => {
  // Admin: Can delete any account.
  // Public: Can only delete their own account.
});

module.exports = usersRouter;
