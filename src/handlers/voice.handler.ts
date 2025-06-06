import { HandlerBase } from './handler.class';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { IBotContext } from '../context/context.interface';
import { IConfigService } from '../config/config.interface';
import axios from 'axios';
import FormData from 'form-data';
import { constants } from '../constants';

export class VoiceHandler extends HandlerBase {
  private readonly openaiApiKey: string;
  private readonly botToken: string;

  constructor(
    public bot: Telegraf<IBotContext>,
    private readonly configService: IConfigService
  ) {
    super(bot);
    this.openaiApiKey = this.configService.get('OPENAI_API_KEY');
    this.botToken = this.configService.get('BOT_TOKEN');
  }

  handle() {
    this.bot.on(message('voice'), async (ctx) => {
      const fileId = ctx.message.voice.file_id;
      const { file_path: filePath } = await ctx.telegram.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${this.botToken}/${filePath}`;

      const { data } = await axios.get(fileUrl, { responseType: 'stream' });
      const formData = new FormData();
      formData.append('file', data, { filename: 'audio.ogg' });
      formData.append('model', 'whisper-1');

      const response = await axios.post<{ text: string }>(
        `${constants.urls.openaiApi}/audio/transcriptions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            ...formData.getHeaders(),
          },
        }
      );

      ctx.reply(response.data.text, {
        reply_parameters: { message_id: ctx.message.message_id },
      });
    });
  }
}
