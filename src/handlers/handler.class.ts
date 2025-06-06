import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export abstract class HandlerBase {
  protected constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
