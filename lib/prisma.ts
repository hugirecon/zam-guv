// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const dbUrl =
    process.env.DATABASE_URL?.startsWith("file:./")
      ? process.env.DATABASE_URL.replace("file:./", "file:///Users/kdtsuperapp/zam-guv/")
      : process.env.DATABASE_URL || "file:///Users/kdtsuperapp/zam-guv/dev.db";

  const adapter = new PrismaLibSql({ url: dbUrl });
  // Prisma 7 requires adapter to be passed — cast needed due to type mismatch in older @types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any);
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
