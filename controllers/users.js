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

// TODO: AUTH for creating users.
// Admin: Can create accounts.
// Public: Can create accounts.
//         Create accounts via logging in (Auth0).
//         Create accounts through application.
usersRouter.post('/', async (req, res) => {
  const [month, day, year] = req.body.birthdate.split('/');
  const newUser = {
    name: req.body.name,
    // TODO: Data format for birthdate.
    birthdate: new Date(`${year}-${month}-${day}`).toISOString(),
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    // TODO: Delete admin later.
    //  Only an admin determines admin status.
    admin: false,
  };

  const entity = await createUser(newUser);

  const result = entity.data;
  result.id = entity.key.id;
  return res.status(201).json(result);
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
