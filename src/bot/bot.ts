import { Telegraf } from 'telegraf';
import { CommandBase, CommandBasePrisma } from '../commands/command.class';
import { StartCommand } from '../commands/start.command';
import { HelpCommand } from '../commands/help.command';
import { IBotContext } from '../context/context.interface';
import { IConfigService } from '../config/config.interface';
import { HandlerBase } from '../handlers/handler.class';
import { VoiceHandler } from '../handlers/voice.handler';
import { IPrismaService } from '../prisma/prisma.interface';

export class Bot {
  bot: Telegraf<IBotContext>;
  commands: CommandBase[] | CommandBasePrisma = [];
  handlers: HandlerBase[] = [];

  constructor(
    private readonly configService: IConfigService,
    private readonly prismaService: IPrismaService
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
  }

  async init() {
    this.commands = [new StartCommand(this.bot), new HelpCommand(this.bot)];
    this.handlers = [new VoiceHandler(this.bot, this.configService)];

    this.commands.forEach((command) => command.handle());
    this.handlers.forEach((handler) => handler.handle());

    await this.bot.telegram.setMyCommands(
      this.commands.map((cmd) => ({
        command: cmd.command,
        description: cmd.description,
      }))
    );

    await this.bot.launch();
  }
}
