"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t("errorFallback"));
        return;
      }
      router.push(redirect ?? "/profile");
    } catch (e) {
      setError(t("errorFallback"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex min-h-screen">
      <section className="max-lg:hidden flex w-1/2 relative overflow-hidden flex-col justify-center px-16 bg-[linear-gradient(135deg,#1e3a8a_0%,#2563eb_55%,#4f46e5_100%)]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl bg-[#93c5fd]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-25 blur-3xl bg-[#a5b4fc]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-25 blur-3xl bg-[#e0e7ff]"></div>
        <div className="relative z-10">
          <span className="block text-blue-200 text-sm font-medium tracking-widest uppercase mb-4">
            WYtools
          </span>
          <h1 className="text-5xl font-bold text-white mb-5 leading-tight">
            {t("welcomeBack")}
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            {t("sideDescription")}
          </p>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center px-8 py-12 bg-background">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-foreground mb-1">{t("title")}</h2>

          <p className="text-sm text-muted mb-6">
            {t("newHere")}{" "}
            <Link
              href={redirect ? `/auth/register?redirect=${encodeURIComponent(redirect)}` : "/auth/register"}
              className="text-primary hover:underline font-medium"
            >
              {t("createAccount")}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                {t("email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground bg-background placeholder:text-muted outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                {t("password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                className="px-3 py-2.5 rounded-lg border border-border text-sm text-foreground bg-background placeholder:text-muted outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted">
                {t("passwordHint")}
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-60 cursor-pointer border-0 transition-colors"
            >
              {loading ? t("signingIn") : t("signIn")}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
