"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { BiMenu, BiSearch, BiUser } from "react-icons/bi"
import SearchBar from "@/components/ui/searchbar"
import SideMenu from "./SideMenu"

export default function NavBarSmall() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  const iconBtnClass = "bg-transparent border-0 cursor-pointer flex items-center justify-center text-foreground p-[0.4rem] rounded-md transition-colors duration-150 shrink-0 hover:text-primary"

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
            <Image src="/icons/full_logo.png" alt="WyTools" width={110} height={57} priority />
          </Link>

          <div className="flex items-center gap-[0.1rem]">
            <button
              className={iconBtnClass}
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Search"
            >
              <BiSearch size={22} />
            </button>
            <Link href="/signin" className={iconBtnClass} aria-label="Sign in">
              <BiUser size={22} />
            </Link>
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
  )
}
