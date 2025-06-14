import { analysisCollection } from "../db/mongo.ts";

export interface AnalysisResult {
  timestamp: string;
  logs: string[];
  analysis: string;
  logCount: number;
}

export async function saveAnalysis(result: AnalysisResult) {
  await analysisCollection.insertOne(result);
}
export async function getAnalyses(limit = 10): Promise<AnalysisResult[]> {
  return await analysisCollection
    .find({}, { sort: { timestamp: -1 }, limit })
    .toArray();
}
