import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // 実行されたSQLをログに出す設定
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;