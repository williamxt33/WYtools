"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { categories, getToolsByCategory, type ToolCategory } from "@/lib/tools/registry"
import { BiChevronDown } from "react-icons/bi"
import SearchBar from "@/components/ui/searchbar"

export default function NavBar() {
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null)

  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link href="/" className="logo">
            <Image src="/icons/full_logo.png" alt="WyTools logo" width={150} height={78} />
          </Link>
        </div>

        <div className="nav-center">
          {categories.map((cat) => (
            <div
              key={cat.value}
              className="dropdown"
              onMouseEnter={() => setOpenCategory(cat.value)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <div>
                <span>{cat.label}</span>
                <BiChevronDown />
              </div>
              {openCategory === cat.value && (
                <ul className="dropdown-menu">
                  {getToolsByCategory(cat.value).map((tool) => (
                    <Link key={tool.href} href={tool.href}>
                      {tool.name}
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/tools">All Tools</Link>
        </div>

        <div className="nav-right">
          <SearchBar />
          <Link href="/signin" className="nav-signin">Sign In</Link>
        </div>
      </nav>
    </header>
  )
}
