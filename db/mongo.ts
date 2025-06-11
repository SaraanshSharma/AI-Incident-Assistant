import { MongoClient } from "../deps.ts";

const client = new MongoClient();
const uri = Deno.env.get("MONGO_URI");
await client.connect(uri);

const db = client.database("incident-ai");

export const logsCollection = db.collection("logs");
