export const LOCALES = ["de", "en", "fr", "es", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const de = {
  meta: {
    title: "FanPost – Deine Fußballwoche. Eine E-Mail.",
    description:
      "Spielpläne, Vorverkaufsstarts, Anstoßzeit-Änderungen und Ergebnisse für deine Vereine – über alle Ligen hinweg. Ein 2-Minuten-Briefing pro Woche. Nie wieder einen Vorverkauf verpassen.",
  },
  nav: { join: "Auf die Warteliste" },
  hero: {
    badgePre: "Gründungsmitglieder: Die ersten 100 sichern sich ",
    badgeBold: "30 €/Jahr – für immer",
    h1Plain: "Deine Fußballwoche.",
    h1Em: "Eine E-Mail.",
    sub1: "Spielpläne, Vorverkaufsstarts, Anstoßzeit-Änderungen und Ergebnisse – nur für ",
    subStrong: "deine",
    sub2: " Vereine, über alle Ligen hinweg. Ein 2-Minuten-Briefing pro Woche. Nie wieder einen Vorverkauf verpassen.",
  },
  features: {
    title: "Für Fans, die mehr als einem Verein folgen",
    lede: "Du folgst deinem Heimatverein, deinem Bundesliga-Klub und vielleicht noch einem Verein im Ausland. Auf dem Laufenden bleiben heißt: fünf Apps, drei Newsletter – und ein verpasster Vorverkauf. FanPost ersetzt das alles mit einem persönlichen Briefing.",
    weeklyTitle: "Das Wochen-Briefing",
    weeklyText:
      "Ergebnisse, Tabellenstand und die nächsten Spiele deiner Vereine – in 2 Minuten gelesen, jede Woche in deinem Postfach.",
    ticketsTitle: "Vorverkaufs-Alarm",
    ticketsText:
      "Eine E-Mail, sobald der Ticketverkauf für deine Vereine startet – auch für Auswärtskontingente. Das Feature, für das Fans allein schon zahlen würden.",
    calendarTitle: "Kalender-Sync",
    calendarText:
      "Ein Abo-Link bringt alle Spiele in deinen Google- oder Outlook-Kalender – und aktualisiert sich selbst, wenn das TV-Programm den Anstoß verschiebt.",
    passportTitle: "Stadion-Pass",
    passportSoon: "bald",
    passportText:
      "Im Stadion gewesen? Ein Tipp genügt. Deine persönliche Bilanz aus Stadien, Derbys und live gesehenen Toren.",
  },
  how: {
    title: "So funktioniert's",
    step1Title: "Wähl deine Vereine",
    step1Text:
      "Beliebige Vereine, Ligen und Länder – von der Bundesliga bis zur Regionalliga.",
    step2Title: "Erhalte dein Briefing",
    step2Text:
      "Jede Woche: Was war, was kommt, was zu tun ist – Tickets, Anstoßzeiten, Pokal-Auslosungen.",
    step3Title: "Verpasse nichts mehr",
    step3Text:
      "Die Spiele stehen in deinem Kalender, Vorverkaufs-Alarme kommen rechtzeitig zum Kaufen.",
  },
  faq: {
    title: "Was Fans fragen",
    items: [
      {
        q: "Ist das noch eine News-App?",
        a: "Nein. FanPost konkurriert nicht mit deinem Feed – es ersetzt das ständige Nachschauen. Ein Werkzeug: Was ist passiert, was kommt, was ist zu tun – nur für deine Vereine.",
      },
      {
        q: "Was kostet das?",
        a: "Es wird eine Gratis-Version geben (ein Verein, monatliches Briefing). Die Vollversion – unbegrenzte Vereine, wöchentliches Briefing, Vorverkaufs-Alarm, Kalender-Sync – wird etwa 4–5 €/Monat kosten. Die ersten 100 Gründungsmitglieder sichern sich 30 €/Jahr, für immer.",
      },
      {
        q: "Welche Ligen werden abgedeckt?",
        a: "Zum Start: die großen europäischen Ligen plus die deutschen Ligen bis in die 3. Liga. Weitere folgen – priorisiert nach den Vereinen der Warteliste. Sag uns bei der Anmeldung, wem du folgst.",
      },
      {
        q: "Was passiert mit meiner E-Mail-Adresse?",
        a: "Du bekommst eine Bestätigungs-E-Mail (Double-Opt-in), danach gelegentlich Updates zum Launch. Kein Spam, kein Datenverkauf, jederzeit abbestellbar. DSGVO-konform, betrieben aus Deutschland.",
      },
    ],
  },
  form: {
    title: "Auf die Warteliste",
    hint: "Kostenlos. Gründungspreise gehen zuerst an die Warteliste.",
    emailLabel: "E-Mail",
    emailPlaceholder: "du@beispiel.de",
    clubsLabel: "Welchen Vereinen folgst du? (optional)",
    clubsPlaceholder: "z. B. Union Berlin, BVB, Ajax Amsterdam",
    intentLabel: "Wenn es FanPost heute gäbe, würdest du…",
    intentFounding: "Das Gründungsangebot sichern – 30 €/Jahr",
    intentFoundingSub: "Alles inklusive, Preis für immer",
    intentMonthly: "Monatlich abonnieren – 5 €/Monat",
    intentMonthlySub: "Alles inklusive, jederzeit kündbar",
    intentFree: "Nur die Gratis-Version nutzen",
    intentFreeSub: "Ein Verein, monatliches Briefing",
    consent1:
      "Ich möchte Updates zum Launch per E-Mail erhalten. Die Einwilligung wird per Bestätigungs-E-Mail (Double-Opt-in) bestätigt und ist jederzeit widerrufbar. Siehe ",
    consentLink: "Datenschutzerklärung",
    consent2: ".",
    submit: "Auf die Warteliste →",
    submitting: "Wird eingetragen…",
    success:
      "Fast geschafft – prüf dein Postfach und klick den Bestätigungslink, um deinen Platz zu sichern.",
    errors: {
      invalid_email: "Bitte gib eine gültige E-Mail-Adresse ein.",
      consent_required: "Bitte bestätige die Einwilligung.",
      server_error:
        "Deine Anmeldung konnte nicht gespeichert werden. Bitte versuch es in einer Minute noch einmal.",
    },
  },
  confirmed: {
    title: "Du bist auf der Liste.",
    text: "Deine E-Mail ist bestätigt. Wir melden uns, sobald die Gründungsmitglieder-Plätze öffnen – die Warteliste bekommt zuerst Zugriff auf das 30-€/Jahr-Angebot.",
    back: "← Zurück zu FanPost",
  },
  footer: { impressum: "Impressum", privacy: "Datenschutz" },
};

export type Dict = typeof de;
export type FormDict = Dict["form"];

const en: Dict = {
  meta: {
    title: "FanPost — Your football week, in one email",
    description:
      "Fixtures, ticket on-sales, kickoff changes and results for the clubs you follow, across every league. A 2-minute brief every week. Never miss an on-sale again.",
  },
  nav: { join: "Join the waitlist" },
  hero: {
    badgePre: "Founding members: first 100 lock in ",
    badgeBold: "€30/year forever",
    h1Plain: "Your football week,",
    h1Em: "in one email.",
    sub1: "Fixtures, ticket on-sales, kickoff changes and results — for ",
    subStrong: "your",
    sub2: " clubs only, across every league you follow. A 2-minute brief every week. Never miss an on-sale again.",
  },
  features: {
    title: "Built for fans who follow more than one club",
    lede: "You follow your hometown club, your league's title contender, and maybe a club abroad you adopted years ago. Keeping up means five apps, three newsletters and a missed ticket on-sale. FanPost replaces all of it with one personal briefing.",
    weeklyTitle: "The weekly brief",
    weeklyText:
      "Results, table movement and upcoming fixtures for your clubs — written for a 2-minute read, delivered every week.",
    ticketsTitle: "Ticket on-sale alerts",
    ticketsText:
      "An email the moment tickets for your clubs go on sale — including away allocations. The feature fans would pay for alone.",
    calendarTitle: "Calendar sync",
    calendarText:
      "One subscription link puts every fixture in your Google or Outlook calendar — and updates itself when TV scheduling moves the kickoff.",
    passportTitle: "Match passport",
    passportSoon: "coming",
    passportText:
      "Been to the match? One tap logs it. Build your lifetime record of grounds, derbies and goals seen live.",
  },
  how: {
    title: "How it works",
    step1Title: "Pick your clubs",
    step1Text:
      "Any clubs, any leagues, any countries — from the Champions League to the fourth tier.",
    step2Title: "Get your brief",
    step2Text:
      "Every week: what happened, what's next, what needs action — tickets, kickoff changes, cup draws.",
    step3Title: "Never miss a match",
    step3Text:
      "Fixtures live in your calendar and on-sale alerts land in your inbox in time to actually buy.",
  },
  faq: {
    title: "Questions fans ask",
    items: [
      {
        q: "Is this another news app?",
        a: "No. FanPost doesn't compete with your feed — it replaces the checking. It's a utility: what happened, what's next, and what you need to do about it, for your clubs only.",
      },
      {
        q: "What does it cost?",
        a: "There will be a free tier (one club, monthly brief). The full version — unlimited clubs, weekly brief, ticket alerts, calendar sync — will be around €4–5/month. The first 100 founding members lock in €30/year, forever.",
      },
      {
        q: "Which leagues are covered?",
        a: "At launch: the top European leagues plus lower divisions in Germany, with more added based on what waitlist members follow. Tell us your clubs when you sign up — that's literally how we prioritise.",
      },
      {
        q: "What happens with my email?",
        a: "You get a confirmation email (double opt-in), then occasional updates about the launch. No spam, no selling your data, unsubscribe anytime. GDPR-compliant, operated from Germany.",
      },
    ],
  },
  form: {
    title: "Join the waitlist",
    hint: "Free to join. Founding-member pricing is offered to the waitlist first.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    clubsLabel: "Which clubs do you follow? (optional)",
    clubsPlaceholder: "e.g. Arsenal, Borussia Dortmund, Ajax",
    intentLabel: "If FanPost existed today, you would…",
    intentFounding: "Grab the founding deal — €30/year",
    intentFoundingSub: "Everything, locked in forever",
    intentMonthly: "Subscribe monthly — €5/month",
    intentMonthlySub: "Everything, cancel anytime",
    intentFree: "Use the free tier only",
    intentFreeSub: "One club, monthly brief",
    consent1:
      "I'd like to receive the launch updates by email. Consent is confirmed via a confirmation email (double opt-in) and can be withdrawn anytime. See the ",
    consentLink: "privacy notice",
    consent2: ".",
    submit: "Join the waitlist →",
    submitting: "Joining…",
    success:
      "Almost there — check your inbox and click the confirmation link to secure your spot.",
    errors: {
      invalid_email: "Please enter a valid email address.",
      consent_required: "Please confirm the consent checkbox.",
      server_error:
        "Could not save your signup. Please try again in a minute.",
    },
  },
  confirmed: {
    title: "You're on the list.",
    text: "Your email is confirmed. You'll hear from us when founding-member spots open — waitlist members get first access to the €30/year deal.",
    back: "← Back to FanPost",
  },
  footer: { impressum: "Impressum", privacy: "Privacy" },
};

const fr: Dict = {
  meta: {
    title: "FanPost – Ta semaine de foot. En un e-mail.",
    description:
      "Calendriers, mises en vente des billets, changements d'horaires et résultats pour tes clubs, dans tous les championnats. Un brief de 2 minutes par semaine. Ne rate plus jamais une mise en vente.",
  },
  nav: { join: "Rejoindre la liste d'attente" },
  hero: {
    badgePre: "Membres fondateurs : les 100 premiers bloquent ",
    badgeBold: "30 €/an – à vie",
    h1Plain: "Ta semaine de foot.",
    h1Em: "En un e-mail.",
    sub1: "Calendriers, mises en vente, changements d'horaires et résultats – uniquement pour ",
    subStrong: "tes",
    sub2: " clubs, dans tous les championnats que tu suis. Un brief de 2 minutes par semaine. Ne rate plus jamais une mise en vente.",
  },
  features: {
    title: "Pensé pour les fans qui suivent plus d'un club",
    lede: "Tu suis ton club de cœur, un grand de Ligue 1 et peut-être un club à l'étranger. Rester à jour, c'est cinq applis, trois newsletters – et une mise en vente ratée. FanPost remplace tout ça par un brief personnel.",
    weeklyTitle: "Le brief hebdo",
    weeklyText:
      "Résultats, classement et prochains matchs de tes clubs – lisible en 2 minutes, chaque semaine dans ta boîte mail.",
    ticketsTitle: "Alertes billetterie",
    ticketsText:
      "Un e-mail dès que la billetterie de tes clubs ouvre – y compris le parcage visiteurs. La fonction pour laquelle les fans paieraient à elle seule.",
    calendarTitle: "Synchro calendrier",
    calendarText:
      "Un seul lien d'abonnement met tous les matchs dans ton calendrier Google ou Outlook – et se met à jour quand la TV décale le coup d'envoi.",
    passportTitle: "Passeport des stades",
    passportSoon: "bientôt",
    passportText:
      "Au stade ? Un tap suffit. Ton palmarès personnel de stades, de derbys et de buts vus en vrai.",
  },
  how: {
    title: "Comment ça marche",
    step1Title: "Choisis tes clubs",
    step1Text:
      "N'importe quels clubs, championnats et pays – de la Ligue des champions au National.",
    step2Title: "Reçois ton brief",
    step2Text:
      "Chaque semaine : ce qui s'est passé, ce qui arrive, ce qu'il faut faire – billets, horaires, tirages de coupe.",
    step3Title: "Ne rate plus rien",
    step3Text:
      "Les matchs sont dans ton calendrier et les alertes billetterie arrivent à temps pour acheter.",
  },
  faq: {
    title: "Questions de fans",
    items: [
      {
        q: "Encore une appli d'actus ?",
        a: "Non. FanPost ne remplace pas ton fil d'actus – il remplace la vérification permanente. Un outil : ce qui s'est passé, ce qui arrive, ce qu'il faut faire – uniquement pour tes clubs.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Il y aura une version gratuite (un club, brief mensuel). La version complète – clubs illimités, brief hebdo, alertes billetterie, synchro calendrier – coûtera environ 4–5 €/mois. Les 100 premiers membres fondateurs bloquent 30 €/an, à vie.",
      },
      {
        q: "Quels championnats sont couverts ?",
        a: "Au lancement : les grands championnats européens, dont la Ligue 1 et la Ligue 2, puis d'autres selon les clubs suivis par la liste d'attente. Dis-nous quels clubs tu suis à l'inscription.",
      },
      {
        q: "Que devient mon adresse e-mail ?",
        a: "Tu reçois un e-mail de confirmation (double opt-in), puis quelques nouvelles du lancement. Pas de spam, pas de revente de données, désinscription à tout moment. Conforme au RGPD, opéré depuis l'Allemagne.",
      },
    ],
  },
  form: {
    title: "Rejoins la liste d'attente",
    hint: "Gratuit. Les prix fondateurs sont proposés d'abord à la liste d'attente.",
    emailLabel: "E-mail",
    emailPlaceholder: "toi@exemple.fr",
    clubsLabel: "Quels clubs suis-tu ? (facultatif)",
    clubsPlaceholder: "p. ex. RC Lens, OM, Borussia Dortmund",
    intentLabel: "Si FanPost existait aujourd'hui, tu…",
    intentFounding: "Prendrais l'offre fondateur – 30 €/an",
    intentFoundingSub: "Tout inclus, prix bloqué à vie",
    intentMonthly: "T'abonnerais au mois – 5 €/mois",
    intentMonthlySub: "Tout inclus, résiliable à tout moment",
    intentFree: "Utiliserais la version gratuite",
    intentFreeSub: "Un club, brief mensuel",
    consent1:
      "Je souhaite recevoir les nouvelles du lancement par e-mail. Le consentement est confirmé par un e-mail de confirmation (double opt-in) et révocable à tout moment. Voir la ",
    consentLink: "politique de confidentialité",
    consent2: ".",
    submit: "Rejoindre la liste d'attente →",
    submitting: "Inscription…",
    success:
      "Presque fini – vérifie ta boîte mail et clique sur le lien de confirmation pour valider ta place.",
    errors: {
      invalid_email: "Merci d'indiquer une adresse e-mail valide.",
      consent_required: "Merci de confirmer ton consentement.",
      server_error:
        "Ton inscription n'a pas pu être enregistrée. Réessaie dans une minute.",
    },
  },
  confirmed: {
    title: "Tu es sur la liste.",
    text: "Ton e-mail est confirmé. On te préviendra dès l'ouverture des places fondateurs – la liste d'attente a accès en premier à l'offre à 30 €/an.",
    back: "← Retour à FanPost",
  },
  footer: { impressum: "Mentions légales", privacy: "Confidentialité" },
};

const es: Dict = {
  meta: {
    title: "FanPost – Tu semana de fútbol. En un solo correo.",
    description:
      "Calendarios, ventas de entradas, cambios de horario y resultados de tus equipos, en todas las ligas. Un resumen de 2 minutos a la semana. No vuelvas a perderte una venta de entradas.",
  },
  nav: { join: "Unirme a la lista de espera" },
  hero: {
    badgePre: "Miembros fundadores: los primeros 100 aseguran ",
    badgeBold: "30 €/año para siempre",
    h1Plain: "Tu semana de fútbol.",
    h1Em: "En un solo correo.",
    sub1: "Calendarios, ventas de entradas, cambios de horario y resultados: solo de ",
    subStrong: "tus",
    sub2: " equipos, en todas las ligas que sigues. Un resumen de 2 minutos a la semana. No vuelvas a perderte una venta.",
  },
  features: {
    title: "Para aficionados que siguen a más de un equipo",
    lede: "Sigues al equipo de tu ciudad, a un grande de LaLiga y quizá a un club extranjero. Estar al día significa cinco apps, tres boletines y una venta de entradas perdida. FanPost lo sustituye todo por un resumen personal.",
    weeklyTitle: "El resumen semanal",
    weeklyText:
      "Resultados, clasificación y próximos partidos de tus equipos: 2 minutos de lectura, cada semana en tu bandeja de entrada.",
    ticketsTitle: "Alertas de entradas",
    ticketsText:
      "Un correo en cuanto salen a la venta las entradas de tus equipos, incluidas las de la afición visitante. La función por la que los aficionados pagarían por sí sola.",
    calendarTitle: "Sincronización de calendario",
    calendarText:
      "Un solo enlace añade todos los partidos a tu calendario de Google u Outlook, y se actualiza solo cuando la TV cambia la hora del partido.",
    passportTitle: "Pasaporte de estadios",
    passportSoon: "pronto",
    passportText:
      "¿Estuviste en el estadio? Un toque y queda registrado. Tu historial de estadios, derbis y goles vistos en directo.",
  },
  how: {
    title: "Cómo funciona",
    step1Title: "Elige tus equipos",
    step1Text:
      "Cualquier equipo, liga o país: de la Champions a Segunda RFEF.",
    step2Title: "Recibe tu resumen",
    step2Text:
      "Cada semana: qué pasó, qué viene y qué requiere acción: entradas, horarios, sorteos de copa.",
    step3Title: "No te pierdas nada",
    step3Text:
      "Los partidos viven en tu calendario y las alertas llegan a tiempo para comprar.",
  },
  faq: {
    title: "Preguntas de aficionados",
    items: [
      {
        q: "¿Otra app de noticias?",
        a: "No. FanPost no compite con tu feed: elimina la necesidad de estar comprobando. Es una herramienta: qué pasó, qué viene y qué tienes que hacer, solo de tus equipos.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Habrá una versión gratuita (un equipo, resumen mensual). La versión completa —equipos ilimitados, resumen semanal, alertas de entradas, sincronización de calendario— costará unos 4–5 €/mes. Los primeros 100 miembros fundadores se aseguran 30 €/año para siempre.",
      },
      {
        q: "¿Qué ligas están cubiertas?",
        a: "En el lanzamiento: las grandes ligas europeas, incluidas LaLiga y LaLiga Hypermotion, y añadiremos más según los equipos de la lista de espera. Dinos qué equipos sigues al apuntarte.",
      },
      {
        q: "¿Qué pasa con mi correo?",
        a: "Recibes un correo de confirmación (doble opt-in) y después novedades ocasionales del lanzamiento. Sin spam, sin venta de datos, baja cuando quieras. Conforme al RGPD, operado desde Alemania.",
      },
    ],
  },
  form: {
    title: "Únete a la lista de espera",
    hint: "Gratis. Los precios fundadores se ofrecen primero a la lista de espera.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.es",
    clubsLabel: "¿A qué equipos sigues? (opcional)",
    clubsPlaceholder: "p. ej. Real Betis, Atlético, Borussia Dortmund",
    intentLabel: "Si FanPost existiera hoy, tú…",
    intentFounding: "Cogerías la oferta fundadora: 30 €/año",
    intentFoundingSub: "Todo incluido, precio para siempre",
    intentMonthly: "Te suscribirías al mes: 5 €/mes",
    intentMonthlySub: "Todo incluido, cancela cuando quieras",
    intentFree: "Usarías solo la versión gratuita",
    intentFreeSub: "Un equipo, resumen mensual",
    consent1:
      "Quiero recibir novedades del lanzamiento por correo. El consentimiento se confirma mediante un correo de confirmación (doble opt-in) y puede retirarse en cualquier momento. Ver el ",
    consentLink: "aviso de privacidad",
    consent2: ".",
    submit: "Unirme a la lista de espera →",
    submitting: "Enviando…",
    success:
      "Casi listo: revisa tu bandeja de entrada y haz clic en el enlace de confirmación para asegurar tu plaza.",
    errors: {
      invalid_email: "Introduce una dirección de correo válida.",
      consent_required: "Confirma la casilla de consentimiento.",
      server_error:
        "No se pudo guardar tu registro. Inténtalo de nuevo en un minuto.",
    },
  },
  confirmed: {
    title: "Estás en la lista.",
    text: "Tu correo está confirmado. Te avisaremos cuando se abran las plazas de miembro fundador: la lista de espera accede primero a la oferta de 30 €/año.",
    back: "← Volver a FanPost",
  },
  footer: { impressum: "Aviso legal", privacy: "Privacidad" },
};

const it: Dict = {
  meta: {
    title: "FanPost – La tua settimana di calcio. In una sola email.",
    description:
      "Calendari, vendite biglietti, cambi d'orario e risultati delle tue squadre, in tutti i campionati. Un brief di 2 minuti a settimana. Non perdere mai più una messa in vendita.",
  },
  nav: { join: "Entra in lista d'attesa" },
  hero: {
    badgePre: "Soci fondatori: i primi 100 bloccano ",
    badgeBold: "30 €/anno per sempre",
    h1Plain: "La tua settimana di calcio.",
    h1Em: "In una sola email.",
    sub1: "Calendari, vendite biglietti, cambi d'orario e risultati – solo per ",
    subStrong: "le tue",
    sub2: " squadre, in tutti i campionati che segui. Un brief di 2 minuti a settimana. Non perdere mai più una vendita.",
  },
  features: {
    title: "Per i tifosi che seguono più di una squadra",
    lede: "Segui la squadra della tua città, una big di Serie A e magari un club all'estero. Restare aggiornato significa cinque app, tre newsletter e una vendita di biglietti persa. FanPost sostituisce tutto con un brief personale.",
    weeklyTitle: "Il brief settimanale",
    weeklyText:
      "Risultati, classifica e prossime partite delle tue squadre – 2 minuti di lettura, ogni settimana nella tua casella.",
    ticketsTitle: "Avvisi biglietti",
    ticketsText:
      "Un'email appena parte la vendita dei biglietti delle tue squadre – incluso il settore ospiti. La funzione per cui i tifosi pagherebbero da sola.",
    calendarTitle: "Sincronizzazione calendario",
    calendarText:
      "Un solo link mette tutte le partite nel tuo calendario Google o Outlook – e si aggiorna da solo quando la TV sposta il calcio d'inizio.",
    passportTitle: "Passaporto degli stadi",
    passportSoon: "presto",
    passportText:
      "Eri allo stadio? Basta un tap. Il tuo archivio personale di stadi, derby e gol visti dal vivo.",
  },
  how: {
    title: "Come funziona",
    step1Title: "Scegli le tue squadre",
    step1Text:
      "Qualsiasi squadra, campionato e paese – dalla Champions alla Serie D.",
    step2Title: "Ricevi il tuo brief",
    step2Text:
      "Ogni settimana: cosa è successo, cosa arriva, cosa fare – biglietti, orari, sorteggi di coppa.",
    step3Title: "Non perderti più nulla",
    step3Text:
      "Le partite sono nel tuo calendario e gli avvisi arrivano in tempo per comprare.",
  },
  faq: {
    title: "Domande dei tifosi",
    items: [
      {
        q: "Un'altra app di notizie?",
        a: "No. FanPost non compete col tuo feed: elimina il controllo continuo. È uno strumento: cosa è successo, cosa arriva, cosa devi fare – solo per le tue squadre.",
      },
      {
        q: "Quanto costa?",
        a: "Ci sarà una versione gratuita (una squadra, brief mensile). La versione completa – squadre illimitate, brief settimanale, avvisi biglietti, sincronizzazione calendario – costerà circa 4–5 €/mese. I primi 100 soci fondatori bloccano 30 €/anno, per sempre.",
      },
      {
        q: "Quali campionati sono coperti?",
        a: "Al lancio: i principali campionati europei, tra cui Serie A e Serie B, con altri in arrivo in base alle squadre della lista d'attesa. Dicci quali squadre segui quando ti iscrivi.",
      },
      {
        q: "Che fine fa la mia email?",
        a: "Ricevi un'email di conferma (double opt-in), poi aggiornamenti occasionali sul lancio. Niente spam, nessuna vendita di dati, disiscrizione in qualsiasi momento. Conforme al GDPR, gestito dalla Germania.",
      },
    ],
  },
  form: {
    title: "Entra in lista d'attesa",
    hint: "Gratis. I prezzi fondatore vanno prima alla lista d'attesa.",
    emailLabel: "Email",
    emailPlaceholder: "tu@esempio.it",
    clubsLabel: "Quali squadre segui? (facoltativo)",
    clubsPlaceholder: "es. Napoli, Atalanta, Borussia Dortmund",
    intentLabel: "Se FanPost esistesse oggi, tu…",
    intentFounding: "Prenderesti l'offerta fondatore – 30 €/anno",
    intentFoundingSub: "Tutto incluso, prezzo bloccato per sempre",
    intentMonthly: "Ti abboneresti al mese – 5 €/mese",
    intentMonthlySub: "Tutto incluso, disdici quando vuoi",
    intentFree: "Useresti solo la versione gratuita",
    intentFreeSub: "Una squadra, brief mensile",
    consent1:
      "Voglio ricevere aggiornamenti sul lancio via email. Il consenso viene confermato tramite email di conferma (double opt-in) ed è revocabile in qualsiasi momento. Vedi l'",
    consentLink: "informativa privacy",
    consent2: ".",
    submit: "Entra in lista d'attesa →",
    submitting: "Invio…",
    success:
      "Quasi fatto – controlla la posta e clicca sul link di conferma per assicurarti il posto.",
    errors: {
      invalid_email: "Inserisci un indirizzo email valido.",
      consent_required: "Conferma la casella del consenso.",
      server_error:
        "Non è stato possibile salvare l'iscrizione. Riprova tra un minuto.",
    },
  },
  confirmed: {
    title: "Sei in lista.",
    text: "La tua email è confermata. Ti avviseremo quando si apriranno i posti da socio fondatore – la lista d'attesa accede per prima all'offerta da 30 €/anno.",
    back: "← Torna a FanPost",
  },
  footer: { impressum: "Note legali", privacy: "Privacy" },
};

const dicts: Record<Locale, Dict> = { de, en, fr, es, it };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
