import { getDict, isLocale, DEFAULT_LOCALE } from "@/lib/i18n";

export default async function Confirmed({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDict(locale);
  return (
    <main className="confirmed">
      <div className="icon">🎟️</div>
      <h1>{t.confirmed.title}</h1>
      <p>{t.confirmed.text}</p>
      <p>
        <a href={`/${locale}`}>{t.confirmed.back}</a>
      </p>
    </main>
  );
}
