import { ConfigService } from '../config/config.service';
import { PrismaService } from '../prisma/prisma.service';

export const configService = new ConfigService();
export const prismaService = new PrismaService();
