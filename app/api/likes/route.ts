import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Like from "@/lib/models/like";
import { getAuthUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const likes = await Like.find({ userId });
    const toolIds = likes.map((l) => l.toolId);

    return NextResponse.json({ toolIds });
  } catch (e) {
    console.error("[GET /api/likes]", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { toolId } = await request.json();
    if (!toolId || typeof toolId !== "string" || toolId.trim().length === 0 || toolId.length > 100) {
      return NextResponse.json({ error: "Invalid toolId" }, { status: 400 });
    }

    await connectDB();

    const existing = await Like.findOne({ userId, toolId });
    if (existing) {
      await existing.deleteOne();
      return NextResponse.json({ liked: false });
    } else {
      await Like.create({ userId, toolId });
      return NextResponse.json({ liked: true });
    }
  } catch (e) {
    console.error("[POST /api/likes]", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
