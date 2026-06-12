import dynamic from "next/dynamic"
import { tools, type Tool } from "@/lib/tools/registry"
import ToolCard from "@/components/tools/ToolCard"
import UnitConverter from "@/components/tools/converters/Unit"
import SideBar from "@/components/layout/SideBar"
import { useTranslations } from "next-intl"

type Props = { tool: Tool }

function slugToComponentName(slug: string) {
  return slug.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("")
}

const dynamicComponents: Record<string, React.ComponentType<any>> = {}

function getDynamicComponent(categories: string, slug: string) {
  if (!dynamicComponents[slug]) {
    dynamicComponents[slug] = dynamic(() => import(`@/components/tools/${categories}/${slugToComponentName(slug)}`))
  }
  return dynamicComponents[slug]
}

export default function ToolShell({ tool }: Props) {
  const tR = useTranslations("Registry");
  const tS = useTranslations("ToolShell");
  const tD = useTranslations("ToolDesc");

  const slug = tool.href.split("/").at(-1)!
  const cagtegories = tool.href.split("/").at(-2)!
  const isUnitConverter = tool.props?.unitType !== undefined

  const ToolComponent: React.ComponentType<any> = isUnitConverter
    ? UnitConverter
    : getDynamicComponent(cagtegories, slug)

  const what = tD.has(`${slug}.what`) ? tD(`${slug}.what`) : null
  const howToUse = tD.has(`${slug}.howToUse`) ? tD.raw(`${slug}.howToUse`) as string[] : null

  return (
    <div className="flex flex-row">
      <SideBar />
      <main className="px-10 pt-4 mb-10 md:px-24 lg:px-44">
        <h1 className="text-4xl font-bold mb-6">{tR(`tools.${slug}.name`)}</h1>

        <ToolComponent {...(tool.props ?? {})} />

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">{tS("similarTools")}</h2>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {tools
              .filter((t) => t.subCategory === tool.subCategory)
              .filter((t) => t.href !== tool.href)
              .slice(0, 10)
              .map((t) => (
                <ToolCard key={t.href} tool={t} />
              ))}
          </div>
        </section>

        {what && howToUse && (
          <section>
            <div className="tool-desc-what">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">{tS("whatIs", { name: tR(`tools.${slug}.name`) })}</h2>
              <p>{what}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">{tS("howToUse")}</h2>
              <ol>
                {howToUse.map((step, i) => (
                  <li key={i}>{i + 1}. {step}</li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
