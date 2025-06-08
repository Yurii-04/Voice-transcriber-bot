import { IBotContext } from '../context/context.interface';
import { Telegraf } from 'telegraf';

export abstract class CommandBase {
  abstract command: string;
  abstract description: string;

  protected constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
