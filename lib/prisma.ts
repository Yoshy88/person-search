import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/lib/generated/prisma/client'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

type PrismaClientInstance = InstanceType<typeof PrismaClient>

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClientInstance
}

const globalForPrisma = globalThis as GlobalWithPrisma

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: databaseUrl })
  return new PrismaClient({ adapter })
}

const existingPrisma = globalForPrisma.prisma

// Recreate the client if an old dev instance is missing generated model delegates.
export const prisma =
  existingPrisma && 'user' in existingPrisma ? existingPrisma : createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
