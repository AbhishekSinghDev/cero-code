import { env } from "@/env";
import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "cero-api",
  eventKey: env.INNGEST_EVENT_KEY,
  middleware: [realtimeMiddleware()],
});
