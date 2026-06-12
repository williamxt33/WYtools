import { useTranslations } from "next-intl";

export default function TOSPage() {
  const t = useTranslations("TOS");

  return (
    <main className="px-100">
      <h1 className="text-center text-5xl mt-10 font-semibold mb-2">{t("title")}</h1>
      <p className="text-center text-sm text-gray-500 mb-10">{t("lastUpdated")}</p>

      <span className="text-lg font-bold">{t("acceptance")}</span>
      <p className="mb-10">{t("acceptanceBody")}</p>

      <span className="text-lg font-bold">{t("use")}</span>
      <p className="mb-10">{t("useBody")}</p>

      <span className="text-lg font-bold">{t("accounts")}</span>
      <p className="mb-10">{t("accountsBody")}</p>

      <span className="text-lg font-bold">{t("ip")}</span>
      <p className="mb-10">{t("ipBody")}</p>

      <span className="text-lg font-bold">{t("disclaimer")}</span>
      <p className="mb-10">{t("disclaimerBody")}</p>

      <span className="text-lg font-bold">{t("changes")}</span>
      <p className="mb-10">{t("changesBody")}</p>

      <span className="text-lg font-bold">{t("contact")}</span>
      <p className="mb-10">{t("contactBody")}</p>
    </main>
  );
}
