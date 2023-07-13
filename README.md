# 467ExpressBackend

This is the backend application for the Pet Adoption Web Application.

## Data Model

The web application stores 2 kinds of entities in Google Cloud Datastore: Users and Pets. The tables below outline the properties of each entity and their data types, as supported by Datastore.

### Users

Property | Data Type | Notes
--- | --- | ---
name | String | The name of the user.
birthday | Date and Time | The birthdate of the user.
email | String | The email that the user used for account creation.
phoneNumber | String | The user's 10-digit phone number.

### Pets

Property | Data Type | Notes
--- | --- | ---
typeAnimal | String | The type of animal. The value of this property is either "Dog", "Cat", or "Other".
breed | String | The animal breed. The value of this property includes common breeds and "Other".
description | String | A description of the animal.
images | Array | An array containing publicly accessible URLs to images of the animal stored in Google Cloud Storage.
goodWithAnimals | Boolean | The animal is good with other animals: True or False.
goodWithChildren | Boolean | The animal is good with children: True or False.
leashedAllTimes | Boolean | The animal must be leashed at all times while in public: True or False.
creationDate | Date and Time | The date that the animal profile was created.
availability | String | The availability of the animal for adoption. The value of this property is either "Not Available", "Available", "Pending" or "Adopted".

## Prerequisites

Before running the application, be sure to have the required dependencies installed on your machine:

- [Docker](https://www.docker.com)

## Getting Started

To run this application locally:

1. Clone the repository.

2. Build the Docker image:

```bash
docker build -t pet-app .
```

3. Run the container based off the image:

```bash
docker run -p 3001:3001 pet-app
```

4. Access the application in the browser at `http://localhost:3001`.

## Configuration

WIP (environment variables, etc)

## Development

To set up the development environment, follow these steps in the root of the directory:

1. Install dependencies:

```bash
npm install
```

2. Start the application in development mode:

```bash
npm run dev
```

3. Access the application in the browser at `http://localhost:3001`.

## Testing

WIP
