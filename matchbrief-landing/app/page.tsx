import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <>
      <header className="wrap nav">
        <div className="logo">
          Match<span>Brief</span>
        </div>
        <a href="#waitlist">Join the waitlist</a>
      </header>

      <main>
        <section className="wrap hero">
          <div className="badge">
            Founding members: first 100 lock in <b>€30/year forever</b>
          </div>
          <h1>
            Your football week, <em>in one email.</em>
          </h1>
          <p className="sub">
            Fixtures, ticket on-sales, kickoff changes and results — for{" "}
            <strong>your</strong> clubs only, across every league you follow. A
            2-minute brief every week. Never miss an on-sale again.
          </p>
          <div id="waitlist">
            <SignupForm />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>Built for fans who follow more than one club</h2>
            <p className="section-lede">
              You follow your hometown club, your Bundesliga team, and that
              English side you adopted years ago. Keeping up means five apps,
              three newsletters and a missed ticket on-sale. MatchBrief replaces
              all of it with one personal briefing.
            </p>
            <div className="grid">
              <div className="card">
                <div className="icon">📬</div>
                <h3>The weekly brief</h3>
                <p>
                  Results, table movement and upcoming fixtures for your clubs —
                  written for a 2-minute read, delivered every week.
                </p>
              </div>
              <div className="card">
                <div className="icon">🎟️</div>
                <h3>Ticket on-sale alerts</h3>
                <p>
                  Get an email the moment tickets for your clubs go on sale —
                  including away allocations. The feature fans tell us they'd
                  pay for alone.
                </p>
              </div>
              <div className="card">
                <div className="icon">📅</div>
                <h3>Calendar sync</h3>
                <p>
                  One subscription link puts every fixture in your Google or
                  Outlook calendar — and updates itself when TV scheduling moves
                  the kickoff.
                </p>
              </div>
              <div className="card">
                <div className="icon">🛂</div>
                <h3>
                  Match passport
                  <span className="soon">coming</span>
                </h3>
                <p>
                  Been to the match? One tap logs it. Build your lifetime record
                  of grounds, derbies and goals seen live.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>How it works</h2>
            <div className="steps" style={{ marginTop: 32 }}>
              <div className="step">
                <h3>Pick your clubs</h3>
                <p>
                  Any clubs, any leagues, any countries. From the Premier League
                  to the Regionalliga.
                </p>
              </div>
              <div className="step">
                <h3>Get your brief</h3>
                <p>
                  Every week: what happened, what's next, what needs action —
                  tickets, kickoff changes, cup draws.
                </p>
              </div>
              <div className="step">
                <h3>Never miss a match</h3>
                <p>
                  Fixtures live in your calendar and on-sale alerts land in your
                  inbox in time to actually buy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap faq">
            <h2>Questions fans ask</h2>
            <div style={{ marginTop: 24 }}>
              <details>
                <summary>Is this another news app?</summary>
                <p>
                  No. MatchBrief doesn't compete with your feed — it replaces
                  the checking. It's a utility: what happened, what's next, and
                  what you need to do about it, for your clubs only.
                </p>
              </details>
              <details>
                <summary>What does it cost?</summary>
                <p>
                  There will be a free tier (one club, monthly brief). The full
                  version — unlimited clubs, weekly brief, ticket alerts,
                  calendar sync — will be around €4–5/month. The first 100
                  founding members lock in €30/year, forever.
                </p>
              </details>
              <details>
                <summary>Which leagues are covered?</summary>
                <p>
                  At launch: the top European leagues plus German leagues down
                  to the third division, with more added based on what waitlist
                  members follow. Tell us your clubs when you sign up — that's
                  literally how we prioritise.
                </p>
              </details>
              <details>
                <summary>What happens with my email?</summary>
                <p>
                  You get a confirmation email (double opt-in), then occasional
                  updates about the launch. No spam, no selling your data,
                  unsubscribe anytime. GDPR-compliant, operated from Germany.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <div>© {new Date().getFullYear()} a2welt UG (haftungsbeschränkt)</div>
        <nav>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz / Privacy</a>
        </nav>
      </footer>
    </>
  );
}
