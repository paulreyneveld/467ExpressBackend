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

// TODO: AUTH for updating (PUT) users.
// Admin: Can update any accounts.
// Public: Can only update their own.
usersRouter.put('/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  if (user[0] === undefined || user[0] === null) {
    return res.status(404).json({
      Error: 'No user with this user_id exists',
    });
  }

  const [month, day, year] = req.body.birthdate.split('/');

  const updatedUser = {
    name: req.body.name,
    birthdate: new Date(`${year}-${month}-${day}`).toISOString(),
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    admin: user[0].admin,
  };

  const entity = await putUser(updatedUser, req.params.id);

  const result = entity.data;
  result.id = entity.key.id;
  return res.status(200).json(result);
});

// TODO: DELETE a user.
usersRouter.delete('/:id', (req, res) => {
  // Admin: Can delete any account.
  // Public: Can only delete their own account.
});

module.exports = usersRouter;
