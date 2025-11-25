import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";
import { env } from "@/env";
import type { Events } from "@/types/inngest";

export const inngest = new Inngest<Events>({
  id: "cero-api",
  eventKey: env.INNGEST_EVENT_KEY,
  middleware: [realtimeMiddleware()],
});
