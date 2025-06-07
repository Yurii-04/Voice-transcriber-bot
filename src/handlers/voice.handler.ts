import { HandlerBase } from './handler.class';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { IBotContext } from '../context/context.interface';
import { speechService } from '../providers';
import { checkVoiceDuration } from '../middlewares/check-voice-duration.middleware';

export class VoiceHandler extends HandlerBase {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.on(message('voice'), checkVoiceDuration, async (ctx) => {
      const fileId = ctx.message.voice.file_id;
      const { file_path: filePath } = await ctx.telegram.getFile(fileId);

      const response = await speechService.transcribeVoice(filePath);

      ctx.reply(response.data.text, {
        reply_parameters: { message_id: ctx.message.message_id },
      });
    });
  }
}
