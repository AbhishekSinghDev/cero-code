import { SUPPORTED_AI_MODELS } from "@cerocode/constants";
import z from "zod";

export const aiModelSchema = z.enum(SUPPORTED_AI_MODELS.map((model) => model.id));

export const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationId: z.string().optional(),
  aiModel: aiModelSchema.optional(),
});

export const inngestChatFunctionSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationId: z.string(),
  userId: z.string(),
  aiModel: aiModelSchema,
});
