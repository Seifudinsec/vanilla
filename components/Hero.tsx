export default function Hero() {
  return (
    <section id="top" className="minimal-hero">
      <button className="hero-arrow hero-arrow-left" aria-label="Previous">←</button>
      <div className="minimal-dome">
        {/* Replace this temporary source with /images/vanilla-matcha.jpg when supplied. */}
        <img src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=85&w=1200&auto=format&fit=crop" alt="Iced green coffee drink" />
      </div>
      <h1 className="vanilla-wordmark">Vanilla</h1>
      <button className="hero-arrow hero-arrow-right" aria-label="Next">→</button>
    </section>
  );
}
