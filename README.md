# Problems & Observations

- There were some problems (403 error, CORS) with the original API server. **Solution**: mock json-server API;
- The API key does not take into context the number combination.

# How it works

This is a simple loan calculator, which calculates interest rate based on given parameters and outputs the monthly repayment value.

### Making requests to the backend API

If you want to change the API URL to a local mock json-server, simply edit `src/environments/consts/{env}.ts` and change `api_url` to the local server's URL (i.e. `localhost:3000`).

To start a mock json-server for local run, simply use:
`npm run mock:server`

# Getting started

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally. We use [NPM](hhttps://nodejs.org/en/download) to manage the dependencies, so we strongly recommend you to use it. you can install it from [Here](https://nodejs.org/en/downloadl), then run `npm install` to resolve all dependencies (might take a minute).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project
Run `npm run build:prod` to build the project in production environment. The build artifacts will be stored in the `dist/` directory.

## Functionality overview

The application is a loan calculator site. It uses a custom API for all requests.

**General functionality:**

- POST loan calculations

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - Redirects to /#/calculators/personal
- Sign in/Sign up pages (URL: /#/calculators/personal )
    - Use given parameters to calculate loan interest and monthly repayment

## Unit testing

To generate a new test coverage report, use:
<br />
`ng test --watch=false --code-coverage`
<br />
`npm install -g http-server`
<br />
`cd coverage/`
<br />
`http-server -c-1 .`

## E2E testing
Using [cypress](https://www.cypress.io/) for E2E testing.

To launch, simply run `npm run cypress:open` in CLI.

## Test coverage
![image](https://user-images.githubusercontent.com/44019590/231623575-f76a8a73-3a6b-404c-b4f5-d5c13621c280.png)

## CI/CD
Projects works with a CI/CD principle using [TravisCI](https://app.travis-ci.com/github/R3purg/simple-loan-calculator) tool.

<br />
