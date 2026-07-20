import Reveal from './Reveal';

type Feature = { tone: string; tag: string; title: string; copy: string; image: string };

const cards: Feature[] = [
  { tone: 'dark', tag: 'Limited edition', title: 'Cherry Blossom Matcha', copy: 'A single-week release. Light, floral, and quietly unforgettable.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop' },
  { tone: 'camel', tag: 'Rare lot', title: 'First Flush Uji', copy: 'The first harvest of the year. Delicate, sweet, and available only once.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=900&auto=format&fit=crop' },
  { tone: 'light', tag: 'Summer special', title: 'Mojito de Fruta', copy: 'Rotating tropical fruit, muddled to order with white rum.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=900&auto=format&fit=crop' },
  { tone: 'sage', tag: 'Saturday ritual', title: 'Saturday Whisking Table', copy: 'Learn to whisk ceremonial matcha with our head tea buyer. Takes forty minutes.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop' },
];

export default function Seasonal() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Limited & lovely</p>
            <h2>What&apos;s <em>in season</em> right now.</h2>
          </div>
        </Reveal>
        <div className="season-grid">
          {cards.map(({ tone, tag, title, copy, image }, i) => (
            <Reveal key={title} className={`season-card ${tone}`} style={{ animationDelay: `${i * 70}ms` }}>
              <div className="season-media">
                <img src={image} alt={title} loading="lazy" />
                <span className="season-index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="season-body">
                <p>{tag}</p>
                <h3>{title}</h3>
                <span>{copy}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
