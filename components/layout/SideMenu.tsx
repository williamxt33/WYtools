"use client"

import Link from "next/link"
import { useState } from "react"
import { BiChevronDown, BiX } from "react-icons/bi"
import { MdLanguage } from "react-icons/md"
import { categories, getToolsBySubCategory, type ToolCategory } from "@/lib/tools/registry"
import { languages, type Language } from "@/lib/languages"
import { categoryIcons, toolIcons } from "@/lib/tools/icons"

type SideMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null)
  const [language, setLanguage] = useState<Language>(languages[0])
  const [showLanguages, setShowLanguages] = useState(false)

  function toggleCategory(catValue: ToolCategory) {
    setOpenCategory((prev) => (prev === catValue ? null : catValue))
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-200 animate-[fadeIn_0.2s_ease]" onClick={onClose} />}

      <div className={`fixed top-0 left-0 h-screen w-75 max-w-[85vw] bg-background z-201 transition-transform duration-280 ease-in-out flex flex-col overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.14)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-end py-[0.6rem] px-3 border-b border-border shrink-0">
          <button className="bg-transparent border-0 cursor-pointer flex items-center justify-center text-foreground p-[0.4rem] rounded-md transition-colors duration-150 hover:text-primary" onClick={onClose} aria-label="Close menu">
            <BiX size={24} />
          </button>
        </div>

        {/* Language switcher */}
        <div className="py-3 px-4 border-b border-border">
          <button
            className="flex items-center gap-2 w-full bg-transparent border border-border rounded-lg py-2 px-3 text-[0.9rem] text-foreground cursor-pointer transition-colors duration-150 hover:bg-primary-light hover:text-primary"
            onClick={() => setShowLanguages((s) => !s)}
          >
            <MdLanguage size={18} />
            <span className="flex-1 text-left">{language.label}</span>
            <BiChevronDown className={`transition-transform duration-200 shrink-0 ${showLanguages ? "rotate-180" : ""}`} />
          </button>
          {showLanguages && (
            <ul className="list-none mt-2 border border-border rounded-lg overflow-hidden animate-[slideDown_0.15s_ease]">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  className={`flex items-center gap-[0.6rem] py-[0.45rem] px-3 cursor-pointer text-sm transition-colors duration-120 hover:bg-primary-light hover:text-primary ${language.code === lang.code ? "text-primary font-semibold" : "text-foreground"}`}
                  onClick={() => { setLanguage(lang); setShowLanguages(false) }}
                >
                  <span className="language-code">{lang.code}</span>
                  <span className="language-label">{lang.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Categories accordion */}
        <div className="py-3 px-4 border-b border-border">
          <span className="block text-[0.68rem] font-bold tracking-[0.09em] uppercase text-muted mb-2">Categories</span>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.value]
            return(
              <div key={cat.value} className="mb-[0.1rem]">
                <button
                  className="flex items-center justify-between w-full bg-transparent border-0 py-2 px-[0.4rem] text-[0.925rem] font-medium text-foreground cursor-pointer rounded-md transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                  onClick={() => toggleCategory(cat.value)}
                >
                  <span className={`${openCategory === cat.value ? "text-primary" : "text-black"} : flex items-center gap-2`}>
                    {Icon && <Icon size={13}/>}
                    {cat.label}
                  </span>
                  <BiChevronDown className={`transition-transform duration-200 shrink-0 ${openCategory === cat.value ? "text-primary rotate-180" : ""}`} />
                </button>
                {openCategory === cat.value && (
                  <div className="pt-[0.2rem] pb-[0.3rem] pl-3 animate-[slideDown_0.15s_ease]">
                    {cat.subCategories.map((sub) => (
                      <div key={sub.value} className="mb-[0.6rem]">
                        <span className="block text-[0.68rem] font-bold tracking-[0.07em] uppercase text-muted pt-[0.2rem] pb-1">{sub.label}</span>
                        {getToolsBySubCategory(sub.value).map((tool) => {
                          const slug = tool.href.split("/").pop() ?? ""
                          const ToolIcon = toolIcons[slug]
                          return(
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="flex items-center gap-2 py-[0.28rem] px-2 text-sm text-foreground no-underline rounded-[5px] transition-colors duration-120 hover:bg-primary-light hover:text-primary"
                              onClick={onClose}
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

        <div className="mt-auto p-4 border-t border-border shrink-0">
          <Link href="/" className="block text-center p-[0.6rem] bg-primary text-white! no-underline rounded-lg text-[0.9rem] font-semibold transition-colors duration-150 hover:bg-[var(--color-primary-hover)]" onClick={onClose}>
            Sign In
          </Link>
        </div>
      </div>
    </>
  )
}
