"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { categories, getToolsBySubCategory, type ToolCategory, type ToolSubCategory } from "@/lib/tools/registry"
import { BiChevronDown } from "react-icons/bi"
import { MdLanguage } from "react-icons/md"
import SearchBar from "@/components/ui/searchbar"
import { languages, type Language } from "@/lib/languages"
import { toolIcons } from "@/lib/tools/icons"

export default function NavBarBig() {
  const [openCategory, setOpenCategory] = useState<ToolCategory | null>(null)
  const [activeSubCat, setActiveSubCat] = useState<ToolSubCategory | null>(null)
  const [openLanguage, setOpenLanguage] = useState(false)
  const [language, setLanguage] = useState<Language>(languages[0])

  function handleCategoryEnter(catValue: ToolCategory) {
    const cat = categories.find((c) => c.value === catValue)
    setOpenCategory(catValue)
    setActiveSubCat(cat?.subCategories[0]?.value ?? null)
  }

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-background border-b border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <nav className="w-full px-6 h-16 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center no-underline">
            <Image src="/icons/full_logo.png" alt="WyTools logo" width={150} height={78} />
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
              <Link href={`/tools/${cat.value}`} className="inline-flex flex-row items-center justify-center gap-2 py-1.5 px-2.5 rounded-lg text-base font-medium text-foreground cursor-pointer transition-colors duration-150 hover:text-primary">
                <span>{cat.label}</span>
                <BiChevronDown className={`${openCategory === cat.value? "rotate-180 mt-1" : ""} size-5`}/>
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
                        {sub.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-2 flex flex-col gap-[0.1rem] max-h-37.5 overflow-auto">
                    {activeSubCat &&
                      getToolsBySubCategory(activeSubCat).map((tool) => {
                        const slug = tool.href.split("/").pop() ?? ""
                        const ToolIcon = toolIcons[slug]
                        return(
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-2 px-2 py-1 rounded-md text-[0.9rem] font-medium text-foreground no-underline whitespace-nowrap transition-colors duration-150 hover:text-primary"
                          >
                              {ToolIcon && <ToolIcon size={13}/>}
                              {tool.name}
                          </Link>
                        )
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
              <span>{language.code}</span>
              <BiChevronDown />
            </div>
            {openLanguage && (
              <ul className="absolute top-[calc(100%+1px)] right-0 min-w-40 bg-background border border-border rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-[0.4rem] list-none flex flex-col gap-[0.1rem] z-100">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    className={`flex items-center gap-[0.6rem] px-[0.6rem] py-[0.4rem] rounded-md cursor-pointer transition-colors duration-150 hover:bg-primary-light hover:text-primary${language.code === lang.code ? " text-primary font-semibold" : " text-foreground"}`}
                    onClick={() => setLanguage(lang)}
                  >
                    <span className="text-[0.8rem] font-bold min-w-8">{lang.code}</span>
                    <span className="text-[0.9rem]">{lang.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            href="/signin"
            className="bg-primary text-white px-[1.1rem] py-[0.4rem] rounded-md whitespace-nowrap hover:bg-primary-hover transition-colors duration-150 no-underline"
          >
            Sign In
          </Link>
        </div>

      </nav>
    </header>
  )
}
