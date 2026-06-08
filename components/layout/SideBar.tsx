"use client"

import { tools, categories, type ToolCategory } from "@/lib/tools/registry";
import { toolIcons } from "@/lib/tools/icons";
import Link from "next/link";
import { useState } from "react";
import { BiChevronDown, BiStar, BiHistory } from "react-icons/bi";
import { categoryIcons } from "@/lib/tools/icons";



export default function SideBar() {
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null)

  function toggleCategory(catValue: ToolCategory) {
    setOpenCategory((prev) => (prev === catValue ? null : catValue))
  }

  return (
    <nav className="hidden sticky top-17 w-400 h-[calc(100vh-4.25rem)] flex-col overflow-y-auto bg-background border-r border-border xl:flex">

      {/* Header */}
      <div className="px-4 py-3 border-b border-border shrink-0 text-center">
        <span className="text-lg font-bold text-foreground">Browse Tools</span>
      </div>

      {/* Favorite Tools — placeholder */}
      <div className="px-4 py-3 border-b border-border">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          Favorite Tools
        </span>
        <div className="flex flex-col items-center gap-1 py-3 text-muted">
          <BiStar size={22} className="opacity-40" />
          <p className="text-xs text-center leading-snug opacity-60">
            Save your favorite tools here.<br />Coming soon.
          </p>
        </div>
      </div>

      {/* Recent Tools — placeholder */}
      <div className="px-4 py-3 border-b border-border">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          Recent Tools
        </span>
        <div className="flex flex-col items-center gap-1 py-3 text-muted">
          <BiHistory size={22} className="opacity-40" />
          <p className="text-xs text-center leading-snug opacity-60">
            Your recently used tools<br />will appear here.
          </p>
        </div>
      </div>

      {/* Categories accordion */}
      <div className="px-4 py-3 flex-1">
        <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">
          Categories
        </span>
        {categories.map((cat) => {
          const CatIcon = categoryIcons[cat.value]
          return (
            <div key={cat.value} className="mb-[0.1rem]">
              <button
                className="flex items-center justify-between w-full bg-transparent border-0 py-2 px-[0.4rem] text-[0.925rem] font-medium text-foreground cursor-pointer rounded-md transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                onClick={() => toggleCategory(cat.value)}
              >
                <span className={`${openCategory === cat.value ? "text-primary" : "text-black"} : flex items-center gap-2`}>
                  <CatIcon size={16} />
                  {cat.label}
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
                        {sub.label}
                      </span>
                      {tools
                        .filter((t) => t.category === cat.value && t.subCategory === sub.value)
                        .map((tool) => {
                          const slug = tool.href.split("/").pop() ?? ""
                          const ToolIcon = toolIcons[slug]
                          return (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-center gap-2 py-[0.28rem] px-2 text-sm text-foreground no-underline rounded-[5px] transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                            >
                              {ToolIcon && <ToolIcon size={14} className="shrink-0 opacity-70" />}
                              {tool.name}
                            </Link>
                          )
                        })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </nav>
  )
}
