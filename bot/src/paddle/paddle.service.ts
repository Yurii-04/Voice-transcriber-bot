import { Environment, Paddle } from '@paddle/paddle-node-sdk';
import { IConfigService } from '../config/config.interface';
import { IPaddleService } from './paddle.interface';

export class PaddleService implements IPaddleService {
  private paddle: Paddle;
  private readonly paddleApiKey: string;
  private readonly priceId: string;

  constructor(
    configService: IConfigService,
    environment: Environment = Environment.sandbox
  ) {
    this.paddleApiKey = configService.get('PADDLE_API_KEY');
    this.paddle = new Paddle(this.paddleApiKey, {
      environment: environment,
    });
    this.priceId = configService.get('PADDLE_PRICE_ID');
  }

  async generatePayLink(userId: number): Promise<string> {
    const transaction = await this.paddle.transactions.create({
      items: [
        {
          priceId: this.priceId,
          quantity: 1,
        },
      ],
      customData: {
        userId: userId.toString(),
        source: 'telegram_bot',
      },
    });

    if (transaction.checkout?.url) {
      return transaction.checkout.url;
    }

    throw new Error('Checkout URL not generated');
  }
}
