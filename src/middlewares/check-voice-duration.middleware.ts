import { MiddlewareFn } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { constants } from '../constants';

export const checkVoiceDuration: MiddlewareFn<IBotContext> = async (ctx, next) => {
  if (!ctx.message || !('voice' in ctx.message)) {
    return next();
  }

  const duration = ctx.message.voice.duration;
  const maxVoiceDuration = constants.consts.maxVoiceDuration;

  if (duration > maxVoiceDuration) {
    await ctx.reply(
      `I'm sorry, I can't process a voice message that is longer than ${maxVoiceDuration} seconds`,
      {
        reply_parameters: { message_id: ctx.message.message_id },
      }
    );
    return;
  }

  return next();
};
