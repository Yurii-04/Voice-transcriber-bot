import { CommandBase } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';
import { constants } from '../constants';
import { IConfigService } from '../config/config.interface';
import * as fs from 'node:fs';
import path from 'node:path';

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
        const videoPath = path.join(__dirname, '..', 'assets', 'welcome-video.mp4');
        ctx.replyWithVideo(
          { source: fs.createReadStream(videoPath) },
          {
            caption: constants.commands.startText,
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
          }
        );
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
