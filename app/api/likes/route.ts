import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Like from "@/lib/models/like";
import { getAuthUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const likes = await Like.find({ userId });
    const toolIds = likes.map((l) => l.toolId);

    return NextResponse.json({ toolIds });
  } catch (e) {
    console.error("[GET /api/likes]", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const { toolId } = body as { toolId: unknown };

    if (
      !toolId ||
      typeof toolId !== "string" ||
      toolId.trim().length === 0 ||
      toolId.length > 100
    ) {
      return NextResponse.json({ error: "Invalid toolId" }, { status: 400 });
    }
    const trimmedToolId = toolId.trim();

    await connectDB();

    const deleted = await Like.findOneAndDelete({
      userId,
      toolId: trimmedToolId,
    });
    if (deleted) {
      return NextResponse.json({ liked: false });
    }

    try {
      await Like.create({ userId, toolId: trimmedToolId });
    } catch (createErr: unknown) {
      if (
        !(
          typeof createErr === "object" &&
          createErr !== null &&
          (createErr as { code?: number }).code === 11000
        )
      ) {
        throw createErr;
      }
    }
    return NextResponse.json({ liked: true });
  } catch (e) {
    console.error("[POST /api/likes]", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
