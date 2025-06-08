import { IConfigService } from '../config/config.interface';
import axios from 'axios';
import FormData from 'form-data';
import { constants } from '../constants';

export class SpeechService {
  private readonly openaiApiKey: string;
  private readonly botToken: string;

  constructor(private readonly configService: IConfigService) {
    this.openaiApiKey = this.configService.get('OPENAI_API_KEY');
    this.botToken = this.configService.get('BOT_TOKEN');
  }

  async transcribeVoice(filePath?: string) {
    if (!filePath) {
      throw new Error('filePath does not exist');
    }

    const fileUrl = `https://api.telegram.org/file/bot${this.botToken}/${filePath}`;
    const { data } = await axios.get(fileUrl, { responseType: 'stream' });

    const formData = new FormData();
    formData.append('file', data, { filename: 'audio.ogg' });
    formData.append('model', 'whisper-1');

    return axios.post<{ text: string }>(
      constants.urls.openaiApi.transcriptions,
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.openaiApiKey}`,
          ...formData.getHeaders(),
        },
      }
    );
  }
}
