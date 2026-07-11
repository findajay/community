import Image from "next/image";
import SignupForm from "../components/SignupForm";
import Reveal from "../components/Reveal";
import BriefPreview from "../components/BriefPreview";
import {
  EnvelopeSimple,
  Ticket,
  CalendarDots,
  Stamp,
} from "@phosphor-icons/react/dist/ssr";
import { LOCALES, getDict, isLocale, DEFAULT_LOCALE } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDict(locale);

  const tickerItems = [
    t.features.weeklyTitle,
    t.features.ticketsTitle,
    t.features.calendarTitle,
    t.features.passportTitle,
  ];

  return (
    <>
      {/* Dark zone: nav + split hero + marquee + bento. One theme switch below. */}
      <div className="zone-dark">
        <div className="hero-shell">
          <Image
            src="/img/hero-stadium.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <header className="wrap nav">
            <div className="logo">
              Fan<span>Post</span>
            </div>
            <nav className="lang" aria-label="Language">
              {LOCALES.map((l) => (
                <a key={l} href={`/${l}`} className={l === locale ? "active" : ""}>
                  {l.toUpperCase()}
                </a>
              ))}
            </nav>
          </header>

          <section className="wrap hero">
            <div className="hero-copy">
            <p className="badge">
              {t.hero.badgePre}
              <b>{t.hero.badgeBold}</b>
            </p>
            <h1>
              {t.hero.h1Plain} <em>{t.hero.h1Em}</em>
            </h1>
            <p className="sub">{t.hero.sub}</p>
            <a className="btn" href="#waitlist">
              {t.form.submit}
            </a>
          </div>
            <div className="hero-visual">
              <BriefPreview p={t.preview} />
            </div>
          </section>
        </div>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((half) =>
              tickerItems.map((item) => (
                <span key={`${half}-${item}`}>
                  {item}
                  <i className="tick-sep">/</i>
                </span>
              ))
            )}
          </div>
        </div>

        <section className="wrap section">
          <h2>{t.features.title}</h2>
          <p className="section-lede">{t.features.lede}</p>
          <div className="bento">
            <div className="tile tile-wide tile-glow" data-reveal>
              <EnvelopeSimple size={26} weight="duotone" className="tile-icon" />
              <h3>{t.features.weeklyTitle}</h3>
              <p>{t.features.weeklyText}</p>
            </div>
            <div className="tile tile-accent" data-reveal>
              <Ticket size={26} weight="duotone" className="tile-icon" />
              <h3>{t.features.ticketsTitle}</h3>
              <p>{t.features.ticketsText}</p>
            </div>
            <div className="tile" data-reveal>
              <CalendarDots size={26} weight="duotone" className="tile-icon" />
              <h3>{t.features.calendarTitle}</h3>
              <p>{t.features.calendarText}</p>
            </div>
            <div className="tile tile-photo" data-reveal>
              <Image
                src="/img/passport-tickets.jpg"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                className="tile-photo-img"
              />
              <div className="tile-photo-scrim" aria-hidden="true" />
              <div className="tile-photo-body">
                <Stamp size={26} weight="duotone" className="tile-icon" />
                <h3>
                  {t.features.passportTitle}
                  <span className="soon">{t.features.passportSoon}</span>
                </h3>
                <p>{t.features.passportText}</p>
              </div>
            </div>
          </div>
        </section>

        <figure className="band">
          <Image
            src="/img/band-crowd.jpg"
            alt=""
            fill
            sizes="100vw"
            className="band-img"
          />
        </figure>
      </div>

      {/* Single deliberate theme switch: everything below is light. */}
      <main className="zone-light">
        <section className="wrap section">
          <h2>{t.how.title}</h2>
          <div className="steps">
            <div className="step" data-reveal>
              <h3>{t.how.step1Title}</h3>
              <p>{t.how.step1Text}</p>
            </div>
            <div className="step" data-reveal>
              <h3>{t.how.step2Title}</h3>
              <p>{t.how.step2Text}</p>
            </div>
            <div className="step" data-reveal>
              <h3>{t.how.step3Title}</h3>
              <p>{t.how.step3Text}</p>
            </div>
          </div>
        </section>

        <section className="wrap section" id="waitlist">
          <SignupForm locale={locale} f={t.form} />
        </section>

        <section className="wrap section faq">
          <h2>{t.faq.title}</h2>
          <div className="faq-list">
            {t.faq.items.map((item) => (
              <details key={item.q} data-reveal>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="wrap footer">
          <div>© {new Date().getFullYear()} a2welt UG (haftungsbeschränkt)</div>
          <nav>
            <a href={`/${locale}/impressum`}>{t.footer.impressum}</a>
            <a href={`/${locale}/datenschutz`}>{t.footer.privacy}</a>
          </nav>
        </footer>
      </main>

      <Reveal />
    </>
  );
}
