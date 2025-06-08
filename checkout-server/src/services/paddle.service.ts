import { ConfigService } from './config.service';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class PaddleService {
  private readonly token: string;
  private readonly template: string;

  constructor(configService: ConfigService) {
    this.token = configService.get('PADDLE_CLIENT_SIDE_TOKEN');
    this.template = fs.readFileSync(
      path.join(__dirname, '..', 'templates', 'checkout-template.html'),
      'utf-8'
    );
  }

  public generateHtml(transactionId: string) {
    return this.template
      .replace('{{token}}', this.token)
      .replace('{{transactionId}}', transactionId);
  }
}
