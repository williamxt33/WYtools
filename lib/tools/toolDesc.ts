import data from "./toolDesc.json"

export type ToolDesc = {
  what: string
  howToUse: string[]
}

export function getToolDesc(href: string): ToolDesc | null {
  const slug = href.split("/").at(-1) ?? ""
  return (data as Record<string, ToolDesc>)[slug] ?? null
}
