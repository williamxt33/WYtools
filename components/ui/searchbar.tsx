"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { categories, tools } from "@/lib/tools/registry"
import { categoryIcons, toolIcons } from "@/lib/tools/icons"

type SearchBarProps = {
  placeholder?: string
  className?: string
}

export default function SearchBar({ placeholder = "Search tools...", className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = query.trim()
    ? tools.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    : tools

  const grouped = categories
    .map((cat) => ({
      ...cat,
      tools: filtered.filter((t) => t.category === cat.value),
    }))
    .filter((cat) => cat.tools.length > 0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  

  return (
    <div className={`relative ${className ?? "max-w-75"}`} ref={ref}>
      <div className="flex items-center bg-background border-[1.5px] border-border rounded-[10px] py-[0.8rem] pr-2 pl-[0.85rem] gap-2 transition duration-150 w-full focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]">
        <Search className="text-muted shrink-0" size={18} />
        <input
          className="flex-1 border-0 outline-none bg-transparent text-[0.9rem] text--foreground placeholder:text-muted"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            className="bg-transparent border-0 cursor-pointer text-xs text-muted py-[0.1rem] px-[0.3rem] rounded transition-colors duration-150 hover:text-foreground"
            onClick={() => { setQuery(""); setOpen(true) }}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 min-w-80 bg-background border border-border rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2 z-100 max-h-105 overflow-y-auto">
          {grouped.length === 0 ? (
            <p className="text-[0.85rem] text-muted text-center p-4">No tools found</p>
          ) : (
            grouped.map((cat) => {
              const Icon = categoryIcons[cat.value]
              return(
                <div key={cat.value} className="pb-1 not-first:border-t not-first:border-border not-first:pt-2 not-first:mt-1">
                  <p className="flex items-center gap-1.5 text-[0.7rem] font-bold tracking-[0.08em] uppercase text-primary pt-[0.3rem] px-[0.6rem] pb-[0.4rem]">
                    {Icon && <Icon size={13} />}
                    {cat.label}
                  </p>
                  {cat.tools.map((tool) => {
                    const slug = tool.href.split("/").pop() ?? ""
                    const ToolIcon = toolIcons[slug]
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center gap-2 py-2 px-[0.6rem] rounded-lg no-underline transition-colors duration-120 hover:bg-primary-light"
                        onClick={() => { setOpen(false); setQuery("") }}
                      >
                        {ToolIcon && <ToolIcon size={15} className="shrink-0 text-muted" />}
                        <span className="text-[0.9rem] font-medium text-foreground">{tool.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
