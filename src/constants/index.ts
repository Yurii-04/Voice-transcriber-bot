export const constants = {
  consts: {
    maxVoiceDuration: 600,
  },
  commands: {
    buttons: {
      addBotToChat: '➕ Add me to your chat',
    },
    contactMe: 'Hey :) send me DM if you have any questions about how to use me!',
    startText: `I am a bot that converts voice messages into text.\n\nJust send me a voice message and I'll quickly recognize what you said.`,
  },
  urls: {
    openaiApi: {
      transcriptions: 'https://api.openai.com/v1/audio/transcriptions',
    },
  },
  errors: {
    messages: {
      somethingWentWrong: 'Oops, something went wrong 😓',
      onyForVoice: 'This command applies only to voice messages',
    },
  },
};
