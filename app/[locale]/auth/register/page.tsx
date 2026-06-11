"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      router.push("/profile");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex min-h-[calc(100vh-64px)]">
      <section className="max-lg:hidden flex w-1/2 relative overflow-hidden flex-col justify-center px-16 bg-[linear-gradient(135deg,#1e3a8a_0%,#2563eb_55%,#4f46e5_100%)]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl bg-[#93c5fd]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-25 blur-3xl bg-[#a5b4fc]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-25 blur-3xl bg-[#e0e7ff]"></div>
        <div className="relative z-10">
          <span className="text-blue-200 text-sm font-medium tracking-widest uppercase mb-4 block">
            WYTools
          </span>
          <h1 className="text-5xl font-bold text-white mb-5 leading-tight">
            Join WYTools.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            Create an account to track your favorite tools, see your recent
            activity, and get the most out of everything WYTools has to offer.
          </p>
        </div>
      </section>

      <section className="flex w-1/2 items-center justify-center px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Create account
          </h2>
          <p className="text-sm text-muted mb-6">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground bg-background placeholder:text-muted outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground bg-background placeholder:text-muted outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                required
                className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground bg-background placeholder:text-muted outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted">
                Must be at least 8 characters
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-60 cursor-pointer border-0"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
