"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/tools/registry";
import type { Tool } from "@/lib/tools/registry";
import ToolCard from "@/components/tools/ToolCard";
import { BiLogOut, BiBookmark, BiHistory } from "react-icons/bi";

type User = { name: string; email: string };
type Tab = "favorites" | "recents";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("favorites");
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [recents, setRecents] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [userRes, likesRes, recentsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/likes"),
        fetch("/api/recents"),
      ]);

      if (!userRes.ok) {
        router.push("/auth/login");
        return;
      }

      const userData = await userRes.json();
      const likesData = likesRes.ok ? await likesRes.json() : { toolIds: [] };
      const recentsData = recentsRes.ok ? await recentsRes.json() : { toolIds: [] };

      setUser({ name: userData.name, email: userData.email });

      const likedIds = likesData.toolIds as string[];
      setFavorites(tools.filter((t) => likedIds.includes(t.href.split("/").pop() ?? "")));

      const recentIds = recentsData.toolIds as string[];
      const recentTools = recentIds
        .map((id) => tools.find((t) => t.href.split("/").pop() === id))
        .filter(Boolean) as Tool[];
      setRecents(recentTools);

      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "DELETE" });
    router.push("/");
  }

  const initials =
    user?.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") ?? "?";

  const activeTools = activeTab === "favorites" ? favorites : recents;

  if (loading) {
    return (
      <main className="w-full max-w-275 mx-auto px-6 py-8">
        <div className="h-24 rounded-2xl bg-border animate-pulse mb-8" />
        <div className="h-10 rounded-lg bg-border animate-pulse mb-6" />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-border animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-275 mx-auto px-6 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 p-6 border border-border rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0 select-none">
            {initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold text-foreground leading-tight">
              {user?.name}
            </span>
            <span className="text-sm text-muted">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted border border-border rounded-lg hover:border-red-400 hover:text-red-500 transition-colors duration-150 cursor-pointer bg-transparent"
        >
          <BiLogOut size={16} />
          Log out
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border-b border-border">
          <div className="flex">
            {(["favorites", "recents"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px cursor-pointer bg-transparent ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab === "favorites" ? (
                  <BiBookmark size={15} />
                ) : (
                  <BiHistory size={15} />
                )}
                {tab === "favorites"
                  ? `Favorites (${favorites.length})`
                  : `Recents (${recents.length})`}
              </button>
            ))}
          </div>
        </div>

        {activeTools.length === 0 ? (
          <p className="text-center py-16 text-muted text-sm">
            {activeTab === "favorites"
              ? "No favorites yet — heart a tool to save it here."
              : "No recent tools — start using tools to see them here."}
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {activeTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
