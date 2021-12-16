import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { Server } from "http";

import { AppError } from "../../../../errors/AppError";
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
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      }
    );

    this.server = this.app.listen(port);
  }

  stop(): void {
    this.server.close();
  }
}

export { ExpressHTTPServer };
