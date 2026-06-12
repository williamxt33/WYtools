import { tools, categories } from "@/lib/tools/registry"
import ToolCard from "@/components/tools/ToolCard"
import { getTranslations } from "next-intl/server"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const tR = await getTranslations("Registry")

  return (
    <main className="w-full flex flex-col justify-center mb-10">
      <div className="flex flex-col justify-center text-center">
        <h1 className="capitalize text-5xl font-bold mt-10 mb-5">
          {tR(`categories.${category}`)}
        </h1>
        <p className="text-lg">{tR(`categoryDescriptions.${category}`)}</p>
      </div>
      <div>
        {categories
          .filter(cat => cat.value === category)
          .map(cat => (
            <div className="flex flex-col gap-10 w-full px-8 pb-6 max-w-275 mx-auto" key={cat.value}>
              <div>
                {cat.subCategories.map(subcat => (
                  <div className="mt-10" key={subcat.value}>
                    <span className="text-xl">
                      {tR(`subCategories.${subcat.value}`)}
                    </span>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-5">
                      {tools
                        .filter((t) => t.category === cat.value && t.subCategory === subcat.value)
                        .map(t => (
                          <ToolCard key={t.href} tool={t} />
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
