import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getAuthUserId(request: NextRequest): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not configured");

  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secret);
    return (decoded as { userId: string }).userId;
  } catch {
    return null;
  }
}
