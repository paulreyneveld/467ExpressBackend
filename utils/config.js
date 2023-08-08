const PORT = process.env.PORT || 3001;

const validAnimalTypes = ['dog', 'cat', 'other'];
const validBreeds = [
  'german shepherd',
  'labrador retriever',
  'golden retriever',
  'bulldog',
  'poodle',
  'beagle',
  'rottweiler',
  'yorkshire terrier',
  'dachshund',
  'boxer',
  'other'
];
const availabilityOptions = [
  'available',
  'not available',
  'pending',
  'adopted',
];
const validImageFileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

module.exports = {
  PORT,
  validAnimalTypes,
  validBreeds,
  availabilityOptions,
  validImageFileTypes,
};
