import { inngestChatFunctionSchema } from "@/lib/zod-schema";
import { db } from "@/server/db";
import { message } from "@/server/db/schema";
import { tryCatch } from "@/server/utils/try-catch";
import type { RealtimeContext } from "@/types/inngest";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { chatChannel } from "../channels";
import { inngest } from "../client";

export const processChat = inngest.createFunction(
  {
    id: "chat-message-process",
    name: "Process Chat Message",
    retries: 1,
  },
  { event: "chat/process" },
  async (ctx: RealtimeContext) => {
    const { event, step, publish } = ctx;

    const parseEventData = inngestChatFunctionSchema.safeParse(event.data);
    if (!parseEventData.success || parseEventData.error) {
      throw new Error("Invalid event data");
    }
    const eventData = parseEventData.data;

    try {
      // First, save the user message
      await step.run("save-user-message", async () => {
        const { error: insertError } = await tryCatch(
          db.insert(message).values({
            conversationId: eventData.conversationId,
            role: "user",
            content: eventData.message,
          })
        );

        if (insertError) {
          console.error("Error saving user message to DB:", insertError);
          throw insertError;
        }
      });

      const result = await step.run("stream-ai-response", async () => {
        const result = streamText({
          model: google(eventData.aiModel),
          messages: [
            {
              role: "system",
              content: "You are cero",
            },
            {
              role: "user",
              content: eventData.message,
            },
          ],
        });

        let fullText = "";

        // Stream each token as it arrives
        for await (const chunk of result.textStream) {
          fullText += chunk;

          // Publish each token to Realtime channel
          await publish(chatChannel(eventData.conversationId).token(chunk));
        }

        // Signal completion
        await publish(chatChannel(eventData.conversationId).done({ fullText }));
        return { success: true, text: fullText };
      });

      // Save the assistant message
      await step.run("save-assistant-message", async () => {
        const { error: insertError } = await tryCatch(
          db.insert(message).values({
            conversationId: eventData.conversationId,
            role: "assistant",
            content: result.text,
          })
        );

        if (insertError) {
          console.error("Error saving assistant message to DB:", insertError);
          throw insertError;
        }
      });
    } catch (err) {
      console.error("Error in chat processing:", err);
      await publish(
        chatChannel(eventData.conversationId).error({
          error: err instanceof Error ? err.message : "Unknown error",
        })
      );
      throw err;
    }
  }
);
