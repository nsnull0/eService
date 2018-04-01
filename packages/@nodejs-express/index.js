/** @returns {void} */
const noop = () => {};
const { NODE_ENV = "development" } = process.env;

require("app-module-path/register");
require("dotenv").config();

const _package = require("package");

const express = require("express");
const methodOverride = require("method-override");
const compression = require("compression");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const http = require("http");
const cors = require("cors");

let { log } = console;
let { argv: { service, port } } = require("yargs")
  .alias("s", "service")
  .alias("p", "port")
  .array("service");

/**
 * do `console.log` when NODE_ENV is not test
 */
log = NODE_ENV === "test" ? noop : log;

port = port || _package.port;

/**
 * map service to each port
 */
service = service
  .map(s => {
    s = s.toLowerCase().split(":");

    return { name: s[0], port: s[1] || port };
  })
  .reduce((a, b) => {
    a[b.port] = a[b.port] || [];
    a[b.port].push(b.name);

    return a;
  }, {});

/**
 * list of all demanded service, strip all unneeded service
 */
Object.keys(service).forEach(port => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());
  app.use(methodOverride());
  app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));
  app.use((req, res, next) => (req.startTime = Date.now()) && next());

  /**
   * res.json wrapper using { data }
   */
  app.use(require("libs/wrapperData"));

  /**
   * join service by port, enforce name to use `serviceA/serviceA.js` instead of `serviceA/index.js`
   */
  service[port].forEach(s => {
    const service = require(`service/${s}/${s}.js`)(app, express);

    service ? app.use(`/${s}`, service) : 0;
  });

  /**
   * if root is not set, return list of service name (possible for health check)
   */
  app.get("/", (req, res) => res.json(service[port]));

  /**
   * 404 routing & error handler
   */
  app.use((req, res, next) => {
    next(require("libs/error").NOT_FOUND);
  });

  /**
   * error wrapper
   */
  app.use(require("libs/wrapperError"));

  /**
   * create server
   */
  http
    .createServer(app)
    .listen(port, () => log(` :${port} >>> ${service[port]}`));
});
