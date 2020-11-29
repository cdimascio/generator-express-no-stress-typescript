# generator-express-no-stress-typescript

![](https://img.shields.io/badge/status-stable-green.svg) ![](https://img.shields.io/npm/v/generator-express-no-stress-typescript.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/21e362094c5a4c0da4841fc172cee95d)](https://www.codacy.com/app/cdimascio/generator-express-no-stress-typescript?utm_source=github.com&utm_medium=referral&utm_content=cdimascio/generator-express-no-stress-typescript&utm_campaign=Badge_Grade) [![](https://img.shields.io/gitter/room/cdimascio-oss/community?color=%23eb205a)](https://gitter.im/cdimascio-oss/community) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END --> ![](https://img.shields.io/badge/license-MIT-blue.svg)
Create awesome [Express.js](http://www.expressjs.com) applications with best of breed tech including [Typescript](https://www.typescriptlang.org/), structured logging with [Pino](https://github.com/pinojs/pino), API validation and interactive documentation via an [OpenAPI 3](https://swagger.io/specification/) or [Swagger 2](https://swagger.io/specification/v2/) spec, environment based config with [dotenv](https://github.com/motdotla/dotenv).

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
- [Express.js](https://www.expressjs.com) - Fast, unopinionated
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

## FAQ
**Q**: How do I modify the example API and make it my own?

**A**: There are two key files that enable you to customize and describe your API:
1. `server/routes.ts` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.
2. `server/common/api.yaml` - This file contains your [OpenAPI spec](https://swagger.io/specification/). Describe your API here. It's recommended that you to declare any and all validation logic in this YAML. `express-no-stress-typescript`  uses [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) to automatically handle all API validation based on what you've defined in the spec.

**Q**: I previously generated an app, but I want to change the API root. How do I do this?

**A**: You need to make to small changes
  1. Modify `server/routes.ts`
  ```javascript
     // Change your original path e.g. /api/v1/examples, to:
     app.use('/api/v2/examples', examplesRouter);
   ```

  2. Modify `server/common/api.yaml` and update the api root:
  ```yaml
    # Change e.g. /api/v1 to /api/v2
    servers:
    - url: /api/v2   
  ```

## License

[MIT](LICENSE)

<a href="https://www.buymeacoffee.com/m97tA5c" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://blog.brakmic.com"><img src="https://avatars1.githubusercontent.com/u/56779?v=4" width="100px;" alt=""/><br /><sub><b>Harris Brakmić</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=brakmic" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/pubkeypubkey"><img src="https://avatars3.githubusercontent.com/u/8926560?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Meyer</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=pubkey" title="Documentation">📖</a></td>
    <td align="center"><a href="https://otaku.codes"><img src="https://avatars0.githubusercontent.com/u/13603045?v=4" width="100px;" alt=""/><br /><sub><b>Viraj Trivedi</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=inf3cti0n95" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/uronly14me"><img src="https://avatars2.githubusercontent.com/u/5186814?v=4" width="100px;" alt=""/><br /><sub><b>Sangbeom Han</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=uronly14me" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.stefdegoey.nl"><img src="https://avatars2.githubusercontent.com/u/3907488?v=4" width="100px;" alt=""/><br /><sub><b>Stef de Goey</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=Steffion" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Rogermax"><img src="https://avatars1.githubusercontent.com/u/2633254?v=4" width="100px;" alt=""/><br /><sub><b>Roger</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=Rogermax" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bagofjuice"><img src="https://avatars3.githubusercontent.com/u/1395172?v=4" width="100px;" alt=""/><br /><sub><b>Vikash Chauhan</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=bagofjuice" title="Code">💻</a> <a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=bagofjuice" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/tsekityam"><img src="https://avatars3.githubusercontent.com/u/3814422?v=4" width="100px;" alt=""/><br /><sub><b>Tse Kit Yam</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=tsekityam" title="Documentation">📖</a> <a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=tsekityam" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@rlkamradt"><img src="https://avatars3.githubusercontent.com/u/6883379?v=4" width="100px;" alt=""/><br /><sub><b>Randy Kamradt</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=rkamradt" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/2u6z3r0"><img src="https://avatars0.githubusercontent.com/u/10853329?v=4" width="100px;" alt=""/><br /><sub><b>Vitthal Patil</b></sub></a><br /><a href="https://github.com/cdimascio/generator-express-no-stress-typescript/commits?author=2u6z3r0" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
