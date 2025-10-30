import KeyHighlightsCardsList from "./KeyHighlightsCardsList";

function AboutPageKeyHighlights() {
  return (
    <section className="mb-12" aria-labelledby="key-highlights">
      <h2
        className="text-2xl text-(--text-color) text-center mb-6"
        id="key-highlights"
      >
        Key Highlights
      </h2>
      <KeyHighlightsCardsList />
    </section>
  );
}

export default AboutPageKeyHighlights;
