"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { categories, tools } from "@/lib/tools/registry"

type SearchBarProps = {
  placeholder?: string
}

export default function SearchBar({ placeholder = "Search tools..." }: SearchBarProps) {
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
    <div className="searchbar-wrapper" ref={ref}>
      <div className="searchbar">
        <Search className="searchbar-icon" size={18} />
        <input
          className="searchbar-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            className="searchbar-clear"
            onClick={() => { setQuery(""); setOpen(true) }}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="searchbar-dropdown">
          {grouped.length === 0 ? (
            <p className="searchbar-empty">No tools found</p>
          ) : (
            grouped.map((cat) => (
              <div key={cat.value} className="searchbar-section">
                <p className="searchbar-section-label"># {cat.label}</p>
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="searchbar-item"
                    onClick={() => { setOpen(false); setQuery("") }}
                  >
                    <span className="searchbar-item-name">{tool.name}</span>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
