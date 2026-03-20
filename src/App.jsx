import { useState, useEffect, useRef } from 'react';

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Data ── */
const NAV_ITEMS = ['Work', 'Services', 'About', 'Contact'];

const PORTFOLIO = [
  { title: 'Steel & Concrete', category: 'CONSTRUCTION', desc: 'Fleet documentation & finished project showcase for regional contractors.', color: 'var(--orange)', image: '/pump-sunrise.jpg' },
  { title: 'Friday Night Lights', category: 'SPORTS', desc: 'Youth league action photography. Every player. Every game. Gallery delivered in 48hrs.', color: 'var(--warm-orange)', image: '/dribbling.jpg' },
  { title: 'Main Street Parade', category: 'EVENTS', desc: 'Community event coverage — parades, festivals, and everything worth showing up for.', color: 'var(--concrete)', image: '/124th-on-main.jpg' },
  { title: 'Heavy Iron', category: 'CONSTRUCTION', desc: 'Equipment & fleet photography that makes your machines look as good as they perform.', color: 'var(--orange)', image: '/semi-lineup.jpg' },
  { title: 'Championship Run', category: 'SPORTS', desc: 'Season-long coverage. From first practice to the final buzzer.', color: 'var(--warm-orange)', image: '/jump-ball.jpg' },
  { title: 'County Fair', category: 'EVENTS', desc: 'Full event documentation — the moments, the people, the energy.', color: 'var(--concrete)', image: '/car-at-oriellys.jpg' },
];

const SERVICES = [
  {
    title: 'Construction & Commercial',
    icon: '🏗️',
    points: ['Fleet & equipment photography', 'Project documentation (before/during/after)', 'Finished work showcase', 'Crew & worker candids', 'Website & Google Business content'],
  },
  {
    title: 'Sports Photography',
    icon: '🏟️',
    points: ['Game-day action coverage', 'Individual & team highlights', '24-48hr gallery turnaround', 'Print-ready downloads via SmugMug', 'Season packages available'],
  },
  {
    title: 'Event Coverage',
    icon: '🎪',
    points: ['Parades & festivals', 'Community events & fairs', 'Full event galleries', 'Organizer partnership packages', 'Social media ready deliverables'],
  },
];

/* ── Main App ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = activeFilter === 'ALL' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === activeFilter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      setFormSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* ════════════ NAV ════════════ */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--steel)' : '1px solid transparent',
          transition: 'all 0.35s ease',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '0.1em', color: 'var(--dust)', textTransform: 'uppercase' }}>
              M. Harrison
            </span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.35em', color: 'var(--orange)', textTransform: 'uppercase' }}>
              Media
            </span>
          </a>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: '0.8rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--concrete)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--orange)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--concrete)')}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="cta-btn" style={{ padding: '10px 24px', fontSize: '0.75rem' }}>
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{
              display: 'none', flexDirection: 'column', gap: 5, background: 'none',
              border: 'none', cursor: 'pointer', padding: 8,
            }}
          >
            <span style={{ width: 24, height: 2, background: mobileMenu ? 'var(--orange)' : 'var(--dust)', transition: 'all 0.3s', transform: mobileMenu ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: 24, height: 2, background: 'var(--dust)', transition: 'all 0.3s', opacity: mobileMenu ? 0 : 1 }} />
            <span style={{ width: 24, height: 2, background: mobileMenu ? 'var(--orange)' : 'var(--dust)', transition: 'all 0.3s', transform: mobileMenu ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenu && (
          <div style={{
            background: 'rgba(13,13,13,0.98)', borderTop: '1px solid var(--steel)',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenu(false)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dust)',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="cta-btn" onClick={() => setMobileMenu(false)} style={{ textAlign: 'center' }}>
              Get a Quote
            </a>
          </div>
        )}
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section id="top" className="hero-gradient" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Diagonal accent lines */}
        <div style={{
          position: 'absolute', top: 0, right: '15%', width: 1, height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, var(--steel) 30%, var(--steel) 70%, transparent 100%)',
          opacity: 0.3, transform: 'rotate(8deg)', transformOrigin: 'top center',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: '14.5%', width: 1, height: '100%',
          background: 'linear-gradient(to bottom, transparent 20%, var(--orange) 45%, var(--orange) 55%, transparent 80%)',
          opacity: 0.15, transform: 'rotate(8deg)', transformOrigin: 'top center',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '140px 24px 80px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="section-label hero-anim" style={{ marginBottom: 24 }}>
            Construction &middot; Events &middot; Sports Photography
          </div>

          <h1 className="font-display hero-anim-d1 hero-title" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', maxWidth: 800 }}>
            If it's worth doing,
          </h1>
          <h1 className="font-display hero-anim-d2 hero-title" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', maxWidth: 800 }}>
            it's worth <span style={{ color: 'var(--orange)' }}>documenting.</span>
          </h1>

          <div className="line-grow" style={{ marginTop: 32, marginBottom: 32 }} />

          <p className="font-body hero-anim-d3" style={{ maxWidth: 480, fontSize: '1.05rem', marginBottom: 40 }}>
            Professional photography for the people who build, compete, and show up. Based in the Hudson Valley.
          </p>

          <div className="hero-anim-d4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contact" className="cta-btn">Book a Shoot</a>
            <a href="#work" className="cta-btn-outline">See the Work</a>
          </div>
        </div>
      </section>

      {/* ════════════ WORK ════════════ */}
      <section id="work" style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div className="section-label" style={{ marginBottom: 12 }}>Portfolio</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
            The Work
          </h2>
          <div className="orange-line" style={{ marginBottom: 40 }} />
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}>
            {['ALL', 'CONSTRUCTION', 'SPORTS', 'EVENTS'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="card-hover" style={{ background: 'var(--dark-gray)', border: '1px solid var(--steel)', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{
                  height: 220,
                  position: 'relative', overflow: 'hidden',
                  borderBottom: `3px solid ${item.color}`,
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="texture-overlay" />
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                    fontSize: '1.1rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.08)', position: 'relative',
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '24px 20px' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                    fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: item.color, marginBottom: 6,
                  }}>
                    {item.category}
                  </div>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                    fontSize: '1.35rem', letterSpacing: '0.04em', textTransform: 'uppercase',
                    color: 'var(--dust)', marginBottom: 8,
                  }}>
                    {item.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: '0.88rem' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section id="services" style={{ padding: '120px 24px', background: 'var(--dark-gray)', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div className="section-label" style={{ marginBottom: 12 }}>What I Do</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
              Services
            </h2>
            <div className="orange-line" style={{ marginBottom: 60 }} />
          </Reveal>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="service-card">
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                    fontSize: '1.3rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'var(--dust)', marginBottom: 20,
                  }}>
                    {s.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {s.points.map((p, j) => (
                      <li key={j} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
                        color: 'var(--concrete)', padding: '6px 0',
                        borderBottom: j < s.points.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}>
                        <span style={{ width: 6, height: 6, background: 'var(--orange)', flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="smugmug-bar" style={{
              marginTop: 60, padding: '40px 48px',
              background: 'var(--black)', border: '1px solid var(--steel)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24,
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: '1.2rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: 'var(--dust)', marginBottom: 6,
                }}>
                  Galleries & Prints
                </h3>
                <p className="font-body" style={{ fontSize: '0.9rem', maxWidth: 500 }}>
                  All delivered work is available through my SmugMug storefront. Individual downloads, full galleries, and prints.
                </p>
              </div>
              <a href="https://matthewharrison.smugmug.com/" target="_blank" rel="noopener noreferrer" className="cta-btn-outline">Browse Galleries</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ ABOUT ════════════ */}
      <section id="about" style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>About</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: 12 }}>
                You Do Cool Stuff.<br />
                <span style={{ color: 'var(--orange)' }}>I Show Up With a Camera.</span>
              </h2>
              <div className="orange-line" style={{ marginBottom: 32 }} />
              <p className="font-body" style={{ fontSize: '1rem', marginBottom: 20 }}>
                I photograph the work that matters — construction crews building something real, athletes leaving it all on the field, and communities coming together for the events that make a small town worth living in.
              </p>
              <p className="font-body" style={{ fontSize: '1rem', marginBottom: 20 }}>
                No weddings. No portraits. No minis. I shoot construction, sports, and events because that's the work I respect and the work I'm good at documenting.
              </p>
              <p className="font-body" style={{ fontSize: '1rem', marginBottom: 32 }}>
                Based in the Hudson Valley. Galleries delivered fast. Photos that make your business, your team, or your event look as good as it actually is.
              </p>
              <div className="stats-row" style={{ display: 'flex', gap: 32 }}>
                {[
                  { num: '48hr', label: 'Gallery Turnaround' },
                  { num: '3', label: "Niches. That's it." },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                      fontSize: '2rem', color: 'var(--orange)', letterSpacing: '0.04em',
                    }}>
                      {stat.num}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem',
                      color: 'var(--text-mid)', textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="about-photo" style={{
              height: 500,
              border: '1px solid var(--steel)',
              position: 'relative', overflow: 'hidden',
            }}>
              <img
                src="/headshot-1.jpg"
                alt="Matthew Harrison"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="texture-overlay" />
              {/* Orange corner accent */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 80, height: 4, background: 'var(--orange)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 4, height: 80, background: 'var(--orange)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" style={{ padding: '120px 24px', background: 'var(--dark-gray)', borderTop: '1px solid var(--steel)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Get in Touch</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
                Let's Work
              </h2>
              <div className="orange-line" style={{ margin: '0 auto 24px' }} />
              <p className="font-body" style={{ fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
                Got a project, an event, or a game coming up? Tell me what you need. I'll get back to you fast.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {formSubmitted ? (
              <div style={{
                textAlign: 'center', padding: '60px 24px',
                background: 'var(--black)', border: '1px solid var(--steel)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✓</div>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 12, color: 'var(--orange)' }}>
                  Message Sent
                </h3>
                <p className="font-body" style={{ fontSize: '1rem' }}>
                  I'll get back to you soon. In the meantime, check out my latest work on Instagram.
                </p>
              </div>
            ) : (
              /* Netlify Forms — the hidden input and form name attribute make it work */
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <input type="text" name="name" className="input-field" placeholder="Your Name" required />
                  <input type="email" name="email" className="input-field" placeholder="Email" required />
                </div>
                <select name="service" className="input-field" defaultValue="" style={{ appearance: 'none' }} required>
                  <option value="" disabled>What do you need?</option>
                  <option value="construction">Construction / Commercial Photography</option>
                  <option value="sports">Sports Photography</option>
                  <option value="events">Event Coverage</option>
                  <option value="other">Something Else</option>
                </select>
                <textarea name="message" className="input-field" placeholder="Tell me about the project, event, or shoot..." rows={5} style={{ resize: 'vertical' }} required />
                <button type="submit" className="cta-btn" style={{ width: '100%', marginTop: 8, fontSize: '0.9rem', padding: '16px' }}>
                  Send It
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="contact-links" style={{
              display: 'flex', justifyContent: 'center', gap: 48, marginTop: 60,
              paddingTop: 40, borderTop: '1px solid var(--steel)',
            }}>
              {[
                { label: 'Instagram', value: '@mharrisonmedia', href: 'https://instagram.com/mharrisonmedia' },
                { label: 'Galleries', value: 'SmugMug', href: 'https://matthewharrison.smugmug.com/' },
                { label: 'Support', value: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/matthewharrison' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', textDecoration: 'none' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                    fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'var(--orange)', marginBottom: 4,
                  }}>
                    {link.label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
                    color: 'var(--dust)', transition: 'color 0.2s',
                  }}>
                    {link.value}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid var(--steel)', background: 'var(--black)' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
              fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--concrete)', textTransform: 'uppercase',
            }}>
              M. Harrison
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
              fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--orange)', textTransform: 'uppercase',
            }}>
              Media
            </span>
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem',
            color: 'var(--text-mid)', fontStyle: 'italic',
          }}>
            If it's worth doing, it's worth documenting.
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem',
            color: 'var(--text-mid)',
          }}>
            &copy; {new Date().getFullYear()} M. Harrison Media
          </div>
        </div>
      </footer>
    </>
  );
}
