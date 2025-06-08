export const constants = {
  consts: {
    maxVoiceDuration: 600,
  },
  commands: {
    buttons: {
      addBotToChat: '➕ Add me to your chat',
    },
    contactMe: {
      text: 'Hey :) send me DM if you have any questions about how to use me!',
      btn: 'Contact me',
    },
    startText: `I am a bot that converts voice messages into text.\n\nJust send me a voice message and I'll quickly recognize what you said.`,
    help: {
      text:
        'You can use the bot for free if you send voice messages to the bot directly. However, if you want to add the bot to your group, you will have to pay. \n' +
        'The price of using the Voice transcriber bot is a symbolic $10 per month (to pay for the openAI API).\n\n' +
        'I will attach a link to the GitHub repository if you want to deploy the bot locally, and my telegram for cooperation or if you have any questions',
    },
  },
  urls: {
    tMe: `https://t.me/`,
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
