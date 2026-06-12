export type Language = {
  locale: string
  code: string
  label: string
}

export const languages: Language[] = [
  { locale: "en",    code: "EN", label: "English" },
  { locale: "zh-TW", code: "ZH", label: "繁體中文" },
  { locale: "ja",    code: "JA", label: "日本語" },
  { locale: "ko",    code: "KO", label: "한국어" },
]
