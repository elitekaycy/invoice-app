import express, { RequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import invoiceRouter from "./routes/index";
import "./db/dbConnnect.";
import helmet from "helmet";
// connect to postgress database
// create a database scheme
// solidify the create invoice route and the get invoice routes

// connect those routes to the frontend
// set up C1/CD for backend

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
  }

  private config() {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private routerSetup() {
    this.app.use("/", invoiceRouter);
  }
}

export default new App().app;
