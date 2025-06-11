import { Router } from "../deps.ts";
import { addLog, getLogs, LogEntry } from "../data/logs.ts";

export const logsRouter = new Router();

logsRouter
  .get("/logs", async (ctx) => {
    const logs = await getLogs();
    ctx.response.body = { logs };
  })
  .post("/logs", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;

    const log: LogEntry = {
      timestamp: new Date().toISOString(),
      level: body.level || "INFO",
      message: body.message || "",
    };

    await addLog(log);
    ctx.response.body = { status: "added", log };
  });
