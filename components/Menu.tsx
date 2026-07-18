'use client';
import { useState } from 'react';
import { menu } from '@/data/site';
import Reveal from './Reveal';

const categories = Object.keys(menu);
const initials = (name: string) => name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function Menu() {
  const [active, setActive] = useState<string>('Coffee');
  return (
    <section id="menu" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">The menu</p>
            <h2>Good things, <em>well made.</em></h2>
          </div>
        </Reveal>
        <div className="menu-tabs" role="tablist">
          {categories.map((category) => (
            <button role="tab" aria-selected={active === category} className={active === category ? 'active' : ''} onClick={() => setActive(category)} key={category}>
              {category}
            </button>
          ))}
        </div>
        <div className="menu-grid" key={active}>
          {menu[active].map((item, i) => (
            <Reveal key={item.name} className="menu-card-wrap">
              <article className="menu-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="menu-card-media" style={{ background: item.tint }}>
                  <span className="menu-card-monogram">{initials(item.name)}</span>
                  <span className="menu-card-cat">{active}</span>
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-row">
                    <h3>{item.name}</h3>
                    <b>{item.price}</b>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
