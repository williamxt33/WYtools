import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Recent from "@/lib/models/recent";
import { getAuthUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const recents = await Recent.find({ userId })
      .sort({ usedAt: -1 })
      .limit(10);
    const toolIds = recents.map((r) => r.toolId);

    return NextResponse.json({ toolIds });
  } catch (e) {
    console.error("[GET /api/recents]", e);
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

    await Recent.findOneAndUpdate(
      { userId, toolId: trimmedToolId },
      { usedAt: new Date() },
      { upsert: true },
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[POST /api/recents]", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
