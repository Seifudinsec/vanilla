export default function Hero() {
  return (
    <section id="top" className="minimal-hero">
      <div className="hero-content">
        <div className="minimal-dome">
          {/* Replace this temporary source with /images/vanilla-matcha.jpg when supplied. */}
          <img src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=85&w=1200&auto=format&fit=crop" alt="Iced green coffee drink" />
        </div>
        <div className="hero-text-overlay">
          <h1 className="vanilla-wordmark">ANASTASIA</h1>
          <p className="brand-subtitle">VINTAGE CLOTHING CO.</p>
        </div>
      </div>
    </section>
  );
}
