import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import ErrorMiddleWare from './middleware/error.middleware';
import Controller from './utils/interfaces/controller.Interface';

class App {
  public express: Application;

  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDataBaseConnection();
    this.initializeMiddleWare();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use('api/v1/', controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleWare);
  }

  private initializeDataBaseConnection(): void {
    const { MONGO_USER, MONGO_PASS } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.x1vlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  }

  public listen(): void {
    this.express.listen(this.port, () =>
      console.log(`server is running on port ${this.port}`)
    );
  }
}

export default App;
