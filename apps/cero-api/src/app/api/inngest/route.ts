import { serve } from "inngest/next";
import { inngest } from "@/server/inngest/client";
import { processChat } from "@/server/inngest/functions/chat";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processChat],
});
