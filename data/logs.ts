import { logsCollection } from "../db/mongo.ts";

export interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export async function addLog(log: LogEntry) {
  await logsCollection.insertOne(log);
}

export async function getLogs(): Promise<LogEntry[]> {
  return await logsCollection
    .find({}, { sort: { timestamp: -1 }, limit: 50 })
    .toArray();
}
