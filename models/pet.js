const ds = require('../utils/datastore');
const st = require('../utils/storage');
const crypto = require('crypto');

const PET = 'Pet';
const datastore = ds.datastore;
const storage = st.storage;
const bucket = storage.bucket('example-bucket-for-demo-purposes');

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

const patchPet = async (updatedPet, id) => {
  const key = datastore.key([PET, parseInt(id, 10)]);

  const entity = {
    key: key,
    data: updatedPet,
  };

  await datastore.save(entity);
  return entity;
};

const deletePet = async (id) => {
  const key = datastore.key([PET, parseInt(id, 10)]);
  await datastore.delete(key);
};

const uploadPetImage = async (imageFile) => {
  // Check Google Cloud Storage for uniqueness of file name.
  const [files] = await bucket.getFiles();

  let imageFileName;
  for (;;) {
    let randStrArr = new BigUint64Array(1);
    crypto.getRandomValues(randStrArr);
    imageFileName = String(randStrArr[0]) + imageFile.originalname;

    let uniqueFlag = 1;
    for (const file of files) {
      if (imageFileName === file.name) {
        uniqueFlag = 0;
        break;
      };
    };

    if (uniqueFlag) break;
  };

  const blob = bucket.file(imageFileName);
  const blobStream = blob.createWriteStream();
  blobStream.end(imageFile.buffer);

  return 'https://storage.googleapis.com/' + bucket.name + '/' + imageFileName;
};

const deletePetImage = async (imageURL) => {
  await bucket.file(imageURL.slice(32 + bucket.name.length)).delete();
};

module.exports = {
  createPet,
  getAllPets,
  getPet,
  putPet,
  patchPet,
  deletePet,
  uploadPetImage,
  deletePetImage,
};
