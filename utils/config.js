const PORT = process.env.PORT || 3001;

const validAnimalTypes = ['dog', 'cat', 'other'];
const validBreeds = [
  'german shepherd',
  'labrador',
  'golden retriever',
  'pit bull',
  'french bulldog',
  'rottweiler',
  'beagle',
  'yorkie',
  'dachshund',
  'boxer',
  'mixed dog breed',
  'other dog breed',
  'siamese',
  'persian',
  'maine coon',
  'ragdoll',
  'bengal',
  'abyssinian',
  'birman',
  'himalayan',
  'american shorthair',
  'mixed cat breed',
  'other cat breed',
  'other',
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
