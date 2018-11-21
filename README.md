# generator-express-no-stress-typescript-mongoose

![](https://img.shields.io/badge/status-stable-green.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/21e362094c5a4c0da4841fc172cee95d)](https://www.codacy.com/app/cdimascio/generator-express-no-stress-typescript?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cdimascio/generator-express-no-stress-typescript&amp;utm_campaign=Badge_Grade) ![](https://img.shields.io/badge/license-MIT-blue.svg)

This project is a Mongoose/Mongo variant of [generator-express-no-stress-typescript](https://github.com/cdimascio/generator-express-no-stress-typescript)

Create awesome [Express.js](www.expressjs.com) applications with best of breed tech including [Typescipt](https://www.typescriptlang.org/), structured logging with [Pino](https://github.com/pinojs/pino), API validation and interactive documentation via [Swagger](http://swagger.io/), environment based config with [dotenv](https://github.com/motdotla/dotenv).

<p align="center">
<img src="https://raw.githubusercontent.com/cdimascio/generator-express-no-stress-typescript/master/assets/express-no-stress-logo-ts.jpg"
</p>

generator-express-no-stress-typescript gets you up and running in seconds. It's ridiculously easy to configure. Heck, just take the defaults. Start it. Write code.

This generator scaffolds a fully functioning REST API server complete with interactive documentation, API validation, structured logging, environment driven config, and more. Simply run the generator and smile :-D

This project is a Typescript variant of [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress)

[Here's what you get!](#what-you-get)

## Install

_Requires Node 6 or greater_

```shell
npm install -g yo generator-express-no-stress-typescript
```

- See [here](#usage-cli) for use with Yarn and/or Docker

## Scaffold

```shell
yo express-no-stress-typescript myapp
cd myapp
```

## Run

Run in _development mode_:

```shell
npm run dev
```

Package and run in _production mode_

```shell
npm run compile
npm start
```

## Test

```shell
npm test
```

## Debug

Run one of the following, then attach your favorite inspector.

```shell
# debug the server
npm run dev:debug

# debug the tests
npm run test:debug
```

## Try it!

- Interactive API doc at [http://localhost:3000/api-explorer](http://localhost:3000/api-explorer)
- Landing page at [http://localhost:3000](http://localhost:3000)

---

## Usage: CLI

```shell
yo express-no-stress-typescript [appname] [--yarn] [--docker]
```

| Option     | default | Description                                                                |
| ---------- | ------- | -------------------------------------------------------------------------- |
| `appname`  | myapp   | The application folder                                                     |
| `--yarn`   | -       | Use the [`yarn`](https://yarnpkg.com) package manager, instead of `npm`    |
| `--docker` |         | Install [Docker](https://www.docker.com/) artifacts including a Dockerfile |

## Usage: Project

The sections below describe all usage options available once the project is generated/scaffolded.

### npm targets

| Target               | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `npm run dev`        | Run in _development_ mode                                                |
| `npm run dev:debug`  | Debug in _development_ mode                                              |
| `npm run test`       | Run tests                                                                |
| `npm run test:debug` | Debug tests                                                              |
| `npm run compile`    | Transpile source code for production use                                 |
| `npm start`          | Run the in _production_ mode. \*Requires running `npm run compile` first |

### Deploy to the Cloud

e.g. CloudFoundry

```
cf push myapp
```

### Use Yarn

```
# scaffold
yo express-no-stress-typescript myapp --yarn

# start
cd myapp
npm start
```

---

## What you get!

- [Typescript](https://www.typescriptlang.org/) - Typescript is a typed superset of JavaScript that compiles to plain JavaScript
- [Express.js](www.expressjs.com) - Fast, unopinionated
  , minimalist web framework for Node.js
- [Pino](https://github.com/pinojs/pino) - Extremely fast node.js logger, inspired by Bunyan. It also includes a shell utility to pretty-print its log files
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
- [Swagger](http://swagger.io/) - is a simple yet powerful representation of your RESTful API.
- [SwaggerUI](http://swagger.io/) - dynamically generate beautiful documentation and sandbox from a Swagger-compliant API

### API Validation

Simply describe your APIs with Swagger and automagically get for free:

- Interactive documentation
- API validation

#### Interactive API Doc

![](https://github.com/cdimascio/generator-express-no-stress-typescript/raw/master/assets/interactive-doc1.png)

#### API Validation!

Oops! I the API caller forgot to pass a `name` field, no stress, we've got this!

![](https://github.com/cdimascio/generator-express-no-stress-typescript/raw/master/assets/api-validation.png)

### Structured Logging

Structured logging out of the box!

#### raw

![](https://github.com/cdimascio/generator-express-no-stress-typescript/raw/master/assets/logging-raw.png)

#### pretty

Structured logging pretty printed by default - great for dev!

![](https://github.com/cdimascio/generator-express-no-stress-typescript/raw/master/assets/logging-pretty.png)

### API Validation Example

Simply describe your APIs with Swagger and automatically get:

- API request validation
- Interactive documentation

### example

#### Swagger API spec

```yaml
swagger: '2.0'
info:
  version: 1.0.0
  title: myapp
  description: My cool app
basePath: /api/v1
tags:
  - name: Examples
    description: Simple example endpoints
  - name: Specification
    description: The swagger API specification

consumes:
  - application/json
produces:
  - application/json

definitions:
  ExampleBody:
    type: object
    title: example
    required:
      - name
    properties:
      name:
        type: string
        example: no_stress

paths:
  /examples:
    get:
      tags:
        - Examples
      description: Fetch all examples
      responses:
        200:
          description: Returns all examples
    post:
      tags:
        - Examples
      description: Create a new example
      parameters:
        - name: example
          in: body
          description: an example
          required: true
          schema:
            $ref: '#/definitions/ExampleBody'
      responses:
        200:
          description: Returns all examples

  /examples/{id}:
    get:
      tags:
        - Examples
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the example to retrieve
          type: integer
      responses:
        200:
          description: Return the example with the specified id
        404:
          description: Example not found

  /spec:
    get:
      tags:
        - Specification
      responses:
        200:
          description: Return the API specification
```

#### Invoke a POST request via the Interactive doc

![](https://github.com/cdimascio/generator-express-no-stress-typescript/raw/master/assets/interactive-doc.png)

## License

[MIT](LICENSE)
