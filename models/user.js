const ds = require('../utils/datastore');

const USER = 'User';
const datastore = ds.datastore;

const createUser = async () => {};

const getAllUsers = async () => {};

const getUser = async () => {};

const putUser = async (updatedUser, id) => {
  const key = datastore.key([USER, parseInt(id, 10)]);

  const entity = {
    key: key,
    data: updatedUser,
  };

  await datastore.save(entity);
  return entity;
};

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
