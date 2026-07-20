export default function Hero({ loaderDone }: { loaderDone?: boolean }) {
  return (
    <section id="top" className="minimal-hero">
      <div className="hero-content">
        <div className="minimal-dome">
          <img src="/dome image.jpg" alt="Product image" />
        </div>
        <div className={`hero-text-overlay ${loaderDone ? 'animate' : ''}`}>
          <h1 className="vanilla-wordmark">vanilla</h1>
          <p className="brand-subtitle">MATCHA & MOJITOS</p>
        </div>
      </div>
    </section>
  );
}
