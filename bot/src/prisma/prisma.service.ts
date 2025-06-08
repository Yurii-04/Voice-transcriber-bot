import { PrismaClient } from '@prisma/client';
import { IPrismaService } from './prisma.interface';

export class PrismaService extends PrismaClient implements IPrismaService {
  async connect(): Promise<void> {
    await this.$connect();
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}
