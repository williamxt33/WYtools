import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="bg-[#f5f5f5] border-t border-border">
      <div className="max-w-200 mx-auto py-10 px-6 flex flex-row justify-between items-start gap-12 max-lg:flex-col max-lg:gap-8">
        <div className="flex flex-col gap-3 max-w-70 max-lg:max-w-full">
          <Image src="/icons/full_logo.png" alt={t("logoAlt")} height={50} width={140} />
          <p className="text-[0.85rem] text-muted leading-[1.65]">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col shrink-0">
          <h3 className="text-base font-semibold text-foreground mb-[0.85rem]">{t("navigate")}</h3>
          <ul className="list-none flex flex-col gap-[0.55rem]">
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("links.home")}</Link></li>
            <li><Link href="/privacy" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("links.privacyPolicy")}</Link></li>
            <li><Link href="/tos" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("links.tos")}</Link></li>
            <li><Link href="/about" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("links.about")}</Link></li>
          </ul>
        </div>

        <div className="flex flex-col shrink-0">
          <h3 className="text-base font-semibold text-foreground mb-[0.85rem]">{t("featuredTools")}</h3>
          <ul className="list-none flex flex-col gap-[0.55rem]">
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("tools.groupsGenerator")}</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("tools.wheelSpinGenerator")}</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("tools.bmiCalculator")}</Link></li>
            <li><Link href="/" className="text-[0.85rem] text-muted no-underline transition-colors duration-150 hover:text-primary">{t("tools.mortgageCalculator")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#f5f5f5] text-center pb-[0.9rem] text-[0.8rem] text-muted before:content-[''] before:block before:max-w-200 before:mx-auto before:px-6 before:border-t before:border-[#c8c8c8] before:pt-[0.9rem]">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  )
}
