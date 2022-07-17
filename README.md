# VCPKG Manifest

[![Dependency Review](https://github.com/lyquid/vcpkg-manifest/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/lyquid/vcpkg-manifest/actions/workflows/dependency-review.yml) [![CodeQL](https://github.com/lyquid/vcpkg-manifest/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/lyquid/vcpkg-manifest/actions/workflows/codeql-analysis.yml) [![Node.js CI](https://github.com/lyquid/vcpkg-manifest/actions/workflows/node.js.yml/badge.svg)](https://github.com/lyquid/vcpkg-manifest/actions/workflows/node.js.yml)

A webpage to generate your vcpkg.json files!

Read more about manifest mode [here](https://vcpkg.readthedocs.io/en/latest/users/manifests/).

Specification at [here](https://vcpkg.readthedocs.io/en/latest/specifications/manifests/).

## Available Scripts

In the project directory, you can run:

### `npm run client`

Runs the client app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server`

Runs the server app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the client app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Also builds the server app for production to the `dist` folder. The client app `build` folder is also copied to `dist`.
