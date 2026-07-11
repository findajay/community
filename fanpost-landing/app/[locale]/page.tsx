import SignupForm from "../components/SignupForm";
import { LOCALES, getDict, isLocale, DEFAULT_LOCALE } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDict(locale);

  return (
    <>
      <header className="wrap nav">
        <div className="logo">
          Fan<span>Post</span>
        </div>
        <nav className="lang">
          {LOCALES.map((l) => (
            <a key={l} href={`/${l}`} className={l === locale ? "active" : ""}>
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="wrap hero">
          <div className="badge">
            {t.hero.badgePre}
            <b>{t.hero.badgeBold}</b>
          </div>
          <h1>
            {t.hero.h1Plain} <em>{t.hero.h1Em}</em>
          </h1>
          <p className="sub">
            {t.hero.sub1}
            <strong>{t.hero.subStrong}</strong>
            {t.hero.sub2}
          </p>
          <div id="waitlist">
            <SignupForm locale={locale} f={t.form} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>{t.features.title}</h2>
            <p className="section-lede">{t.features.lede}</p>
            <div className="grid">
              <div className="card">
                <div className="icon">📬</div>
                <h3>{t.features.weeklyTitle}</h3>
                <p>{t.features.weeklyText}</p>
              </div>
              <div className="card">
                <div className="icon">🎟️</div>
                <h3>{t.features.ticketsTitle}</h3>
                <p>{t.features.ticketsText}</p>
              </div>
              <div className="card">
                <div className="icon">📅</div>
                <h3>{t.features.calendarTitle}</h3>
                <p>{t.features.calendarText}</p>
              </div>
              <div className="card">
                <div className="icon">🛂</div>
                <h3>
                  {t.features.passportTitle}
                  <span className="soon">{t.features.passportSoon}</span>
                </h3>
                <p>{t.features.passportText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>{t.how.title}</h2>
            <div className="steps" style={{ marginTop: 32 }}>
              <div className="step">
                <h3>{t.how.step1Title}</h3>
                <p>{t.how.step1Text}</p>
              </div>
              <div className="step">
                <h3>{t.how.step2Title}</h3>
                <p>{t.how.step2Text}</p>
              </div>
              <div className="step">
                <h3>{t.how.step3Title}</h3>
                <p>{t.how.step3Text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap faq">
            <h2>{t.faq.title}</h2>
            <div style={{ marginTop: 24 }}>
              {t.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <div>© {new Date().getFullYear()} a2welt UG (haftungsbeschränkt)</div>
        <nav>
          <a href={`/${locale}/impressum`}>{t.footer.impressum}</a>
          <a href={`/${locale}/datenschutz`}>{t.footer.privacy}</a>
        </nav>
      </footer>
    </>
  );
}
