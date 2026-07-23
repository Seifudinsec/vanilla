'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '@/components/PageLayout';
import Button from '@/components/Button';
import { pageImages, contactContent } from '@/data/pages';

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (heroRef.current) {
          gsap.fromTo(heroRef.current, { yPercent: 0 }, { yPercent: 20, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
        }
        if (heroTitleRef.current) {
          gsap.fromTo(heroTitleRef.current, { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', autoAlpha: 0 }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', autoAlpha: 1, duration: 1.2, ease: 'power3.out' });
        }
        if (heroSubRef.current) {
          gsap.fromTo(heroSubRef.current, { filter: 'blur(8px)', autoAlpha: 0 }, { filter: 'blur(0px)', autoAlpha: 1, duration: 1, delay: 0.5, ease: 'power2.out' });
        }
        if (markerRef.current) {
          gsap.to(markerRef.current, { scale: 1.3, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' });
        }

        if (locationRef.current) {
          const rows = locationRef.current.querySelectorAll('.hour-row');
          const img = locationRef.current.querySelector('.loc-img');
          gsap.fromTo(img, { clipPath: 'circle(0%)' }, { clipPath: 'circle(100%)', scrollTrigger: { trigger: locationRef.current, start: 'top 80%', once: true }, duration: 1, ease: 'power3.out' });
          gsap.fromTo(rows, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, scrollTrigger: { trigger: locationRef.current, start: 'top 75%', once: true }, duration: 0.6, ease: 'power3.out' });
        }

        if (formRef.current) {
          const inputs = formRef.current.querySelectorAll('.form-field');
          gsap.fromTo(inputs, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true }, duration: 0.6, ease: 'power3.out' });
        }

        if (faqRef.current) {
          const items = faqRef.current.querySelectorAll('.faq-item');
          gsap.fromTo(items, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, scrollTrigger: { trigger: faqRef.current, start: 'top 85%', once: true }, duration: 0.5, ease: 'power3.out' });
        }

        if (socialRef.current) {
          const links = socialRef.current.querySelectorAll('.social-link');
          gsap.fromTo(links, { x: (i) => i % 2 === 0 ? -60 : 60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.12, scrollTrigger: { trigger: socialRef.current, start: 'top 85%', once: true }, duration: 0.6, ease: 'power3.out' });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  useEffect(() => {
    if (openFaq === null) return;
    const el = faqRef.current?.querySelector(`.faq-answer-${openFaq}`);
    if (!el) return;
    if (openFaq !== null) {
      gsap.fromTo(el, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.35, ease: 'power3.out' });
    }
  }, [openFaq]);

  return (
    <PageLayout>
      <div ref={heroRef} style={{ height: '100vh', width: '100%', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={pageImages.contact.hero} alt="Vanilla interior" style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,0.35)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <h1 ref={heroTitleRef} style={{ font: '400 clamp(48px,6vw,96px)/1.05 var(--serif)', color: 'var(--ivory)', margin: 0 }}>Find us.</h1>
          <p ref={heroSubRef} style={{ font: '400 14px var(--sans)', color: '#fff9', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 20, maxWidth: 500, margin: '20px auto 0' }}>14 Arch Lane, Design District</p>
        </div>
        <div ref={markerRef} style={{ position: 'absolute', bottom: '12%', left: '50%', width: 40, height: 40, borderRadius: '50% 50% 50% 0', background: 'var(--tomato)', transform: 'translateX(-50%) rotate(-45deg)', zIndex: 3 }}>
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', color: 'var(--ivory)', fontWeight: 600, fontSize: 14 }}>V</span>
        </div>
      </div>

      <div ref={locationRef} className="section" style={{ background: 'var(--deep)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 460 }}>
            <img className="loc-img" src={pageImages.contact.exterior} alt="Vanilla exterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Location</p>
            <h2 style={{ font: '400 clamp(32px,4vw,52px)/1.05 var(--serif)', margin: '0 0 8px', color: 'var(--onyx)' }}>Come find <em style={{ color: 'var(--tomato)', fontStyle: 'italic' }}>your seat.</em></h2>
            <p style={{ color: 'var(--soft)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>Vanilla — 14 Arch Lane, Design District. Open every day but Christmas.</p>
            {contactContent.hours.map((h) => (
              <div key={h.day} className="hour-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
                <span style={{ fontSize: 13, color: 'var(--onyx)', fontWeight: 500 }}>{h.day}</span>
                <span style={{ fontSize: 13, color: 'var(--soft)' }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="eyebrow">Get in touch</p>
            <h2 style={{ font: '400 clamp(32px,4vw,44px)/1.05 var(--serif)', marginTop: 8, color: 'var(--onyx)' }}>Drop us a <em style={{ color: 'var(--tomato)', fontStyle: 'italic' }}>line.</em></h2>
          </div>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
              <h3 style={{ font: '500 24px var(--serif)', color: 'var(--onyx)' }}>Message sent!</h3>
              <p style={{ color: 'var(--soft)', fontSize: 14, marginTop: 8 }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }} htmlFor="name">Your Name</label>
                <input id="name" value={formState.name} onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))} required style={{ border: 0, borderBottom: '1px solid rgba(17,17,17,0.2)', padding: '10px 0', fontSize: 15, background: 'transparent', outline: 'none', transition: 'border-color 0.3s var(--ease)' }} />
              </div>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }} htmlFor="email">Email</label>
                <input id="email" type="email" value={formState.email} onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))} required style={{ border: 0, borderBottom: '1px solid rgba(17,17,17,0.2)', padding: '10px 0', fontSize: 15, background: 'transparent', outline: 'none', transition: 'border-color 0.3s var(--ease)' }} />
              </div>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }} htmlFor="phone">Phone</label>
                <input id="phone" type="tel" value={formState.phone} onChange={(e) => setFormState(p => ({ ...p, phone: e.target.value }))} style={{ border: 0, borderBottom: '1px solid rgba(17,17,17,0.2)', padding: '10px 0', fontSize: 15, background: 'transparent', outline: 'none', transition: 'border-color 0.3s var(--ease)' }} />
              </div>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }} htmlFor="message">Message</label>
                <textarea id="message" rows={4} value={formState.message} onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))} required style={{ border: '1px solid rgba(17,17,17,0.2)', borderRadius: 8, padding: 12, fontSize: 15, background: 'transparent', outline: 'none', fontFamily: 'inherit', resize: 'vertical', transition: 'border-color 0.3s var(--ease)' }} />
              </div>
              <Button solid type="submit">Send Message</Button>
            </form>
          )}
        </div>
      </div>

      <div className="section" style={{ background: 'var(--deep)', paddingBottom: 120 }}>
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="eyebrow">Questions?</p>
            <h2 style={{ font: '400 clamp(28px,3vw,38px)/1.05 var(--serif)', marginTop: 8, color: 'var(--onyx)' }}>You ask, <em style={{ color: 'var(--tomato)', fontStyle: 'italic' }}>we answer.</em></h2>
          </div>
          <div ref={faqRef} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {contactContent.faq.map((item, i) => (
              <div key={i} className="faq-item" style={{ background: 'var(--ivory)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(17,17,17,0.05)' }}>
                <button onClick={() => toggleFaq(i)} style={{ width: '100%', background: 'none', border: 0, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 500, color: 'var(--onyx)', textAlign: 'left', fontFamily: 'var(--serif)' }}>
                  <span>{item.q}</span>
                  <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s var(--ease)', color: 'var(--camel)', fontSize: 18 }}>↓</span>
                </button>
                <div className={`faq-answer-${i}`} style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', padding: openFaq === i ? '0 24px 20px' : '0 24px', transition: 'padding 0.3s var(--ease)' }}>
                  <p style={{ color: 'var(--soft)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p className="eyebrow">Follow us</p>
            <h2 style={{ font: '400 clamp(28px,3vw,38px)/1.05 var(--serif)', marginTop: 8, color: 'var(--onyx)' }}>Find us <em style={{ color: 'var(--tomato)', fontStyle: 'italic' }}>online.</em></h2>
          </div>
          <div ref={socialRef} style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {contactContent.social.map((s) => (
              <a key={s.name} href="#" className="social-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '28px 40px', borderRadius: 16, border: '1px solid rgba(17,17,17,0.08)', textDecoration: 'none', transition: 'all 0.3s var(--ease)', cursor: 'pointer' }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>{s.name}</span>
                <span style={{ fontSize: 15, color: 'var(--onyx)', fontWeight: 500 }}>{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="map" style={{ height: 400, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(0deg,transparent 0 90px,rgba(17,17,17,0.06) 91px 92px),repeating-linear-gradient(90deg,transparent 0 120px,rgba(17,17,17,0.06) 121px 122px),var(--deep)' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50% 50% 50% 0', background: 'var(--tomato)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-45deg)' }}>
          <span style={{ transform: 'rotate(45deg)', color: 'var(--ivory)', fontWeight: 600, fontSize: 18 }}>V</span>
        </div>
      </div>

      <style jsx>{`
        input:focus, textarea:focus { border-color: var(--tomato) !important; outline: none; }
        .social-link:hover { transform: translateY(-4px); box-shadow: 0 12px 30px -10px rgba(17,17,17,0.1); border-color: rgba(17,17,17,0.15); }
        @media (max-width: 800px) {
          .container > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </PageLayout>
  );
}