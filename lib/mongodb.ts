import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI ?? ""
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5_000,
  socketTimeoutMS: 45_000,
}

let clientPromise: Promise<MongoClient>
async function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Missing environment variable "MONGODB_URI"')
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options)

    if (process.env.NODE_ENV === "development") {
      // Use a global – keeps the value across hot-reloads.
      const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
      }
      if (!globalWithMongo._mongoClientPromise) {
        globalWithMongo._mongoClientPromise = client.connect()
      }
      clientPromise = globalWithMongo._mongoClientPromise
    } else {
      clientPromise = client.connect()
    }
  }

  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  const client = await getClient()
  return client.db("pitchndeck")
}

/** Optional health-check utility */
export async function testConnection(): Promise<boolean> {
  try {
    const db = await getDatabase()
    await db.admin().ping()
    return true
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    return false
  }
}
