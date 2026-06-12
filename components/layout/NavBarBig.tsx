"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  categories,
  getToolsBySubCategory,
  type ToolCategory,
  type ToolSubCategory,
} 
from "@/lib/tools/registry";
import { BiChevronDown, BiLogOut, BiUser } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import SearchBar from "@/components/ui/searchbar";
import { languages } from "@/lib/languages";
import { toolIcons } from "@/lib/tools/icons";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type User = { name: string; email: string };

export default function NavBarBig() {
  const t = useTranslations("NavBar");
  const tR = useTranslations("Registry");
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [activeSubCat, setActiveSubCat] = useState<ToolSubCategory | null>(
    null,
  );
  const [openLanguage, setOpenLanguage] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  function handleCategoryEnter(catValue: ToolCategory) {
    const cat = categories.find((c) => c.value === catValue);
    setOpenCategory(catValue);
    setActiveSubCat(cat?.subCategories[0]?.value ?? null);
  }

useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (!cancelled) setUser(null);
          return;
        }
        const userData = await res.json();
        if (!cancelled) {
          setUser({ name: userData.name, email: userData.email });
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "DELETE" });
    if (pathname.includes("/profile")) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
  }

  const initials =
    user?.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") ?? "?";

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-background border-b border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <nav className="w-full px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/icons/full_logo.png"
              alt={t("logoAlt")}
              width={150}
              height={78}
            />
          </Link>
        </div>

        {/* Center: Category dropdowns + All Tools */}
        <div className="flex items-center">
          {categories.map((cat) => (
            <div
              key={cat.value}
              className="relative inline-flex items-center cursor-pointer mx-2"
              onMouseEnter={() => handleCategoryEnter(cat.value)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <Link
                href={`/tools/${cat.value}`}
                className="inline-flex flex-row items-center justify-center gap-2 py-1.5 px-2.5 rounded-lg text-base font-medium text-foreground cursor-pointer transition-colors duration-150 hover:text-primary"
              >
                <span>{tR(`categories.${cat.value}`)}</span>
                <BiChevronDown
                  className={`${openCategory === cat.value ? "rotate-180 mt-1" : ""} size-5`}
                />
              </Link>
              {openCategory === cat.value && (
                <div className="absolute top-[calc(100%+0.5px)] left-0 flex min-w-130 max-h-28 bg-background border border-border rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-100">
                  <div className="w-42.5 shrink-0 border-r border-border bg-[#f8fafc] p-[0.2rem] flex flex-col gap-[0.15rem] max-h-37.5 overflow-auto">
                    {cat.subCategories.map((sub) => (
                      <div
                        key={sub.value}
                        className={`px-[0.4rem] py-[0.35rem] rounded-md text-sm font-medium cursor-pointer transition-colors duration-120 hover:bg-primary-light hover:text-primary${activeSubCat === sub.value ? " bg-primary-light text-primary" : " text-muted"}`}
                        onMouseEnter={() => setActiveSubCat(sub.value)}
                      >
                        {tR(`subCategories.${sub.value}`)}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-2 flex flex-col gap-[0.1rem] max-h-37.5 overflow-auto">
                    {activeSubCat &&
                      getToolsBySubCategory(activeSubCat).map((tool) => {
                        const slug = tool.href.split("/").pop() ?? "";
                        const ToolIcon = toolIcons[slug];
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-2 px-2 py-1 rounded-md text-[0.9rem] font-medium text-foreground no-underline whitespace-nowrap transition-colors duration-150 hover:text-primary"
                          >
                            {ToolIcon && <ToolIcon size={13} />}
                            {tR(`tools.${tool.href.split("/").pop()}.name`)}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Search, Language, Sign In */}
        <div className="flex items-center gap-2.5 shrink-0">
          <SearchBar />
          <div
            className="relative inline-flex items-center cursor-pointer"
            onMouseEnter={() => setOpenLanguage(true)}
            onMouseLeave={() => setOpenLanguage(false)}
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md text-base font-medium text-foreground hover:text-primary transition-colors duration-150 cursor-pointer">
              <MdLanguage size={18} />
              <span>{languages.find(l => l.locale === locale)?.code ?? locale.toUpperCase()}</span>
              <BiChevronDown />
            </div>
            {openLanguage && (
              <ul className="absolute top-[calc(100%+1px)] right-0 min-w-40 bg-background border border-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-[0.4rem] list-none flex flex-col gap-[0.1rem] z-100">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    className={`flex items-center gap-[0.6rem] px-[0.6rem] py-[0.4rem] rounded-md cursor-pointer transition-colors duration-150 hover:bg-primary-light hover:text-primary${locale === lang.locale ? " text-primary font-semibold" : " text-foreground"}`}
                    onClick={() => router.replace(pathname, { locale: lang.locale })}
                  >
                    <span className="text-[0.8rem] font-bold min-w-8">
                      {lang.code}
                    </span>
                    <span className="text-[0.9rem]">{lang.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading ? null : user ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setOpenProfile((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0 select-none cursor-pointer"
              >
                {initials}
              </button>
              {openProfile && (
                <div className="absolute flex flex-col gap-2.5 border border-border right-3.5 bg-background rounded-xl">
                  <div className="flex flex-row items-center gap-2.5 px-6 py-5">
                    <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0 select-none">
                      {initials}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-sm font-medium ">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href="/profile"
                      onClick={() => setOpenProfile(false)}
                      className="flex flex-row items-center gap-2.5 px-6 py-2 border-t border-border hover:text-primary hover:bg-primary-light cursor-pointer"
                    >
                      <BiUser size={18}/>
                      {t("profile")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex flex-row items-center gap-2.5 text-left px-6 py-2 border-t border-border hover:text-primary hover:bg-primary-light cursor-pointer"
                    >
                      <BiLogOut size={18}/>
                      {t("signOut")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
              className="bg-primary text-white px-[1.1rem] py-[0.4rem] rounded-md whitespace-nowrap hover:bg-primary-hover transition-colors duration-150 no-underline"
            >
              {t("signIn")}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
