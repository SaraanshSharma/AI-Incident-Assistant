import { MongoClient } from "npm:mongodb@5.6.0";

const uri = Deno.env.get("MONGO_URI");
console.log("🔍 Environment check:", {
  hasUri: !!uri,
  uriLength: uri?.length || 0,
  uriStart: uri?.substring(0, 20) + "...",
  uriEnd: "..." + uri?.substring(uri.length - 10)
});

if (!uri) {
  console.error("❌ MONGO_URI not found in environment variables.");
  throw new Error("Missing MONGO_URI");
}

const client = new MongoClient(uri);

try {
  await client.connect();
} catch (err) {
  console.error("❌ Failed to connect to MongoDB:", err.message);
  throw err;
}

const db = client.db("incident-ai");

export const logsCollection = db.collection("logs");
export const analysisCollection = db.collection("analysis");
