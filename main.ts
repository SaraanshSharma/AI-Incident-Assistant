import { Application } from "./deps.ts";
import { analyzeRouter } from "./routes/analyze.ts";
import { logsRouter } from "./routes/logs.ts";

const app = new Application();

app.use(analyzeRouter.routes());
app.use(analyzeRouter.allowedMethods());
app.use(logsRouter.routes());
app.use(logsRouter.allowedMethods());
console.log("🚀 Server running at http://localhost:8005");

const PORT = Number(Deno.env.get("PORT") ?? 8000);
await app.listen({ port: PORT });
