const petsRouter = require('express').Router();
const petModel = require('../models/pet');

const { createPet, getAllPets, getPet, putPet, patchPet, deletePet } = petModel;

// TODO: GET all pets. Also look into pagination, filtering, and searching.
petsRouter.get('/', async (req, res) => {
  // Admin: View all pets. Can add/edit/delete here.
  // Public: View all pets (read-only).
  const pets = await getAllPets();
  return res.json(pets);
});

// TODO: GET a pet.
petsRouter.get('/:id', async (req, res) => {
  // Admin: View a pet. Can edit/delete.
  // Public: View a pet. Can only adopt/cancel.
  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  } else {
    res.status(200).json(pet[0]);
  }
});

// TODO: CREATE a pet.
petsRouter.post('/', async (req, res) => {
  // Admin: Create a pet.
  // Public: No access.
  const newPet = {
    typeAnimal: req.body.typeAnimal,
    breed: req.body.breed,
    description: req.body.description,
    images: req.body.images,
    goodWithAnimals: req.body.goodWithAnimals,
    goodWithChildren: req.body.goodWithChildren,
    leashedAllTimes: req.body.leashedAllTimes,
    availability: 'Available',
    creationDate: new Date().toISOString(),
  };

  const entity = await createPet(newPet);

  const result = entity.data;
  result.id = entity.key.id;
  return res.json(result);
});

petsRouter.put('/:id', async (req, res) => {
  const pet = await getPet(req.params.id);
  if (pet[0] === undefined || pet[0] === null) {
    return res.status(404).json({
      Error: 'No pet with this pet_id exists',
    });
  }

  const updatedPet = {
    typeAnimal: req.body.typeAnimal,
    breed: req.body.breed,
    description: req.body.description,
    images: req.body.images,
    goodWithAnimals: req.body.goodWithAnimals,
    goodWithChildren: req.body.goodWithChildren,
    leashedAllTimes: req.body.leashedAllTimes,
    availability: req.body.availability,
    creationDate: pet.creationDate,
  };

  const entity = await putPet(updatedPet, req.params.id);

  const result = entity.data;
  result.id = entity.key.id;
  return res.json(result);
});

module.exports = petsRouter;
