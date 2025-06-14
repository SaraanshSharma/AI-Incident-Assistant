import { getLogs, LogEntry } from "../data/logs.ts";
import { Router } from "../deps.ts";
import { runAgentOnLogs } from "../lib/langchainAgent.ts";
import { getAnalyses, saveAnalysis } from "../data/analysis.ts";

export const analyzeRouter = new Router();

analyzeRouter.post("/analyze", async (ctx) => {
  const logs: LogEntry[] = await getLogs();

  if (!logs || logs.length === 0) {
    ctx.response.status = 400;
    ctx.response.body = { error: "No logs available for analysis" };
    return;
  }
  const logStrings = logs.map((log) => `[${log.level}] ${log.message}]`);

  const result = await runAgentOnLogs(logStrings);

  const record = {
    timestamp: new Date().toISOString(),
    logs: logStrings,
    analysis: result,
    logCount: logs.length,
  };

  await saveAnalysis(record);

  ctx.response.body = {
    analysis: result,
    logCount: logs.length,
    saved: true,
  };
});

analyzeRouter.get("/analyze/history", async (ctx) => {
  const results = await getAnalyses();
  ctx.response.body = { history: results };
});
