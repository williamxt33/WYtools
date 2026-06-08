import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, passwordHash });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong", e },
      { status: 500 },
    );
  }
}
