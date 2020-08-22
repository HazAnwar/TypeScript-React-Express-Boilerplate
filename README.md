# TypeScript Boilerplate (React with Express)

**Please feel free to raise a pull request if you think there's anything else worth adding to this project. Use at own risk. :)**

## Introduction

This boilerplate code is built using predominantly TypeScript with yarn. The frontend is built in React with a backend running an Express server coupled with Webpack to minify and serve it accordingly with SASS CSS. Babel, ESLint and Prettier have also been implemented with TypeScript support to maintain code cleanliness.

## Getting Started

Clone the project to your local device and install the dependencies by running:

### `yarn`

## Run App in Dev Mode

In order to get the application running in a local development mode to make changes with hot reloading, you will need to have two separate bash terminals open and will need to run

### `yarn start:webapp`

to get the front-end of the application running (`src/client`) and also

### `yarn start:server`

to get the server of the application running (`src/server`) in the root folder of each terminal session respectively.

## Run App in Production Mode

In order to run the web application in production mode, you can just run

### `yarn start`

which will automatically build and serve the frontend and backend simultaneously.

## Linting

In order to run a linting check you can run 

### `yarn lint`

and similarly to fix any linting issues automatically you can run

### `yarn lint:fix`
