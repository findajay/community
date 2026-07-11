export default function Impressum() {
  return (
    <main className="wrap legal">
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG / § 18 MStV</p>

      <h2>Anbieter</h2>
      <p>
        a2welt UG (haftungsbeschränkt)
        <br />
        {/* TODO: Straße und Hausnummer eintragen */}
        [Straße Hausnummer]
        <br />
        {/* TODO: PLZ und Ort eintragen */}
        [PLZ Ort], Deutschland
      </p>

      <h2>Vertreten durch</h2>
      <p>{/* TODO: Geschäftsführer eintragen */}[Name des Geschäftsführers]</p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: {/* TODO: Kontakt-E-Mail eintragen */}[kontakt@domain.de]
      </p>

      <h2>Registereintrag</h2>
      <p>
        {/* TODO: Registergericht und HRB-Nummer eintragen */}
        Registergericht: [Amtsgericht …], Registernummer: [HRB …]
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        {/* TODO: USt-IdNr. eintragen, falls vorhanden */}
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [DE …]
      </p>
    </main>
  );
}
