# Development

## Getting Started

1. `$ git clone git@github.com:testingrequired/tf.git`
2. `$ npm i`
3. `$ npm run verify`

## Versioning

The project currently only increments patch version until the release cut. Breaking changes are expected. This is not production ready.

## Learning

The [anatomy](ANATOMY.md) documentation covers basic domain types and interfaces.

## Starting

Take a look at [good first issues](https://github.com/testingrequired/tf/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

## Scripts

### test

Run unit tests: `./src/**/*.test.ts`.

Ran with `jest`

### coverage

Run unit tests with code coverage enabled.

### cli

Builds and runs `bin/tf.js`. It serves as an integration test as well running all tests matching `./tests/**/*.test.js`.

#### Debugging

The `.vscode` folder contains configuration to debug while running this.

### verify

Runs `test` and `cli` to verify functionality.

### build

Build project and typescript type definition files.

### pack-preview

Build and pack in to `testingrequired-tf-VERSION.tgz` file. Useful for installing for local testing.
