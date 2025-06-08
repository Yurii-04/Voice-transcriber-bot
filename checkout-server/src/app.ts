import express, { Application } from 'express';
import dotenv from 'dotenv';
import checkoutRoutes from './routes/checkout.route';

dotenv.config();

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupRoutes()
  }

  private setupRoutes(): void {
    this.app.use('/', checkoutRoutes);
  }
}
