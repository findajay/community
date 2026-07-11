export const LOCALES = ["de", "en", "fr", "es", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const de = {
  meta: {
    title: "FanPost: Deine Fußballwoche. Eine E-Mail.",
    description:
      "Spielpläne, Vorverkäufe, Anstoßzeiten und Ergebnisse deiner Vereine. Ein 2-Minuten-Briefing pro Woche. Nie wieder einen Vorverkauf verpassen.",
  },
  hero: {
    badgePre: "Die ersten 100 Gründungsmitglieder: ",
    badgeBold: "30 €/Jahr für immer",
    h1Plain: "Deine Fußballwoche.",
    h1Em: "Eine E-Mail.",
    sub: "Spielpläne, Vorverkäufe, Anstoßzeiten und Ergebnisse deiner Vereine. Ein 2-Minuten-Briefing pro Woche. Nie wieder einen Vorverkauf verpassen.",
  },
  preview: {
    sample: "Beispiel",
    subject: "Deine Woche: Union, BVB und mehr",
    rows: [
      {
        kind: "result",
        title: "Union Berlin 2:1 SC Freiburg",
        meta: "Endstand vom Samstag",
      },
      {
        kind: "ticket",
        title: "Vorverkauf startet Dienstag, 10:00",
        meta: "Auswärtsblock in Leipzig",
      },
      {
        kind: "calendar",
        title: "Anstoß verlegt auf Sonntag, 17:30",
        meta: "Kalender automatisch aktualisiert",
      },
    ],
  },
  features: {
    title: "Für Fans, die mehr als einem Verein folgen",
    lede: "Heimatverein, Bundesliga-Klub, ein Verein im Ausland: Auf dem Laufenden bleiben heißt fünf Apps und drei Newsletter. FanPost ersetzt alles mit einem persönlichen Briefing.",
    weeklyTitle: "Das Wochen-Briefing",
    weeklyText:
      "Ergebnisse, Tabellenstand und die nächsten Spiele deiner Vereine. In 2 Minuten gelesen, jede Woche im Postfach.",
    ticketsTitle: "Vorverkaufs-Alarm",
    ticketsText:
      "Eine E-Mail, sobald der Ticketverkauf für deine Vereine startet, auch für Auswärtskontingente.",
    calendarTitle: "Kalender-Sync",
    calendarText:
      "Ein Abo-Link bringt alle Spiele in deinen Google- oder Outlook-Kalender und hält sie bei Verschiebungen aktuell.",
    passportTitle: "Stadion-Pass",
    passportSoon: "bald",
    passportText:
      "Im Stadion gewesen? Ein Tipp genügt. Deine Bilanz aus Stadien, Derbys und live gesehenen Toren.",
  },
  how: {
    title: "So funktioniert's",
    step1Title: "Wähl deine Vereine",
    step1Text:
      "Beliebige Vereine, Ligen und Länder, von der Bundesliga bis zur Regionalliga.",
    step2Title: "Erhalte dein Briefing",
    step2Text:
      "Jede Woche: was war, was kommt, was zu tun ist. Tickets, Anstoßzeiten, Pokal-Auslosungen.",
    step3Title: "Verpasse nichts mehr",
    step3Text:
      "Die Spiele stehen in deinem Kalender, Vorverkaufs-Alarme kommen rechtzeitig zum Kaufen.",
  },
  faq: {
    title: "Was Fans fragen",
    items: [
      {
        q: "Ist das noch eine News-App?",
        a: "Nein. FanPost konkurriert nicht mit deinem Feed, es ersetzt das ständige Nachschauen. Ein Werkzeug: Was ist passiert, was kommt, was ist zu tun. Nur für deine Vereine.",
      },
      {
        q: "Was kostet das?",
        a: "Es wird eine Gratis-Version geben (ein Verein, monatliches Briefing). Die Vollversion mit unbegrenzten Vereinen, wöchentlichem Briefing, Vorverkaufs-Alarm und Kalender-Sync wird etwa 4-5 €/Monat kosten. Die ersten 100 Gründungsmitglieder sichern sich 30 €/Jahr, für immer.",
      },
      {
        q: "Welche Ligen werden abgedeckt?",
        a: "Zum Start die großen europäischen Ligen plus die deutschen Ligen bis in die 3. Liga. Weitere folgen, priorisiert nach den Vereinen der Warteliste. Sag uns bei der Anmeldung, wem du folgst.",
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
    intentFounding: "Das Gründungsangebot sichern: 30 €/Jahr",
    intentFoundingSub: "Alles inklusive, Preis für immer",
    intentMonthly: "Monatlich abonnieren: 5 €/Monat",
    intentMonthlySub: "Alles inklusive, jederzeit kündbar",
    intentFree: "Nur die Gratis-Version nutzen",
    intentFreeSub: "Ein Verein, monatliches Briefing",
    consent1:
      "Ich möchte Updates zum Launch per E-Mail erhalten. Die Einwilligung wird per Bestätigungs-E-Mail (Double-Opt-in) bestätigt und ist jederzeit widerrufbar. Siehe ",
    consentLink: "Datenschutzerklärung",
    consent2: ".",
    submit: "Auf die Warteliste",
    submitting: "Wird eingetragen…",
    success:
      "Fast geschafft: Prüf dein Postfach und klick den Bestätigungslink, um deinen Platz zu sichern.",
    errors: {
      invalid_email: "Bitte gib eine gültige E-Mail-Adresse ein.",
      consent_required: "Bitte bestätige die Einwilligung.",
      server_error:
        "Deine Anmeldung konnte nicht gespeichert werden. Bitte versuch es in einer Minute noch einmal.",
    },
  },
  confirmed: {
    title: "Du bist auf der Liste.",
    text: "Deine E-Mail ist bestätigt. Wir melden uns, sobald die Gründungsmitglieder-Plätze öffnen. Die Warteliste bekommt zuerst Zugriff auf das 30-€/Jahr-Angebot.",
    back: "Zurück zu FanPost",
  },
  footer: { impressum: "Impressum", privacy: "Datenschutz" },
};

export type Dict = typeof de;
export type FormDict = Dict["form"];
export type PreviewDict = Dict["preview"];

const en: Dict = {
  meta: {
    title: "FanPost: Your football week, in one email",
    description:
      "Fixtures, ticket on-sales, kickoff changes and results for your clubs. One 2-minute brief a week. Never miss an on-sale.",
  },
  hero: {
    badgePre: "First 100 founding members: ",
    badgeBold: "€30/year forever",
    h1Plain: "Your football week,",
    h1Em: "in one email.",
    sub: "Fixtures, ticket on-sales, kickoff changes and results for your clubs. One 2-minute brief a week. Never miss an on-sale.",
  },
  preview: {
    sample: "Sample",
    subject: "Your week: Arsenal, Dortmund and more",
    rows: [
      {
        kind: "result",
        title: "Arsenal 2:1 Brighton",
        meta: "Full-time from Saturday",
      },
      {
        kind: "ticket",
        title: "Tickets on sale Tuesday, 10:00",
        meta: "Away end at Leeds",
      },
      {
        kind: "calendar",
        title: "Kickoff moved to Sunday, 17:30",
        meta: "Calendar updated automatically",
      },
    ],
  },
  features: {
    title: "Built for fans who follow more than one club",
    lede: "Hometown club, league giant, a club abroad: keeping up means five apps and three newsletters. FanPost replaces all of it with one personal briefing.",
    weeklyTitle: "The weekly brief",
    weeklyText:
      "Results, table movement and upcoming fixtures for your clubs. A 2-minute read, in your inbox every week.",
    ticketsTitle: "Ticket on-sale alerts",
    ticketsText:
      "An email the moment tickets for your clubs go on sale, including away allocations.",
    calendarTitle: "Calendar sync",
    calendarText:
      "One subscription link puts every fixture in your Google or Outlook calendar and keeps it current when kickoffs move.",
    passportTitle: "Match passport",
    passportSoon: "coming",
    passportText:
      "Been to the match? One tap logs it. Your lifetime record of grounds, derbies and goals seen live.",
  },
  how: {
    title: "How it works",
    step1Title: "Pick your clubs",
    step1Text:
      "Any clubs, any leagues, any countries, from the Champions League to the fourth tier.",
    step2Title: "Get your brief",
    step2Text:
      "Every week: what happened, what's next, what needs action. Tickets, kickoff changes, cup draws.",
    step3Title: "Never miss a match",
    step3Text:
      "Fixtures live in your calendar and on-sale alerts land in time to actually buy.",
  },
  faq: {
    title: "Questions fans ask",
    items: [
      {
        q: "Is this another news app?",
        a: "No. FanPost doesn't compete with your feed, it replaces the checking. It's a utility: what happened, what's next, and what you need to do about it. For your clubs only.",
      },
      {
        q: "What does it cost?",
        a: "There will be a free tier (one club, monthly brief). The full version with unlimited clubs, a weekly brief, ticket alerts and calendar sync will be around 4-5 €/month. The first 100 founding members lock in €30/year, forever.",
      },
      {
        q: "Which leagues are covered?",
        a: "At launch, the top European leagues plus lower divisions in Germany, with more added based on what waitlist members follow. Tell us your clubs when you sign up.",
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
    intentFounding: "Grab the founding deal: €30/year",
    intentFoundingSub: "Everything, locked in forever",
    intentMonthly: "Subscribe monthly: €5/month",
    intentMonthlySub: "Everything, cancel anytime",
    intentFree: "Use the free tier only",
    intentFreeSub: "One club, monthly brief",
    consent1:
      "I'd like to receive the launch updates by email. Consent is confirmed via a confirmation email (double opt-in) and can be withdrawn anytime. See the ",
    consentLink: "privacy notice",
    consent2: ".",
    submit: "Join the waitlist",
    submitting: "Joining…",
    success:
      "Almost there: check your inbox and click the confirmation link to secure your spot.",
    errors: {
      invalid_email: "Please enter a valid email address.",
      consent_required: "Please confirm the consent checkbox.",
      server_error: "Could not save your signup. Please try again in a minute.",
    },
  },
  confirmed: {
    title: "You're on the list.",
    text: "Your email is confirmed. You'll hear from us when founding-member spots open. Waitlist members get first access to the €30/year deal.",
    back: "Back to FanPost",
  },
  footer: { impressum: "Impressum", privacy: "Privacy" },
};

const fr: Dict = {
  meta: {
    title: "FanPost : Ta semaine de foot. En un e-mail.",
    description:
      "Calendriers, billetterie, horaires et résultats de tes clubs. Un brief de 2 minutes par semaine. Zéro mise en vente ratée.",
  },
  hero: {
    badgePre: "Les 100 premiers membres fondateurs : ",
    badgeBold: "30 €/an à vie",
    h1Plain: "Ta semaine de foot.",
    h1Em: "En un e-mail.",
    sub: "Calendriers, billetterie, horaires et résultats de tes clubs. Un brief de 2 minutes par semaine. Zéro mise en vente ratée.",
  },
  preview: {
    sample: "Exemple",
    subject: "Ta semaine : Lens, l'OM et plus",
    rows: [
      {
        kind: "result",
        title: "RC Lens 2:1 Stade Brestois",
        meta: "Score final de samedi",
      },
      {
        kind: "ticket",
        title: "Billetterie ouvre mardi, 10h00",
        meta: "Parcage visiteurs à Lille",
      },
      {
        kind: "calendar",
        title: "Coup d'envoi déplacé à dimanche, 17h30",
        meta: "Calendrier mis à jour automatiquement",
      },
    ],
  },
  features: {
    title: "Pensé pour les fans qui suivent plus d'un club",
    lede: "Club de cœur, grand de Ligue 1, club à l'étranger : rester à jour demande cinq applis et trois newsletters. FanPost remplace tout par un brief personnel.",
    weeklyTitle: "Le brief hebdo",
    weeklyText:
      "Résultats, classement et prochains matchs de tes clubs. Lisible en 2 minutes, chaque semaine dans ta boîte mail.",
    ticketsTitle: "Alertes billetterie",
    ticketsText:
      "Un e-mail dès que la billetterie de tes clubs ouvre, parcage visiteurs compris.",
    calendarTitle: "Synchro calendrier",
    calendarText:
      "Un seul lien d'abonnement met tous les matchs dans ton calendrier Google ou Outlook et suit les changements d'horaires.",
    passportTitle: "Passeport des stades",
    passportSoon: "bientôt",
    passportText:
      "Au stade ? Un tap suffit. Ton palmarès de stades, de derbys et de buts vus en vrai.",
  },
  how: {
    title: "Comment ça marche",
    step1Title: "Choisis tes clubs",
    step1Text:
      "N'importe quels clubs, championnats et pays, de la Ligue des champions au National.",
    step2Title: "Reçois ton brief",
    step2Text:
      "Chaque semaine : ce qui s'est passé, ce qui arrive, ce qu'il faut faire. Billets, horaires, tirages de coupe.",
    step3Title: "Ne rate plus rien",
    step3Text:
      "Les matchs sont dans ton calendrier et les alertes billetterie arrivent à temps pour acheter.",
  },
  faq: {
    title: "Questions de fans",
    items: [
      {
        q: "Encore une appli d'actus ?",
        a: "Non. FanPost ne remplace pas ton fil d'actus, il remplace la vérification permanente. Un outil : ce qui s'est passé, ce qui arrive, ce qu'il faut faire. Uniquement pour tes clubs.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Il y aura une version gratuite (un club, brief mensuel). La version complète avec clubs illimités, brief hebdo, alertes billetterie et synchro calendrier coûtera environ 4-5 €/mois. Les 100 premiers membres fondateurs bloquent 30 €/an, à vie.",
      },
      {
        q: "Quels championnats sont couverts ?",
        a: "Au lancement, les grands championnats européens dont la Ligue 1 et la Ligue 2, puis d'autres selon les clubs suivis par la liste d'attente. Dis-nous quels clubs tu suis à l'inscription.",
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
    intentFounding: "Prendrais l'offre fondateur : 30 €/an",
    intentFoundingSub: "Tout inclus, prix bloqué à vie",
    intentMonthly: "T'abonnerais au mois : 5 €/mois",
    intentMonthlySub: "Tout inclus, résiliable à tout moment",
    intentFree: "Utiliserais la version gratuite",
    intentFreeSub: "Un club, brief mensuel",
    consent1:
      "Je souhaite recevoir les nouvelles du lancement par e-mail. Le consentement est confirmé par un e-mail de confirmation (double opt-in) et révocable à tout moment. Voir la ",
    consentLink: "politique de confidentialité",
    consent2: ".",
    submit: "Rejoindre la liste d'attente",
    submitting: "Inscription…",
    success:
      "Presque fini : vérifie ta boîte mail et clique sur le lien de confirmation pour valider ta place.",
    errors: {
      invalid_email: "Merci d'indiquer une adresse e-mail valide.",
      consent_required: "Merci de confirmer ton consentement.",
      server_error:
        "Ton inscription n'a pas pu être enregistrée. Réessaie dans une minute.",
    },
  },
  confirmed: {
    title: "Tu es sur la liste.",
    text: "Ton e-mail est confirmé. On te préviendra dès l'ouverture des places fondateurs. La liste d'attente a accès en premier à l'offre à 30 €/an.",
    back: "Retour à FanPost",
  },
  footer: { impressum: "Mentions légales", privacy: "Confidentialité" },
};

const es: Dict = {
  meta: {
    title: "FanPost: Tu semana de fútbol. En un solo correo.",
    description:
      "Calendarios, entradas, horarios y resultados de tus equipos. Un resumen de 2 minutos a la semana. Ninguna venta perdida.",
  },
  hero: {
    badgePre: "Los primeros 100 miembros fundadores: ",
    badgeBold: "30 €/año para siempre",
    h1Plain: "Tu semana de fútbol.",
    h1Em: "En un solo correo.",
    sub: "Calendarios, entradas, horarios y resultados de tus equipos. Un resumen de 2 minutos a la semana. Ninguna venta perdida.",
  },
  preview: {
    sample: "Ejemplo",
    subject: "Tu semana: Betis, Atlético y más",
    rows: [
      {
        kind: "result",
        title: "Real Betis 2:1 Getafe",
        meta: "Final del sábado",
      },
      {
        kind: "ticket",
        title: "Entradas a la venta el martes, 10:00",
        meta: "Fondo visitante en Sevilla",
      },
      {
        kind: "calendar",
        title: "Horario movido al domingo, 17:30",
        meta: "Calendario actualizado automáticamente",
      },
    ],
  },
  features: {
    title: "Para aficionados que siguen a más de un equipo",
    lede: "El equipo de tu ciudad, un grande de LaLiga, un club extranjero: estar al día exige cinco apps y tres boletines. FanPost lo sustituye por un resumen personal.",
    weeklyTitle: "El resumen semanal",
    weeklyText:
      "Resultados, clasificación y próximos partidos de tus equipos. 2 minutos de lectura, cada semana en tu bandeja.",
    ticketsTitle: "Alertas de entradas",
    ticketsText:
      "Un correo en cuanto salen a la venta las entradas de tus equipos, incluidas las de la afición visitante.",
    calendarTitle: "Sincronización de calendario",
    calendarText:
      "Un solo enlace añade todos los partidos a tu calendario de Google u Outlook y lo mantiene al día si cambian los horarios.",
    passportTitle: "Pasaporte de estadios",
    passportSoon: "pronto",
    passportText:
      "¿Estuviste en el estadio? Un toque y queda registrado. Tu historial de estadios, derbis y goles vistos en directo.",
  },
  how: {
    title: "Cómo funciona",
    step1Title: "Elige tus equipos",
    step1Text: "Cualquier equipo, liga o país, de la Champions a Segunda RFEF.",
    step2Title: "Recibe tu resumen",
    step2Text:
      "Cada semana: qué pasó, qué viene y qué requiere acción. Entradas, horarios, sorteos de copa.",
    step3Title: "No te pierdas nada",
    step3Text:
      "Los partidos viven en tu calendario y las alertas llegan a tiempo para comprar.",
  },
  faq: {
    title: "Preguntas de aficionados",
    items: [
      {
        q: "¿Otra app de noticias?",
        a: "No. FanPost no compite con tu feed: elimina la necesidad de estar comprobando. Es una herramienta: qué pasó, qué viene y qué tienes que hacer. Solo de tus equipos.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Habrá una versión gratuita (un equipo, resumen mensual). La versión completa con equipos ilimitados, resumen semanal, alertas de entradas y sincronización de calendario costará unos 4-5 €/mes. Los primeros 100 miembros fundadores se aseguran 30 €/año para siempre.",
      },
      {
        q: "¿Qué ligas están cubiertas?",
        a: "En el lanzamiento, las grandes ligas europeas, incluidas LaLiga y LaLiga Hypermotion, y añadiremos más según los equipos de la lista de espera. Dinos qué equipos sigues al apuntarte.",
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
    submit: "Unirme a la lista de espera",
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
    text: "Tu correo está confirmado. Te avisaremos cuando se abran las plazas de miembro fundador. La lista de espera accede primero a la oferta de 30 €/año.",
    back: "Volver a FanPost",
  },
  footer: { impressum: "Aviso legal", privacy: "Privacidad" },
};

const it: Dict = {
  meta: {
    title: "FanPost: La tua settimana di calcio. In una sola email.",
    description:
      "Calendari, biglietti, orari e risultati delle tue squadre. Un brief di 2 minuti a settimana. Nessuna vendita persa.",
  },
  hero: {
    badgePre: "I primi 100 soci fondatori: ",
    badgeBold: "30 €/anno per sempre",
    h1Plain: "La tua settimana di calcio.",
    h1Em: "In una sola email.",
    sub: "Calendari, biglietti, orari e risultati delle tue squadre. Un brief di 2 minuti a settimana. Nessuna vendita persa.",
  },
  preview: {
    sample: "Esempio",
    subject: "La tua settimana: Napoli, Atalanta e altro",
    rows: [
      { kind: "result", title: "Napoli 2:1 Empoli", meta: "Finale di sabato" },
      {
        kind: "ticket",
        title: "Biglietti in vendita martedì, 10:00",
        meta: "Settore ospiti a Torino",
      },
      {
        kind: "calendar",
        title: "Calcio d'inizio spostato a domenica, 17:30",
        meta: "Calendario aggiornato automaticamente",
      },
    ],
  },
  features: {
    title: "Per i tifosi che seguono più di una squadra",
    lede: "La squadra della tua città, una big di Serie A, un club all'estero: restare aggiornato richiede cinque app e tre newsletter. FanPost sostituisce tutto con un brief personale.",
    weeklyTitle: "Il brief settimanale",
    weeklyText:
      "Risultati, classifica e prossime partite delle tue squadre. 2 minuti di lettura, ogni settimana nella tua casella.",
    ticketsTitle: "Avvisi biglietti",
    ticketsText:
      "Un'email appena parte la vendita dei biglietti delle tue squadre, incluso il settore ospiti.",
    calendarTitle: "Sincronizzazione calendario",
    calendarText:
      "Un solo link mette tutte le partite nel tuo calendario Google o Outlook e lo tiene aggiornato se cambiano gli orari.",
    passportTitle: "Passaporto degli stadi",
    passportSoon: "presto",
    passportText:
      "Eri allo stadio? Basta un tap. Il tuo archivio di stadi, derby e gol visti dal vivo.",
  },
  how: {
    title: "Come funziona",
    step1Title: "Scegli le tue squadre",
    step1Text:
      "Qualsiasi squadra, campionato e paese, dalla Champions alla Serie D.",
    step2Title: "Ricevi il tuo brief",
    step2Text:
      "Ogni settimana: cosa è successo, cosa arriva, cosa fare. Biglietti, orari, sorteggi di coppa.",
    step3Title: "Non perderti più nulla",
    step3Text:
      "Le partite sono nel tuo calendario e gli avvisi arrivano in tempo per comprare.",
  },
  faq: {
    title: "Domande dei tifosi",
    items: [
      {
        q: "Un'altra app di notizie?",
        a: "No. FanPost non compete col tuo feed: elimina il controllo continuo. È uno strumento: cosa è successo, cosa arriva, cosa devi fare. Solo per le tue squadre.",
      },
      {
        q: "Quanto costa?",
        a: "Ci sarà una versione gratuita (una squadra, brief mensile). La versione completa con squadre illimitate, brief settimanale, avvisi biglietti e sincronizzazione calendario costerà circa 4-5 €/mese. I primi 100 soci fondatori bloccano 30 €/anno, per sempre.",
      },
      {
        q: "Quali campionati sono coperti?",
        a: "Al lancio i principali campionati europei, tra cui Serie A e Serie B, con altri in arrivo in base alle squadre della lista d'attesa. Dicci quali squadre segui quando ti iscrivi.",
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
    intentFounding: "Prenderesti l'offerta fondatore: 30 €/anno",
    intentFoundingSub: "Tutto incluso, prezzo bloccato per sempre",
    intentMonthly: "Ti abboneresti al mese: 5 €/mese",
    intentMonthlySub: "Tutto incluso, disdici quando vuoi",
    intentFree: "Useresti solo la versione gratuita",
    intentFreeSub: "Una squadra, brief mensile",
    consent1:
      "Voglio ricevere aggiornamenti sul lancio via email. Il consenso viene confermato tramite email di conferma (double opt-in) ed è revocabile in qualsiasi momento. Vedi l'",
    consentLink: "informativa privacy",
    consent2: ".",
    submit: "Entra in lista d'attesa",
    submitting: "Invio…",
    success:
      "Quasi fatto: controlla la posta e clicca sul link di conferma per assicurarti il posto.",
    errors: {
      invalid_email: "Inserisci un indirizzo email valido.",
      consent_required: "Conferma la casella del consenso.",
      server_error:
        "Non è stato possibile salvare l'iscrizione. Riprova tra un minuto.",
    },
  },
  confirmed: {
    title: "Sei in lista.",
    text: "La tua email è confermata. Ti avviseremo quando si apriranno i posti da socio fondatore. La lista d'attesa accede per prima all'offerta da 30 €/anno.",
    back: "Torna a FanPost",
  },
  footer: { impressum: "Note legali", privacy: "Privacy" },
};

const dicts: Record<Locale, Dict> = { de, en, fr, es, it };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
