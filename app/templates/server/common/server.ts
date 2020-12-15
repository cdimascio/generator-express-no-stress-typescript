import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import connectMongoDB from '../db';
<% if (specification === 'openapi_3') { %>
import errorHandler from '../api/middlewares/error.handler'
import * as OpenApiValidator from 'express-openapi-validator';
<% } else { %>
import installValidator from './swagger';
<% } %>

const app = express();

connectMongoDB();

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb'}));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    <% if (specification === 'openapi_3') { %>
    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
    app.use(OpenApiValidator.middleware({
      apiSpec,
      validateResponses,
      ignorePaths: /.*\/spec(\/|$)/,
    }));
    <% } %>
  }

  router(routes: (app: Application) => void): ExpressServer {
    <% if (specification === 'openapi_3') { %>
    routes(app);
    app.use(errorHandler);
    return this
    <% } else { %>
    this.routes = routes;
    return this;
    <% } %>
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
    l.info(
      `up and running in ${
        process.env.NODE_ENV || 'development'
      } @: ${os.hostname()} on port: ${p}}`
    );
    <% if (specification === 'openapi_3') { %>
    http.createServer(app).listen(port, welcome(port));
    <% } else { %>
    installValidator(app, this.routes).then(() => {
      http.createServer(app).listen(port, welcome(port));
    }).catch(e => {
      l.error(e);
      process.exit(1)
    });
    <% } %>
    return app;
  }
}
