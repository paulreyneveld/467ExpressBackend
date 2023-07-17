const ds = require('../utils/datastore');

const USER = 'User';
const datastore = ds.datastore;

const createUser = async () => {};

const getAllUsers = async () => {
  const q = datastore.createQuery(USER);
  const entities = await datastore.runQuery(q);
  return entities[0].map(ds.fromDatastore);
};

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
