import { CommandBase } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { IPaddleService } from '../paddle/paddle.interface';

export class SubscribeCommand extends CommandBase {
  command = 'subscribe';
  description = 'Get a link to subscribe';

  constructor(
    bot: Telegraf<IBotContext>,
    private readonly paddleService: IPaddleService
  ) {
    super(bot);
  }

  handle() {
    this.bot.command(this.command, async (ctx) => {
      const userId = ctx.from.id;
      const url = await this.paddleService.generatePayLink(userId);

      ctx.reply('To subscribe, please follow the link', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Click me',
                url: url,
              },
            ],
          ],
        },
      });
    });
  }
}
