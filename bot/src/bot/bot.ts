import { Telegraf } from 'telegraf';
import { CommandBase } from '../commands/command.class';
import { StartCommand } from '../commands/start.command';
import { HelpCommand } from '../commands/help.command';
import { IBotContext } from '../context/context.interface';
import { IConfigService } from '../config/config.interface';
import { HandlerBase } from '../handlers/handler.class';
import { VoiceHandler } from '../handlers/voice.handler';
import { IPrismaService } from '../prisma/prisma.interface';
import { constants } from '../constants';
import { TranscribeCommand } from '../commands/transcribe.command';
import { SubscribeCommand } from '../commands/subscribe.command';
import { IPaddleService } from '../paddle/paddle.interface';

export class Bot {
  bot: Telegraf<IBotContext>;
  commands: CommandBase[] = [];
  handlers: HandlerBase[] = [];

  constructor(
    private readonly configService: IConfigService,
    private readonly prismaService: IPrismaService,
    private readonly paddleService: IPaddleService
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
  }

  private setupErrorHandling() {
    this.bot.catch((err, ctx) => {
      console.error(err);
      const msgId = ctx?.message?.message_id;

      if (msgId) {
        void ctx.reply(constants.errors.messages.somethingWentWrong, {
          reply_parameters: { message_id: msgId },
        });
      } else {
        void ctx.reply(constants.errors.messages.somethingWentWrong);
      }
    });
  }

  async init() {
    this.commands = [
      new StartCommand(this.bot, this.configService),
      new HelpCommand(this.bot, this.configService),
      new TranscribeCommand(this.bot),
      new SubscribeCommand(this.bot, this.paddleService),
    ];

    this.handlers = [new VoiceHandler(this.bot)];

    this.commands.forEach((command) => command.handle());
    this.handlers.forEach((handler) => handler.handle());

    this.setupErrorHandling();

    await this.bot.telegram.setMyCommands(
      this.commands.map((cmd) => ({
        command: cmd.command,
        description: cmd.description,
      }))
    );

    await this.bot.launch();
  }
}
