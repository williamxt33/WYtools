"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { BiMenu, BiSearch, BiUser } from "react-icons/bi";
import SearchBar from "@/components/ui/searchbar";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type User = { name: string; email: string };

export default function NavBarSmall() {
  const t = useTranslations("NavBar");
  const [showSearch, setShowSearch] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const iconBtnClass =
    "bg-transparent border-0 cursor-pointer flex items-center justify-center text-foreground p-[0.4rem] rounded-md transition-colors duration-150 shrink-0 hover:text-primary";

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch("/api/auth/me");

      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userData = await res.json();
      setUser({ name: userData.name, email: userData.email });
      setLoading(false);
    }

    load();
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
    <>
      <header className="block lg:hidden sticky top-0 z-50 bg-background border-b border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <nav className="w-full px-3 h-16 flex items-center justify-between">
          <button
            className={iconBtnClass}
            onClick={() => setShowSideMenu(true)}
            aria-label="Open menu"
          >
            <BiMenu size={26} />
          </button>

          <Link href="/" className="flex items-center no-underline">
            <Image
              src="/icons/full_logo.png"
              alt="WyTools"
              width={110}
              height={57}
              priority
            />
          </Link>

          <div className="flex items-center gap-[0.1rem]">
            <button
              className={iconBtnClass}
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Search"
            >
              <BiSearch size={22} />
            </button>
            {loading ? null : user ? (
              <div ref={profileRef} className="relative">
                <div
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0 select-none cursor-pointer"
                >
                  {initials}
                </div>
                {openProfile && (
                  <div className="absolute flex flex-col gap-2.5 border border-border right-3.5 bg-background rounded-xl">
                    <div className="flex flex-row items-center gap-2.5 px-6 py-5">
                      <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shrink-0 select-none">
                        {initials}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">
                          {user?.name}
                        </span>
                        <span className="text-sm font-medium ">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href="/profile"
                        onClick={() => setOpenProfile(false)}
                        className=" px-6 py-2 border-t border-border hover:text-primary hover:bg-primary-light cursor-pointer"
                      >
                        {t("profile")}
                      </Link>
                      <div
                        onClick={handleLogout}
                        className=" px-6 py-2 border-t border-border hover:text-primary hover:bg-primary-light cursor-pointer"
                      >
                        {t("signOut")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
                className={iconBtnClass}
                aria-label="Sign in"
              >
                <BiUser size={22} />
              </Link>
            )}
          </div>
        </nav>

        {showSearch && (
          <div className="px-4 py-3 border-t border-border animate-[slideDown_0.18s_ease]">
            <SearchBar className="w-full" />
          </div>
        )}
      </header>

      <SideMenu isOpen={showSideMenu} onClose={() => setShowSideMenu(false)} />
    </>
  );
}
