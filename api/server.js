const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { configureModules } = require("../lib/configure-modules");
const { registerGraphQL } = require("../graphql");

module.exports.startServer = async (config) => {
  const modules = await configureModules(config);
  const { log } = modules;
  const { port: PORT } = config;
  const server = express();

  log.info("permiles-api is starting...");
  server.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  server.use(express.static("public"));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());
  routes.registerAllRoutes(server, modules);
  server.use((error, req, res, next) => {
    res.status(422);
    res.json(error);
    next();
  });
  registerGraphQL(server, modules);
  // server.get('*', (req, res) => {
  //     res.sendFile(path.join(__dirname, '../public', 'index.html'));
  // });
  server.listen(PORT, () =>
    log.info({ PORT }, "permiles-api started succesfully")
  );

  return server;
};
