import dotenv from "dotenv";

import "reflect-metadata";
import "./shared/containers";

import { LogType } from "./shared/providers/ILogger";
import { ConsoleLogger } from "./shared/providers/implementations/ConsoleLogger";
import { ExpressHTTPServer } from "./shared/providers/implementations/Express/ExpressHTTPServer";

dotenv.config();

const http = new ExpressHTTPServer();
const logger = new ConsoleLogger();

try {
  logger.log(LogType.INFO, "Starting Core Server services");

  let port = 5000;
  if (typeof process.env.PORT === "undefined") {
    logger.log(
      LogType.WARNING,
      "HTTP Server port not defined on environment, using default port 5000 instead."
    );
  } else {
    port = parseInt(process.env.PORT, 10);
  }

  logger.log(LogType.INFO, `Starting HTTP Server on port ${port}`);
  http.start(port);
  logger.log(LogType.SUCCESS, "HTTP Server started successfully");

  logger.log(LogType.SUCCESS, "Finished Core Server startup");
} catch (e) {
  logger.log(
    LogType.ERROR,
    `A Fatal Error occurred trying to start the Core Server: ${e.message}`
  );
}
