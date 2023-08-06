const petsRouter = require('express').Router();
const petModel = require('../models/pet');
const { createPet, getAllPets, getPet, putPet, patchPet, deletePet } = petModel;
const {
  validateAccessToken,
  checkRequiredPermissions,
} = require('../middleware/auth0.middleware');
const { errorHandler } = require('../middleware/error.middleware');
const { ReadPetPermissions } = require('../permissions/pet-permissions');
const config = require('../utils/config');
console.log(ReadPetPermissions);

const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const multer = require('multer');
const crypto = require('crypto');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

const bucket = storage.bucket('example-bucket-for-demo-purposes');

// Test situation:
petsRouter.get(
  '/test',
  validateAccessToken,
  checkRequiredPermissions([ReadPetPermissions.Read]),
  errorHandler,
  async (req, res) => {
    return res.status(200).json({ Response: 'You have permission' });
  },
);

// Test situation:
petsRouter.get(
  '/protected',
  validateAccessToken,
  errorHandler,
  async (req, res) => {
    return res.status(200).json({ Response: 'You have permission' });
  },
);

// TODO: AUTH
// Admin - View all editable pets.
// Public - View all read-only pets.
petsRouter.get('/', async (req, res) => {
  const pets = await getAllPets();
  return res.status(200).json(pets);
});

// TODO: AUTH
// Admin - View an editable pet.
// Public - View a pet (restricted to only adoption/cancelation).
petsRouter.get('/:id', async (req, res) => {
  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  } else {
    res.status(200).json(pet[0]);
  }
});

// TODO: AUTH
// Admin: Create a pet.
// Public: No access.
petsRouter.post('/', upload.single('file'), validateAccessToken, errorHandler, async (req, res) => {

  const accepts = req.accepts(['multipart/form-data']);
  if (!accepts) {
    return res.status(406).json({ Error: 'Not Acceptable' });
  }

  if (req.get('content-type').slice(0, 19) !== 'multipart/form-data') {
    return res
      .status(415)
      .json({ Error: 'Server only accepts multipart/form-data' });
  }

  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length > 7) {
    return res
      .status(400)
      .json({ Error: 'The request object has too many attributes' });
  }

  if (
    req.body.typeAnimal === undefined ||
    req.body.breed === undefined ||
    req.body.description === undefined ||
    req.body.goodWithAnimals === undefined ||
    req.body.goodWithChildren === undefined ||
    req.body.leashedAllTimes === undefined
  ) {
    return res.status(400).json({
      Error:
        'The request object is missing at least one of the required attributes',
    });
  }

  if (!config.validAnimalTypes.includes(req.body.typeAnimal.toLowerCase())) {
    return res.status(400).json({
      Error: 'Invalid animal type',
    });
  }

  if (!config.validBreeds.includes(req.body.breed.toLowerCase())) {
    return res.status(400).json({
      Error: 'Invalid breed',
    });
  }

  let imageFileName;
  if (req.file) {

    // Check Google Cloud Storage for uniqueness of file name.
    const [files] = await bucket.getFiles();

    for (;;) {
      let randStrArr = new BigUint64Array(1);
      crypto.getRandomValues(randStrArr);
      imageFileName = String(randStrArr[0]) + req.file.originalname;

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
    blobStream.end(req.file.buffer);
  };

  const newPet = {
    typeAnimal: req.body.typeAnimal.toLowerCase(),
    breed: req.body.breed.toLowerCase(),
    description: req.body.description,
    images: ['https://storage.googleapis.com/' + bucket.name + '/' + imageFileName],
    goodWithAnimals: (req.body.goodWithAnimals === 'true'),
    goodWithChildren: (req.body.goodWithChildren === 'true'),
    leashedAllTimes: (req.body.leashedAllTimes === 'true'),
    availability: 'available',
    creationDate: new Date().toISOString(),
  };

  const entity = await createPet(newPet);

  const result = entity.data;
  result.id = entity.key.id;
  return res.status(201).json(result);
});

// TODO: AUTH
// Admin - Can edit any pet.
// Public - Can only change availability: Available -> Adopted, Adopted -> Available
petsRouter.put('/:id', async (req, res) => {
  const accepts = req.accepts(['application/json']);
  if (!accepts) {
    return res.status(406).json({ Error: 'Not Acceptable' });
  }

  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    return res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  }

  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length > 8) {
    return res
      .status(400)
      .json({ Error: 'The request object has too many attributes' });
  }

  if (
    req.body.typeAnimal === undefined ||
    req.body.breed === undefined ||
    req.body.description === undefined ||
    req.body.goodWithAnimals === undefined ||
    req.body.goodWithChildren === undefined ||
    req.body.leashedAllTimes === undefined ||
    req.body.availability === undefined
  ) {
    return res.status(400).json({
      Error:
        'The request object is missing at least one of the required attributes',
    });
  }

  if (!config.validAnimalTypes.includes(req.body.typeAnimal.toLowerCase())) {
    return res.status(400).json({
      Error: 'Invalid animal type',
    });
  }

  if (!config.validBreeds.includes(req.body.breed.toLowerCase())) {
    return res.status(400).json({
      Error: 'Invalid breed',
    });
  }

  if (
    !config.availabilityOptions.includes(req.body.availability.toLowerCase())
  ) {
    return res.status(400).json({
      Error: 'Invalid availability',
    });
  }

  const updatedPet = {
    typeAnimal: req.body.typeAnimal,
    breed: req.body.breed,
    description: req.body.description,
    images: req.body.images ? req.body.images : pet[0].images,
    goodWithAnimals: req.body.goodWithAnimals,
    goodWithChildren: req.body.goodWithChildren,
    leashedAllTimes: req.body.leashedAllTimes,
    availability: req.body.availability.toLowerCase(),
    creationDate: pet[0].creationDate,
  };

  const entity = await putPet(updatedPet, req.params.id);

  const result = entity.data;
  result.id = entity.key.id;
  return res.status(200).json(result);
});

// TODO: AUTH
// Admin - Can edit any pet.
// Public - Can only change availability: Available -> Adopted, Adopted -> Available
petsRouter.patch('/:id', upload.single('file'), validateAccessToken, errorHandler, async (req, res) => {
  
  const accepts = req.accepts(['multipart/form-data']);
  if (!accepts) {
    return res.status(406).json({ Error: 'Not Acceptable' });
  }

  if (req.get('content-type').slice(0, 19) !== 'multipart/form-data') {
    return res
      .status(415)
      .json({ Error: 'Server only accepts multipart/form-data' });
  }

  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    return res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  }

  const reqBodyKeys = Object.keys(req.body);
  if (reqBodyKeys.length > 8) {
    return res
      .status(400)
      .json({ Error: 'The request object has too many attributes' });
  }

  if (
    req.body.typeAnimal &&
    !config.validAnimalTypes.includes(req.body.typeAnimal.toLowerCase())
  ) {
    return res.status(400).json({
      Error: 'Invalid animal type',
    });
  }

  if (
    req.body.breed &&
    !config.validBreeds.includes(req.body.breed.toLowerCase())
  ) {
    return res.status(400).json({
      Error: 'Invalid breed',
    });
  }

  if (
    req.body.availability &&
    !config.availabilityOptions.includes(req.body.availability.toLowerCase())
  ) {
    return res.status(400).json({
      Error: 'Invalid availability',
    });
  }

  //TODO: Delete previous image from Google Cloud Storage.
  let imageFileName;
  if (req.file) {

    // Check Google Cloud Storage for uniqueness of file name.
    const [files] = await bucket.getFiles();

    for (;;) {
      let randStrArr = new BigUint64Array(1);
      crypto.getRandomValues(randStrArr);
      imageFileName = String(randStrArr[0]) + req.file.originalname;

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
    blobStream.end(req.file.buffer);
  };

  const updatedPet = {
    typeAnimal: req.body.typeAnimal ? req.body.typeAnimal : pet[0].typeAnimal,
    breed: req.body.breed ? req.body.breed : pet[0].breed,
    description: req.body.description
      ? req.body.description
      : pet[0].description,
    images: req.file ? ['https://storage.googleapis.com/' + bucket.name + '/' + imageFileName] : pet[0].images,
    goodWithAnimals: (req.body.goodWithAnimals === 'true'),
    goodWithChildren: (req.body.goodWithChildren === 'true'),
    leashedAllTimes: (req.body.leashedAllTimes === 'true'),
    availability: req.body.availability
      ? req.body.availability
      : pet[0].availability,
    creationDate: pet[0].creationDate,
  };

  const entity = await patchPet(updatedPet, req.params.id);

  const result = entity.data;
  result.id = entity.key.id;
  return res.status(200).json(result);
});

// TODO: AUTH
// Admin - Can delete any pet.
// Public - No access.
petsRouter.delete('/:id', async (req, res) => {
  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    return res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  }

  await deletePet(req.params.id);
  return res.status(204).end();
});

module.exports = petsRouter;
