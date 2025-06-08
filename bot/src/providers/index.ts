import { ConfigService } from '../config/config.service';
import { PrismaService } from '../prisma/prisma.service';
import { SpeechService } from '../speech/speech.service';
import { PaddleService } from '../paddle/paddle.service';

export const configService = new ConfigService();
export const prismaService = new PrismaService();
export const speechService = new SpeechService(configService);
export const paddleService = new PaddleService(configService);
