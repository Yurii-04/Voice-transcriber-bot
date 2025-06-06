import { configService, prismaService } from './providers';
import { Bot } from './bot/bot';

(async () => {
  await prismaService.connect();

  const bot = new Bot(configService, prismaService);
  await bot.init();
})();
