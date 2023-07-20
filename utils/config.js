const PORT = process.env.PORT || 3001;

const validAnimalTypes = ['dog', 'cat', 'other'];
const validBreeds = ['german shepherd', 'other'];
const availabilityOptions = [
  'available',
  'not available',
  'pending',
  'adopted',
];

module.exports = {
  PORT,
  validAnimalTypes,
  validBreeds,
  availabilityOptions,
};
