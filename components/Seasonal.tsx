import Reveal from './Reveal';

type Feature = { tone: string; tag: string; title: string; copy: string; image: string };

const cards: Feature[] = [
  { tone: 'dark', tag: 'Pastry', title: 'Fig & Brown Butter Bun', copy: 'Laminated dough, roasted fig, brown butter glaze — back for six weeks only.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop' },
  { tone: 'camel', tag: 'Rare lot', title: 'Geisha, Panama', copy: 'Jasmine and stone fruit. 40 bags roasted. Available while it lasts.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=900&auto=format&fit=crop' },
  { tone: 'light', tag: 'Cold drink', title: 'Cardamom Cold Brew', copy: 'Eighteen-hour steep, whole cardamom pod.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=900&auto=format&fit=crop' },
  { tone: 'sage', tag: 'Saturday ritual', title: 'Saturday Cupping Table', copy: 'Sit with our roaster, taste four origins side by side, ask anything.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop' },
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
