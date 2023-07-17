const ds = require('../utils/datastore');

const USER = 'User';
const datastore = ds.datastore;

const createUser = async () => {};

const getAllUsers = async () => {};

const getUser = async () => {};

const putUser = async () => {};

const patchUser = async () => {};

const deleteUser = async (id) => {
  const key = datastore.key([USER, parseInt(id, 10)]);
  await datastore.delete(key);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  putUser,
  patchUser,
  deleteUser,
};
