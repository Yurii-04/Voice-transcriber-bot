import { configService } from '../providers';

export const constants = {
  commands: {
    buttons: {
      addBotToChat: '➕ Add me to your chat',
    },
    contactMe: 'Hey :) send me DM if you have any questions about how to use me!',
    startText: `I am a bot that converts voice messages into text.\n\nJust send me a voice message and I'll quickly recognize what you said.`,
  },
  urls: {
    telegramGroupUrl: `https://t.me/${configService.get('BOT_USERNAME')}?startgroup=true`,
    openaiApi: 'https://api.openai.com/v1',
  },
};
