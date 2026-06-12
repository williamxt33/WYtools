import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main className="px-100">
      <h1 className="text-center text-5xl mt-10 font-semibold mb-10">{t("title")}</h1>
      <span className="text-lg font-bold">{t("whatIsIt")}</span>
      <p className="mb-10">{t("whatIsItBody")}</p>
      <span className="text-lg font-bold">{t("whoAmI")}</span>
      <p className="mb-10">{t("whoAmIBody")}</p>
      <span className="text-lg font-bold">{t("features")}</span>
      <p className="mb-10">{t("featuresBody")}</p>
    </main>
  );
}
