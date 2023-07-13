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

const getAllPets = async () => {
  const q = datastore.createQuery(PET);
  const entities = await datastore.runQuery(q);
  return entities[0].map(ds.fromDatastore);
};

const getPet = async (id) => {
  const key = datastore.key([PET, parseInt(id, 10)]);
  const entity = await datastore.get(key);
  if (entity[0] === undefined || entity[0] === null) {
    return entity;
  }

  return entity.map(ds.fromDatastore);
};

const putPet = async (updatedPet, id) => {
  const key = datastore.key([PET, parseInt(id, 10)]);

  const entity = {
    key: key,
    data: updatedPet,
  };

  await datastore.save(entity);
  return entity;
};

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
