import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';

export abstract class CommandBase {
  abstract command: string;
  abstract description: string;

  protected constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}

export abstract class CommandBasePrisma extends CommandBase {
  protected constructor(
    public bot: Telegraf<IBotContext>,
    protected readonly prismaService: PrismaService
  ) {
    super(bot);
  }
}
