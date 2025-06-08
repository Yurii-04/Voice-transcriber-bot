import { Router } from 'express';
import { CheckoutController } from '../controllers/checkout.controller';
import { PaddleService } from '../services/paddle.service';
import { configService } from '../provider';

const router = Router();
const paddleService = new PaddleService(configService);
const checkoutController = new CheckoutController(paddleService);

router.get('/', (req, res) => checkoutController.renderCheckoutPage(req, res));

export default router;
