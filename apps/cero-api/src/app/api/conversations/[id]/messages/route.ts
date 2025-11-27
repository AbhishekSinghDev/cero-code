import { db } from "@/server/db";
import { conversation, message } from "@/server/db/schema";
import { getAuthenticatedUser } from "@/server/utils/get-user";
import { tryCatch } from "@/server/utils/try-catch";
import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser(request.headers);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: conversationId } = await params;

  if (!conversationId) {
    return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 });
  }

  // First verify the conversation belongs to the user
  const { data: conversationData, error: conversationError } = await tryCatch(
    db
      .select()
      .from(conversation)
      .where(and(eq(conversation.id, conversationId), eq(conversation.userId, user.id)))
      .limit(1)
  );

  if (conversationError) {
    console.error("Error fetching conversation:", conversationError);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  if (!conversationData || conversationData.length === 0) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const { data: messages, error: messagesError } = await tryCatch(
    db
      .select({
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
      })
      .from(message)
      .where(eq(message.conversationId, conversationId))
      .orderBy(asc(message.createdAt))
  );

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  const formatedMessages = messages?.map((msg) => {
    return {
      id: msg.id,
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return NextResponse.json({
    conversation: conversationData[0],
    messages: formatedMessages ?? [],
  });
}
