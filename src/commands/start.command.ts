import { CommandBase } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';
import { constants } from '../constants';
import { IConfigService } from '../config/config.interface';

export class StartCommand extends CommandBase {
  private readonly telegramGroupUrl: string;
  command = 'start';
  description = 'start bot';

  constructor(
    bot: Telegraf<IBotContext>,
    private readonly configService: IConfigService
  ) {
    super(bot);
    this.telegramGroupUrl = `https://t.me/${this.configService.get('BOT_USERNAME')}?startgroup=true`;
  }

  handle(): void {
    this.bot.start((ctx) => {
      if (ctx.chat.type === 'private') {
        ctx.reply(constants.commands.startText, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: constants.commands.buttons.addBotToChat,
                  url: this.telegramGroupUrl,
                },
              ],
            ],
          },
        });
      } else {
        ctx.reply(constants.commands.contactMe);
      }
    });
  }
}
