import { CommandBase } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { constants } from '../constants';
import { IConfigService } from '../config/config.interface';

export class HelpCommand extends CommandBase {
  command = 'help';
  description = 'Get help about bot';

  constructor(
    bot: Telegraf<IBotContext>,
    private readonly configService: IConfigService
  ) {
    super(bot);
  }

  handle() {
    this.bot.help((ctx) => {
      if (ctx.chat.type === 'private') {
        ctx.reply('HElP');
      } else {
        ctx.reply(constants.commands.contactMe.text, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: constants.commands.contactMe.btn,
                  url: `${constants.urls.tMe}${this.configService.get('BOT_USERNAME')}`,
                },
              ],
            ],
          },
        });
      }
    });
  }
}
