import { getLogs, LogEntry } from "../data/logs.ts";
import { Router } from "../deps.ts";
import { runAgentOnLogs } from "../lib/langchainAgent.ts";

export const analyzeRouter = new Router();

analyzeRouter.post("/analyze", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const logs: LogEntry[] = await getLogs();

  if (!logs || !logs.length) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Logs are required" };
    return;
  }

  const result = await runAgentOnLogs(
    logs.map((log) => `[${log.level}] ${log.message}`),
  );
  ctx.response.body = {
    analysis: result,
    logCount: logs.length,
  };
});
