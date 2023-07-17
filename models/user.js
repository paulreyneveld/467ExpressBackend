const ds = require('../utils/datastore');

const USER = 'User';
const datastore = ds.datastore;

const createUser = async (newUser) => {
  const key = datastore.key(USER);

  const entity = {
    key: key,
    data: newUser,
  };

  await datastore.save(entity);
  return entity;
};

const getAllUsers = async () => {};

const getUser = async () => {};

const putUser = async () => {};

const patchUser = async () => {};

const deleteUser = async () => {};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  putUser,
  patchUser,
  deleteUser,
};
