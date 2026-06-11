import { categories, tools } from "@/lib/tools/registry"
import ToolCard from "@/components/tools/ToolCard"
import Link from "next/link"
import { categoryIcons } from "@/lib/tools/icons"



export default function HomePage() {
  return (
    <main className="w-full flex flex-col justify-center">
      <div className="mt-5">
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4 text-center">
          Welcome to WYTools
        </h1>
        <p className="text-xl text-muted text-center">
          The all-in-one tool you'll ever need
        </p>
      </div>

      <div className="flex flex-col gap-10 w-full max-w-275 py-8 px-6 mx-auto">
        {categories.map((cat) => (
          <div key={cat.value} className="flex flex-col w-full gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2.5">
                {(() => { const Icon = categoryIcons[cat.value]; return <Icon size={30} /> })()}
                <h2 className="text-xl text-bold">{cat.label}</h2>
              </div>
              <Link className="text-blue-500" href={`/tools/${cat.value}`}>See All</Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {tools
                .filter((tool) => tool.category === cat.value)
                .reduce((acc, tool) => {
                  const sub = tool.subCategory
                  if (!acc.seen[sub]) {
                    acc.seen[sub] = 0
                  }

                  if (acc.seen[sub] < 3) {
                    acc.seen[sub] ++
                    acc.result.push(tool)
                  }
                  return acc
                },{seen: {} as Record<string, number>, result: [] as typeof tools})
                .result
                .map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
