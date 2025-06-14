import { MongoClient } from "../deps.ts";

const uri = Deno.env.get("MONGO_URI");

if (!uri) {
  console.error("❌ MONGO_URI not found in environment variables.");
  throw new Error("Missing MONGO_URI");
}

const client = new MongoClient();

try {
  await client.connect(uri);
} catch (err) {
  console.error("❌ Failed to connect to MongoDB:", err.message);
  throw err;
}

const db = client.database("incident-ai");

export const logsCollection = db.collection("logs");
export const analysisCollection = db.collection("analysis");
