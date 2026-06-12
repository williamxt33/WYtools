"use client";

import {
  tools,
  categories,
  type ToolCategory,
  type Tool,
} from "@/lib/tools/registry";
import { toolIcons } from "@/lib/tools/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { BiChevronDown, BiStar, BiHistory } from "react-icons/bi";
import { categoryIcons } from "@/lib/tools/icons";

export default function SideBar() {
  const t = useTranslations("SideBar");
  const tR = useTranslations("Registry");
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Tool[]>();
  const [recents, setRecents] = useState<Tool[]>();

  function toggleCategory(catValue: ToolCategory) {
    setOpenCategory((prev) => (prev === catValue ? null : catValue));
  }

  useEffect(() => {
    async function load() {
      try {
        const [userRes, likesRes, recentsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/likes"),
          fetch("/api/recents"),
        ]);

        if (!userRes.ok) {
          return;
        }

        setIsLoggedIn(true);

        const likesData = likesRes.ok ? await likesRes.json() : { toolIds: [] };
        const recentsData = recentsRes.ok
          ? await recentsRes.json()
          : { toolIds: [] };

        const likedIds = likesData.toolIds as string[];
        setFavorites(
          tools.filter((t) => likedIds.includes(t.href.split("/").pop() ?? "")),
        );

        const recentsIds = recentsData.toolIds as string[];
        const recetnsTool = recentsIds
          .map((id) => tools.find((t) => t.href.split("/").pop() === id))
          .filter(Boolean) as Tool[];
        setRecents(recetnsTool);
      } catch (e) {
        setFavorites([]);
        setRecents([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <nav className="hidden sticky top-17 w-80 shrink-0 h-[calc(100vh-4.25rem)] flex-col overflow-y-auto bg-background border-r border-border xl:flex">
      <div className="px-4 py-3 border-b border-border shrink-0 text-center">
        <span className="text-lg font-bold text-foreground">
          {t("browseTools")}
        </span>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          {t("favoriteTools")}
        </span>
        {!loading && isLoggedIn ? (
          favorites && favorites.length > 0 ? (
            <div className="flex flex-col gap-1 max-h-40 overflow-auto">
              {favorites.map((t) => {
                const slug = t.href.split("/").pop() ?? "";
                const ToolIcon = toolIcons[slug];
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center gap-2 py-[0.28rem] px-2 text-sm text-foreground no-underline rounded-[5px] transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                  >
                    {ToolIcon && (
                      <ToolIcon size={14} className="shrink-0 opacity-70" />
                    )}
                    {tR(`tools.${slug}.name`)}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 py-3 text-muted">
              <BiStar size={22} className="opacity-40" />
              <span className="text-xs opacity-60 text-center">
                {t("favoritesEmpty")}
              </span>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-1 py-3 text-muted">
            <BiStar size={22} className="opacity-40" />
            <p className="flex items-center gap-1 text-xs text-center leading-snug">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {t("signIn")}
              </Link>
              <span className="opacity-60">{t("favoritesNotLogIn")}</span>
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-b border-border">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          {t("recentTools")}
        </span>
        {!loading && isLoggedIn ? (
          recents && recents.length > 0 ? (
            <div className="flex flex-col gap-1 max-h-40 overflow-auto">
              {recents.map((t) => {
                const slug = t.href.split("/").pop() ?? "";
                const ToolIcon = toolIcons[slug];
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center gap-2 py-[0.28rem] px-2 text-sm text-foreground no-underline rounded-[5px] transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                  >
                    {ToolIcon && (
                      <ToolIcon size={14} className="shrink-0 opacity-70" />
                    )}
                    {tR(`tools.${slug}.name`)}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 py-3 text-muted">
              <BiStar size={22} className="opacity-40" />
              <span className="text-xs opacity-60 text-center">
                {t("recentEmpty")}
              </span>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-1 py-3 text-muted">
            <BiStar size={22} className="opacity-40" />
            <p className="flex items-center gap-1 text-xs text-center leading-snug">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                {t("signIn")}
              </Link>
              <span className="opacity-60">{t("recentsNotLogIn")}</span>
            </p>
          </div>
        )}
      </div>

      {/* Categories accordion */}
      <div className="px-4 py-3 flex-1">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          {t("categories")}
        </span>
        {categories.map((cat) => {
          const CatIcon = categoryIcons[cat.value];
          return (
            <div key={cat.value} className="mb-[0.1rem]">
              <button
                className="flex items-center justify-between w-full bg-transparent border-0 py-2 px-[0.4rem] text-[0.925rem] font-medium text-foreground cursor-pointer rounded-md transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                onClick={() => toggleCategory(cat.value)}
              >
                <span
                  className={`${openCategory === cat.value ? "text-primary" : "text-black"} : flex items-center gap-2`}
                >
                  <CatIcon size={16} />
                  {tR(`categories.${cat.value}`)}
                </span>
                <BiChevronDown
                  className={`transition-transform duration-200 shrink-0 ${openCategory === cat.value ? "text-primary rotate-180" : ""}`}
                />
              </button>

              {openCategory === cat.value && (
                <div className="pt-[0.2rem] pb-[0.3rem] pl-3 animate-[slideDown_0.15s_ease]">
                  {cat.subCategories.map((sub) => (
                    <div key={sub.value} className="mb-[0.6rem]">
                      <span className="block text-[0.68rem] font-bold tracking-[0.07em] uppercase text-muted pt-[0.2rem] pb-1">
                        {tR(`subCategories.${sub.value}`)}
                      </span>
                      {tools
                        .filter(
                          (t) =>
                            t.category === cat.value &&
                            t.subCategory === sub.value,
                        )
                        .map((tool) => {
                          const slug = tool.href.split("/").pop() ?? "";
                          const ToolIcon = toolIcons[slug];
                          return (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-center gap-2 py-[0.28rem] px-2 text-sm text-foreground no-underline rounded-[5px] transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                            >
                              {ToolIcon && (
                                <ToolIcon
                                  size={14}
                                  className="shrink-0 opacity-70"
                                />
                              )}
                              {tR(`tools.${tool.href.split("/").pop()}.name`)}
                            </Link>
                          );
                        })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
