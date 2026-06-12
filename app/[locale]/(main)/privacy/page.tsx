import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <main className="px-100">
      <h1 className="text-center text-5xl mt-10 font-semibold mb-2">{t("title")}</h1>
      <p className="text-center text-sm text-gray-500 mb-10">{t("lastUpdated")}</p>

      <span className="text-lg font-bold">{t("collect")}</span>
      <p className="mb-10">{t("collectBody")}</p>

      <span className="text-lg font-bold">{t("use")}</span>
      <p className="mb-10">{t("useBody")}</p>

      <span className="text-lg font-bold">{t("cookies")}</span>
      <p className="mb-10">{t("cookiesBody")}</p>

      <span className="text-lg font-bold">{t("storage")}</span>
      <p className="mb-10">{t("storageBody")}</p>

      <span className="text-lg font-bold">{t("rights")}</span>
      <p className="mb-10">{t("rightsBody")}</p>

      <span className="text-lg font-bold">{t("changes")}</span>
      <p className="mb-10">{t("changesBody")}</p>

      <span className="text-lg font-bold">{t("contact")}</span>
      <p className="mb-10">{t("contactBody")}</p>
    </main>
  );
}
