import { CommandBase } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { checkVoiceDuration } from '../middlewares/check-voice-duration.middleware';
import { constants } from '../constants';
import { speechService } from '../providers';

export class TranscribeCommand extends CommandBase {
  command = 'transcribe';
  description = 'Manually transcribe voice ';

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.command('transcribe', checkVoiceDuration, async (ctx) => {
      const replyMessage = ctx.message.reply_to_message;
      if (!replyMessage || !('voice' in replyMessage)) {
        return ctx.reply(constants.errors.messages.onyForVoice);
      }

      const fileId = replyMessage.voice.file_id;
      const { file_path: filePath } = await ctx.telegram.getFile(fileId);
      const response = await speechService.transcribeVoice(filePath);

      ctx.reply(response.data.text, {
        reply_parameters: { message_id: ctx.message.message_id },
      });
    });
  }
}
