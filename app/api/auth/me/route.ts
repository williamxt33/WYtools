import { NextRequest, NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/auth";
import User from "@/lib/models/user";
import connectDB from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const userId = getAuthUserId(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const user = await User.findById(userId).select("name email createdAt");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
