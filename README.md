# Ghostery Auth Web

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidXdUZEVhWGM3cEg5eEtLeDZsaSs1QVFTRDV4OTJXUHA4aGlORE9iMjFrNzNsU25UeU9yU2pEdkpiK0JXOGV4c3IxRGtsdFgrZ0dCZnhkN1BrcHhEYkNnPSIsIml2UGFyYW1ldGVyU3BlYyI6InF1WjhsMzNVMWExcTB1cFMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

User authentication web app for [signon.ghostery.com](signon.ghostery.com). Handles user sign-on, account creation, password reset and email verification.

## Installation

#### Install yarn
**https://yarnpkg.com/en/docs/install**

#### Install local npm packages
```sh
$ yarn install --frozen-lockfile
```

#### Upgrade packages
```sh
# Upgrade packages according to package.json version range
# https://yarnpkg.com/en/docs/cli/upgrade/
$ yarn upgrade
```

## Building
```sh
# Build all sources
$ yarn build.dev
```

```sh
# Build for production
$ yarn build.prod
```

```sh
# Build and watch for changes
$ yarn build.watch
```

## Configuration

+ Update [config/development.json](config/development.json)


## Running the App Locally

```sh
$ node .
```
Alternatively, consider using `nodemon` to watch for changes in the node portion
of the project.

```sh
# Install nodemon if you havent already
npm install -g nodemon
```

```sh
$ nodemon
```

Visit [http://localhost:3000/](http://localhost:3000/en)

## Translating Files
We use Transifex and their CLI to manage our translation files. Follow
[these instructions](https://docs.transifex.com/client/installing-the-client)
to get started.

Note: There is no need to run `tx config` as the project has already been
configured to work with Transifex. See the configuration file in `.tx/config`.

Next, [generate an API Token](https://www.transifex.com/user/settings/api/),
run `tx init`, and paste the generated API Token when prompted.  This will
allow the computer to push (Submit) and pull (Download) files to/from Transifex.

```sh
# Submit translation files to Transifex
$ tx push -s
```

```sh
# Download translated files from Transifex
$ tx pull -a
```

```sh
# Add the placeholders into the downloaded translation files.
$ node tools/transifex.js
```

