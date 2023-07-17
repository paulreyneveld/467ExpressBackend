const ds = require('../utils/datastore');

const USER = 'User';
const datastore = ds.datastore;

const createUser = async () => {};

const getAllUsers = async () => {
  const q = datastore.createQuery(USER);
  const entities = await datastore.runQuery(q);
  return entities[0].map(ds.fromDatastore);
};

const getUser = async (id) => {
  const key = datastore.key([USER, parseInt(id, 10)]);
  const entity = await datastore.get(key);
  if (entity[0] === undefined || entity[0] === null) {
    return entity;
  }

  return entity.map(ds.fromDatastore);
};

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
