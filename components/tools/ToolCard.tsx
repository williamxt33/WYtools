"use client"

import Link from "next/link"
import { useState } from "react"
import { type Tool } from "@/lib/tools/registry"
import { toolIcons } from "@/lib/tools/icons"
import { BiHeart, BiSolidHeart } from "react-icons/bi"
import { MdSwapHoriz, MdAutoAwesome, MdCalculate } from "react-icons/md"

const categoryIcons = {
  converters: MdSwapHoriz,
  generators: MdAutoAwesome,
  calculators: MdCalculate,
}

type Props = { tool: Tool }

export default function ToolCard({ tool }: Props) {
  const [faved, setFaved] = useState(false)
  const slug = tool.href.split("/").pop() ?? ""
  const Icon = toolIcons[slug] ?? categoryIcons[tool.category]

  return (
    <Link href={tool.href} className="flex flex-col gap-2 p-4 border border-[var(--color-border)] rounded-xl no-underline bg-[var(--color-background)] transition duration-150 hover:border-[var(--color-primary)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      <div className="flex items-center justify-between">
        <div className="w-[38px] h-[38px] flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-lg">
          <Icon size={20} />
        </div>
        <button
          className={`bg-transparent border-0 cursor-pointer p-[0.2rem] rounded flex items-center transition-colors duration-150 hover:text-red-500 ${faved ? "text-red-500" : "text-[var(--color-muted)]"}`}
          onClick={(e) => { e.preventDefault(); setFaved(!faved) }}
          aria-label="Favourite"
        >
          {faved ? <BiSolidHeart size={16} /> : <BiHeart size={16} />}
        </button>
      </div>
      <span className="text-[0.95rem] font-semibold text-[var(--color-foreground)]">{tool.name}</span>
      <p className="text-[0.8rem] text-[var(--color-muted)] leading-[1.4]">{tool.description}</p>
    </Link>
  )
}
