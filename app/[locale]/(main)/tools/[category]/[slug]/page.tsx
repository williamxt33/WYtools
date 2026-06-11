import ToolShell from "@/components/tools/ToolShell";
import { tools } from "@/lib/tools/registry";

type Props = {
  params: Promise<{ 
    category: string
    slug: string 
  }>
}


export default async function ToolPage({params}: Props){
  const { category, slug } = await params

  const href = `/tools/${category}/${slug}`
  const tool = tools.find((t) => t.href === href)

  if (!tool) return <div>Tool not found</div>

  return(
    <ToolShell tool={tool}/>
  )
}