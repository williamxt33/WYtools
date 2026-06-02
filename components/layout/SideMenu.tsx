"use client"

import Link from "next/link"
import { categories, getToolsByCategory, type ToolCategory } from "@/lib/tools/registry"
import { useState } from "react"

const SideMenu = () => {
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null)
  return (
    <nav>
      <ul>
        {categories.map((cat) => (
          <div
            key={cat.value}
            className="dropdown"
            onMouseEnter={() => setOpenCategory(cat.value)}
            onMouseLeave={() => setOpenCategory(null)}
          >
            <span>{cat.label}</span>
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
        <Link href="/signin">Sign In</Link>
      </ul>
    </nav>
  );
}

export default SideMenu