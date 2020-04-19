# Tesla Web App

**This is an open source project for a web application that interacts with Tesla's official API. This project is not endorced by Tesla in any way, shape or form.**

## Introduction

This web application is built using predominantly TypeScript. The frontend is built in React with a backend running an Express server coupled with Webpack to minify and serve it accordingly. ESLint and Prettier have also been implemented with TypeScript support to maintain code cleanliness.

## Getting Started

Clone the project to your local device and install the dependencies by running:

#### `yarn`

### Development Mode

In order to get the application running in a local development mode to make changes with hot reloading, you will need to have two separate bash terminals open and will need to run

#### `yarn start:dev`

and also

#### `yarn start:server`

in the root folder of each terminal session respectively.

### Production

In order to run the web application in production mode, you can just run

#### `yarn start`

which will automatically build and serve the frontend and backend simultaneously.

### Linting

In order to run a linting check you can run 

#### `yarn lint`

and similarly to fix any linting issues automatically you can run

#### `yarn lint:fix`