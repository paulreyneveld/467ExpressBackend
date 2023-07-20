const PORT = process.env.PORT || 3001;

const validAnimalTypes = ['dog', 'cat', 'other'];
const validBreeds = ['german shepherd', 'other'];
const availabilityOptions = [
  'Available',
  'Not Available',
  'Pending',
  'Adopted',
];

module.exports = {
  PORT,
  validAnimalTypes,
  validBreeds,
  availabilityOptions,
};
