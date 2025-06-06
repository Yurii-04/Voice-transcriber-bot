import { CommandBase } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';
import { constants } from '../constants';

export class StartCommand extends CommandBase {
  command = 'start';
  description = 'start bot';

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
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
                  url: constants.urls.telegramGroupUrl,
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
