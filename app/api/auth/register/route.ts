import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const { name, email, password } = body as { name: unknown; email: unknown; password: unknown };

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name: trimmedName, email: trimmedEmail, passwordHash });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
