# 🎆 Release

## Steps

1. `$ npm run verify`
1. Edit version in `package.json`
1. `$ npm i`
1. Commit `package.json` & `package-lock.json`
1. `$ npm publish`
1. Create git tag for version using version for tag and description
   - Example: `0.0.10`
1. `$ git push --follow-tags`
1. Update [tf-example](https://github.com/testingrequired/tf-example)
   1. `$ npm i testframe@latest`
   1. `$ npm ci`
   1. `$ npm run test`
   1. Fix any errors that may occur from breaking changes
   1. Commit `package.json` & `package-lock.json`
   1. `$ git push`
