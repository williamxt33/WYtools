export type ToolCategory = "converters" | "generators" | "calculators"

export type Tool = {
  name: string
  description: string
  href: string
  category: ToolCategory
}

export const tools: Tool[] = [
  {
    name: "Unit Converter",
    description: "Convert between length, weight, temperature and more",
    href: "/tools/converters/unit-converter",
    category: "converters",
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats",
    href: "/tools/converters/color-converter",
    category: "converters",
  },
  {
    name: "Password Generator",
    description: "Generate strong, secure random passwords",
    href: "/tools/generators/password-generator",
    category: "generators",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs (v4)",
    href: "/tools/generators/uuid-generator",
    category: "generators",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, discounts, and changes",
    href: "/tools/calculators/percentage-calculator",
    category: "calculators",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age from a date of birth",
    href: "/tools/calculators/age-calculator",
    category: "calculators",
  },
]

export const categories: { label: string; value: ToolCategory }[] = [
  { label: "Converters", value: "converters" },
  { label: "Generators", value: "generators" },
  { label: "Calculators", value: "calculators" },
]

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category)
}
