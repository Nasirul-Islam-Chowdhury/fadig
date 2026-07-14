import { MongoClient } from "mongodb";

// cache the connect promise at module scope so warm serverless
// invocations reuse the same client instead of reconnecting
let clientPromise;

export function getDb() {
  clientPromise ??= new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 5,
  }).connect();
  return clientPromise.then((client) => client.db("fadig"));
}
