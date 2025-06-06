import { CommandBase } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { constants } from '../constants';

export class HelpCommand extends CommandBase {
  command = 'help';
  description = 'get help about bot';

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.help((ctx) => {
      if (ctx.chat.type === 'private') {
        ctx.reply('HElP');
      } else {
        ctx.reply(constants.commands.contactMe);
      }
    });
  }
}
