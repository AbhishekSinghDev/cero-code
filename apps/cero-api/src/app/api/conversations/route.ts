import { db } from "@/server/db";
import { conversation, message } from "@/server/db/schema";
import { getAuthenticatedUser } from "@/server/utils/get-user";
import { tryCatch } from "@/server/utils/try-catch";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/conversations - List all conversations for the authenticated user
export async function GET(request: Request) {
  const user = await getAuthenticatedUser(request.headers);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: conversations, error } = await tryCatch(
    db
      .select({
        id: conversation.id,
        shortTitle: conversation.shortTitle,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        lastMessage: sql<string>`(
          SELECT ${message.content}
          FROM ${message}
          WHERE ${message.conversationId} = ${conversation.id}
          ORDER BY ${message.createdAt} DESC
          LIMIT 1
        )`,
        title: sql<string>`
          COALESCE(
            ${conversation.shortTitle},
            (
              SELECT LEFT(${message.content}, 50)
              FROM ${message}
              WHERE ${message.conversationId} = ${conversation.id}
                AND ${message.role} = 'user'
              ORDER BY ${message.createdAt} ASC
              LIMIT 1
            )
          )
        `,
        messageCount: sql<number>`(
          SELECT COUNT(*)
          FROM ${message}
          WHERE ${message.conversationId} = ${conversation.id}
        )`,
      })
      .from(conversation)
      .where(eq(conversation.userId, user.id))
      .orderBy(desc(conversation.updatedAt))
  );

  if (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json({ conversations: conversations || [] });
}
