import { Request, Response } from 'express';
import { PaddleService } from '../services/paddle.service';

export class CheckoutController {
  constructor(private readonly paddleService: PaddleService) {}

  public renderCheckoutPage(req: Request, res: Response): void {
    const transactionId = req.query._ptxn as string;
    const html = this.paddleService.generateHtml(transactionId);
    res.send(html);
  }
}
