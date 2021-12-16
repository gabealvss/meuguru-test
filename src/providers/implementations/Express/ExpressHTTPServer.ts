import express from "express";
import { Server } from "http";

import { IHTTPServer } from "../../IHTTPServer";
import { router } from "./routes";

class ExpressHTTPServer implements IHTTPServer {
  private app = express();
  private server: Server;

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api/v1", router);
  }

  start(port: number): void {
    this.server = this.app.listen(port);
  }

  stop(): void {
    this.server.close();
  }
}

export { ExpressHTTPServer };
