const petsRouter = require('express').Router();
const petModel = require('../models/pet');

const { getAllPets, getPet, putPet, patchPet, deletePet } = petModel;

// TODO: GET all pets. Also look into pagination, filtering, and searching.
petsRouter.get('/', (req, res) => {
  res.send('testing pets route');
  // Admin: View all pets. Can add/edit/delete here.
  // Public: View all pets (read-only).
});

// TODO: GET a pet.
petsRouter.get('/:id', (req, res) => {
  // Admin: View a pet. Can edit/delete.
  // Public: View a pet. Can only adopt/cancel.
});

// TODO: CREATE a pet.
petsRouter.post('/', (req, res) => {
  // Admin: Create a pet.
  // Public: No access.
});

module.exports = petsRouter;
