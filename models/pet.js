const ds = require('../utils/datastore');

const PET = 'Pet';
const datastore = ds.datastore;

const createPet = async (newPet) => {
  const key = datastore.key(PET);

  const entity = {
    key: key,
    data: newPet,
  };

  await datastore.save(entity);
  return entity;
};

const getAllPets = async () => {};

const getPet = async () => {};

const putPet = async () => {};

const patchPet = async () => {};

const deletePet = async () => {};

module.exports = {
  createPet,
  getAllPets,
  getPet,
  putPet,
  patchPet,
  deletePet,
};
