import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "@/interfaces/http/routes/index"
import type { AppContainer } from "@/main/container";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api", routes);

  // basic health
  app.get("/health", (_req, res) => res.json({ ok: true }));

  // error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(err?.status || 500).json({ error: err?.message || "Internal Server Error" });
  });

  return app as express.Express & { locals: { container: AppContainer } };
}
