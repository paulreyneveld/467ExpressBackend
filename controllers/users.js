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
