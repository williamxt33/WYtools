"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { type Tool } from "@/lib/tools/registry";
import { toolIcons } from "@/lib/tools/icons";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { MdSwapHoriz, MdAutoAwesome, MdCalculate } from "react-icons/md";
import { useLikes } from "@/lib/context/likes";

const categoryIcons = {
  converters: MdSwapHoriz,
  generators: MdAutoAwesome,
  calculators: MdCalculate,
};

type Props = { tool: Tool };

export default function ToolCard({ tool }: Props) {
  const router = useRouter();
  const slug = tool.href.split("/").pop() ?? "";
  const Icon = toolIcons[slug] ?? categoryIcons[tool.category];
  const { likedIds, toggleLike } = useLikes();
  const faved = likedIds.includes(slug);

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId: slug }),
    });
    if (res.status === 401) { router.push("/auth/login"); return; }
    if (res.ok) {
      const data = await res.json();
      toggleLike(slug, data.liked);
    }
  }

  function trackRecent() {
    fetch("/api/recents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId: slug }),
    });
  }

  return (
    <Link
      href={tool.href}
      onClick={trackRecent}
      className="flex flex-col gap-2 p-4 border border-border rounded-xl no-underline bg-background transition duration-150 hover:border-primary hover:shadow-[0_4px_16px_rgba(37,99,235,0.08)]"
    >
      <div className="flex items-center justify-between">
        <div className="w-9.5 h-9.5 flex items-center justify-center bg-primary-light text-primary rounded-lg">
          <Icon size={20} />
        </div>
        <button
          className={`bg-transparent border-0 cursor-pointer p-[0.2rem] rounded flex items-center transition-colors duration-150 hover:text-red-500 ${faved ? "text-red-500" : "text-muted"}`}
          onClick={handleLike}
          aria-label="Favourite"
        >
          {faved ? <BiSolidHeart size={16} /> : <BiHeart size={16} />}
        </button>
      </div>
      <span className="text-[0.95rem] font-semibold text-foreground">
        {tool.name}
      </span>
      <p className="text-[0.8rem] text-muted leading-[1.4]">
        {tool.description}
      </p>
    </Link>
  );
}
