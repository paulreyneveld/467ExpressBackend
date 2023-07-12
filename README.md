# 467ExpressBackend

This is the backend application for the Pet Adoption Web Application.

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
