import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'motion/react';
import {
  CakeSlice,
  ChevronLeft,
  ChevronRight,
  Gem,
  Info,
  Mail,
  MapPin,
  Menu,
  Music2,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  Utensils,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import brideImage from './assets/bride.jpg';
import coupleImage from './assets/couple_image.webp';
import groomImage from './assets/groom.jpg';
import './index.css';

const queryClient = new QueryClient();
const referenceAssets: Record<string, string> = {
  'hero-topleft.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/5ba05423-1b46-4cba-93fc-6ab478f23425_topleft.svg',
  'hero-topright.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/bbbdddb2-2092-4fe8-b0ba-ceeb115c26d4_topright.svg',
  'hero-bottomleft.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/4c1fe158-9505-4c6e-bd29-ad1bbf808c42_bottomleft.svg',
  'hero-bottomright.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/b65d0fc6-0c3b-4258-be70-e4c09ef5ec13_bottomright.svg',
  'countdown-left.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/fa949b60-5009-4ae2-88d9-4d618bd00e33_countdown_flowerleft.svg',
  'countdown-right.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/d6c42d02-09d7-4985-8091-2a16f134c961_countdown_flowerright.svg',
  'texture.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/5d9e7989-b174-46e2-8a96-2afe4e6c23c8_texture.svg',
  'about-left.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/7c4eb5b8-a110-4d39-98aa-a0525259863f_aboutleft.svg',
  'about-right.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/5e8570e2-9201-45c8-9dda-aaad1cffdffe_aboutright.svg',
  'bride-side.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/cd553f96-da13-4f61-a3dc-e26a920639b5_brideside.svg',
  'bride-leaf.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/85bb055e-6089-40eb-8576-ab74261de8b8_brideleaf.svg',
  'groom-leaf.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/f8c96c73-2fc2-463e-ba43-89c45f631b91_groomleaf.svg',
  'groom-side.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/affa1f4c-1740-4c64-a170-b3316f9dcec1_groomside.svg',
  'wishes-left.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/fd380f7b-a19a-49df-871f-0f099d22c5f8_wishesleft.svg',
  'wishes-right.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/70ad2801-0e77-41c9-a507-56b9efb39b7e_wishesright.svg',
  'wishes-top.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/c0e60ffa-27e6-403c-aced-928487cfcea8_wishestop.svg',
  'wishes-bottom.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/ea3cdcb6-46d8-401c-ae0c-afface019fe8_wishesbottom.svg',
  'wishes-flower.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/93f28379-3f05-4b3a-a884-a8047df873c5_wishesflower.svg',
  'quotation.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/732d19d9-8728-4fb2-a7eb-cc21abaa9a88_quotation.svg',
  'borderlong.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/69576fd0-9069-45a7-aba3-2c29515ccac3_borderlong.svg',
  'bordershort.svg':
    'https://cdn-admin.invitationnation.in/media/eng007/assets/3dfa7ed1-9eca-44f9-9524-37e84f476a2b_bordershort.svg',
};
const asset = (name: string) => referenceAssets[name] ?? `${import.meta.env.BASE_URL}assets/${name}`;
const invitationMusic =
  'https://cdn-admin.invitationnation.in/categories/69f31b03626e9478f9090b9c/music/70d118c9-a563-4ddf-b09a-275689883e5b_Engagement.mp3';

function FloralImage({
  name,
  className,
  alt = '',
}: {
  name: string;
  className: string;
  alt?: string;
}) {
  return (
    <img
      className={className}
      src={asset(name)}
      alt={alt}
      aria-hidden={!alt}
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'about' ? 'about' : 'home';
  });
  const links = [
    ['home', 'Home', 'home'],
    ['about', 'About', 'about'],
    ['gallery', 'Gallery', 'home'],
  ];

  useEffect(() => {
    const sections = links
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
        {links.map(([id, label, href]) => (
          <a
            key={id}
            className={active === id ? 'active' : ''}
            href={`#${href}`}
            onClick={() => {
              setActive(href === 'home' ? 'home' : id);
              setOpen(false);
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function FloatingControls() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      void audio.play().then(() => setMuted(false)).catch(() => setMuted(true));
    } else {
      audio.pause();
      setMuted(true);
    }
  };

  return (
    <div className="floating-controls">
      <audio ref={audioRef} loop preload="none" src={invitationMusic} />
      <button
        className="round-control"
        type="button"
        aria-label={muted ? 'Play invitation music' : 'Pause invitation music'}
        aria-pressed={!muted}
        onClick={toggleMusic}
      >
        <Music2 size={17} />
      </button>
      <a className="round-control" href="tel:+918000000000" aria-label="Call the family">
        <Phone size={17} />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="tilted-border" />
      <FloralImage name="hero-topleft.svg" className="hero-flower hero-flower-tl" />
      <FloralImage name="hero-topright.svg" className="hero-flower hero-flower-tr" />
      <FloralImage name="hero-bottomleft.svg" className="hero-flower hero-flower-bl" />
      <FloralImage name="hero-bottomright.svg" className="hero-flower hero-flower-br" />

      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="accent-text">Save the date</p>
          <h1>
            <span>Ananya Sharma</span>
            <span className="ampersand">&amp;</span>
            <span>Aarav Verma</span>
          </h1>
          <div className="hero-details">
            <p className="accent-text">are getting engaged on</p>
            <p className="date-text">Saturday | 31st Oct | 2026</p>
          </div>
          <div className="venue-block">
            <p>Hall Complex</p>
            <a href="#location" className="script-button">
              Open in Maps
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-art-wrap"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        >
          <img className="hero-art" src={coupleImage} alt="Ananya and Aarav" />
        </motion.div>
      </div>
    </section>
  );
}

type CountdownValue = { days: number; hours: number; minutes: number; seconds: number };

function Countdown() {
  const target = useMemo(() => new Date('2026-10-31T18:00:00+05:30').getTime(), []);
  const calculate = (): CountdownValue => {
    const distance = Math.max(target - Date.now(), 0);
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance / 3600000) % 24),
      minutes: Math.floor((distance / 60000) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <section className="countdown-section">
      <FloralImage name="countdown-left.svg" className="countdown-flower countdown-flower-left" />
      <FloralImage name="countdown-right.svg" className="countdown-flower countdown-flower-right" />
      <div className="section-inner countdown-inner">
        <p className="script-title">Let the countdown begin</p>
        <div className="countdown">
          {[
            ['days', time.days, 'Days'],
            ['hours', time.hours, 'Hrs'],
            ['minutes', time.minutes, 'Mins'],
            ['seconds', time.seconds, 'Secs'],
          ].map(([key, value, label]) => (
            <div className="time-box" key={key}>
              <span>{String(value).padStart(2, '0')}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <FloralImage name="about-left.svg" className="about-decoration about-decoration-left" />
      <FloralImage name="about-right.svg" className="about-decoration about-decoration-right" />
      <img className="texture" src={asset('texture.svg')} alt="" aria-hidden="true" />
      <div className="section-inner about-inner">
        <motion.article
          className="person-card person-bride"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="person-photo-wrap">
            <img className="person-photo" src={brideImage} alt="Ananya Sharma" />
            <FloralImage name="bride-side.svg" className="person-side-flower" />
          </div>
          <div className="person-copy">
            <h2>Ananya Sharma</h2>
            <strong>D/o Mr. Rajesh &amp; Mrs. Sunita Sharma</strong>
            <p>
              A free spirit wrapped in grace, Ananya moves through life with quiet confidence,
              an infectious laugh, and a kindness that makes everyone around her feel at home.
            </p>
            <FloralImage name="bride-leaf.svg" className="person-leaf" />
          </div>
        </motion.article>

        <motion.article
          className="person-card person-groom"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="person-photo-wrap">
            <img className="person-photo" src={groomImage} alt="Aarav Verma" />
            <FloralImage name="groom-side.svg" className="person-side-flower" />
          </div>
          <div className="person-copy">
            <h2>Aarav Verma</h2>
            <strong>S/o Mr. Anand &amp; Mrs. Kavitha Verma</strong>
            <p>
              A gentle soul with a poet’s heart and an architect’s mind, Aarav finds beauty in
              the details, whether in the curve of a building or the warmth of a quiet afternoon.
            </p>
            <FloralImage name="groom-leaf.svg" className="person-leaf" />
          </div>
        </motion.article>
      </div>
    </section>
  );
}

const wishes = [
  {
    name: 'Adithya',
    text: 'Congratulations on your engagement! May this lovely chapter be filled with love, laughter, unforgettable moments, and beautiful dreams. Wishing you both a lifetime of happiness and togetherness ahead.',
  },
  {
    name: 'Meera',
    text: 'May your story always be filled with warmth, laughter, and beautiful little moments. Wishing you both every happiness as you begin this new chapter together.',
  },
  {
    name: 'Rohan',
    text: 'Two hearts, one beautiful promise. May your life together be surrounded by family, friendship, and a lifetime of reasons to celebrate.',
  },
];

function Wishes() {
  const [index, setIndex] = useState(0);
  const wish = wishes[index];
  return (
    <section className="wishes-section">
      <motion.img
        className="wishes-decoration wishes-top"
        src={asset('wishes-top.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ duration: 5.5, delay: 0.1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        className="wishes-decoration wishes-left"
        src={asset('wishes-left.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: [0, -3, 0] }}
        transition={{ duration: 6.5, delay: 0.18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        className="wishes-decoration wishes-right"
        src={asset('wishes-right.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: [0, 3, 0] }}
        transition={{ duration: 6, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        className="wishes-decoration wishes-bottom"
        src={asset('wishes-bottom.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, 4, 0] }}
        transition={{ duration: 7, delay: 0.42, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="section-inner wishes-inner">
        <img className="quote-mark" src={asset('quotation.svg')} alt="" aria-hidden="true" />
        <h2 className="script-title">Wishes For The Couple</h2>
        <p className="wish-copy">{wish.text}</p>
        <p className="wish-author">— {wish.name}</p>
        <div className="wish-controls">
          <button
            type="button"
            aria-label="Previous wish"
            onClick={() => setIndex((index - 1 + wishes.length) % wishes.length)}
          >
            <ChevronLeft size={15} />
          </button>
          <span>
            {index + 1} / {wishes.length}
          </span>
          <button
            type="button"
            aria-label="Next wish"
            onClick={() => setIndex((index + 1) % wishes.length)}
          >
            <ChevronRight size={15} />
          </button>
        </div>
        <img className="wishes-flower" src={asset('wishes-flower.svg')} alt="" aria-hidden="true" />
      </div>
    </section>
  );
}

function SendWishes() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const generateWish = () => {
    setMessage(
      'Wishing you both a lifetime of love, laughter, and beautiful memories as you begin this wonderful journey together.',
    );
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setMessage('');
  };
  return (
    <section className="send-wishes-section">
      <img className="texture" src={asset('texture.svg')} alt="" aria-hidden="true" />
      <div className="section-inner send-wishes-inner">
        <div className="send-copy">
          <img className="quote-mark small" src={asset('quotation.svg')} alt="" aria-hidden="true" />
          <h2 className="script-title">Send your wishes</h2>
          <p>&ldquo;Leave your blessings and spread a little more love&rdquo;</p>
          {sent && <span className="sent-message">Your wishes have been sent.</span>}
        </div>
        <div className="send-wishes-right">
          <div className="send-wishes-box">
            <div className="form-border form-border-top"><img src={asset('bordershort.svg')} alt="" /></div>
            <div className="form-border form-border-right"><img src={asset('borderlong.svg')} alt="" /></div>
            <div className="form-border form-border-bottom"><img src={asset('bordershort.svg')} alt="" /></div>
            <div className="form-border form-border-left"><img src={asset('borderlong.svg')} alt="" /></div>
            <div className="wisher-container">
              <form className="wish-form" onSubmit={submit}>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your Name"
                  aria-label="Your name"
                  required
                />
                <div className="wish-message-wrap">
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Your Wishes"
                    rows={5}
                    maxLength={200}
                    aria-label="Your wishes"
                    required
                  />
                  <button className="wisher-ai-btn" type="button" onClick={generateWish}>
                    <Sparkles size={13} />
                    <span>Generate AI wishes</span>
                  </button>
                </div>
                <div className="wish-submit-container">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
            <img className="send-wishes-flower" src={asset('wishes-flower.svg')} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

const events = [
  ['Ring Ceremony', '11:00 AM', Gem],
  ['Cake Cutting', '11:30 AM', CakeSlice],
  ['Lunch', '01:00 PM', Utensils],
] as const;

function Schedule() {
  return (
    <section className="schedule-section">
      <div className="section-inner schedule-inner">
        <h2 className="schedule-title">
          <span>Engagement celebration</span>
          begins
        </h2>
        <div className="event-grid">
          {events.map(([title, time, Icon], index) => (
            <motion.article
              className="event-card schedule-card"
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
            >
              <img className="schedule-card-frame" src={asset('borderlong.svg')} alt="" aria-hidden="true" />
              <img className="schedule-card-countdown-flower" src={asset('countdown-left.svg')} alt="" aria-hidden="true" />
              <div className="schedule-card-content">
                <div className="event-icon"><Icon size={40} strokeWidth={1.5} /></div>
                <div className="event-card-block">
                  <h3>{title}</h3>
                  <p>{time}</p>
                </div>
              </div>
              <img className="schedule-card-wishes-flower" src={asset('wishes-flower.svg')} alt="" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="location-section">
      <FloralImage name="hero-topleft.svg" className="location-flower location-tl" />
      <FloralImage name="hero-bottomright.svg" className="location-flower location-br" />
      <div className="section-inner location-inner">
        <h2 className="script-title">Location</h2>
        <div className="location-content">
          <div className="map-wrap">
            <iframe
              title="Hall Complex map"
              src="https://www.google.com/maps?q=Hall%20Complex&output=embed"
              loading="lazy"
            />
          </div>
          <div className="location-card">
            <p>31ST OCTOBER, 2026</p>
            <h3>Hall Complex</h3>
            <address>
              Hall Complex, 1st B Cross Road,
              <br />
              7th Block, Koramangala,
              <br />
              Bengaluru, Karnataka, India
            </address>
            <a
              className="script-button light"
              href="https://www.google.com/maps/search/?api=1&query=Hall+Complex+1st+B+Cross+Road+7th+Block+Koramangala+Bengaluru+Karnataka+India"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={13} /> Open in maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Engagement Invitation website by <strong>INVITATIONNATION</strong>
      </p>
      <div className="footer-mark">A</div>
      <div className="footer-links">
        <a href="#home"><Info size={12} /> Report a Problem</a>
        <a href="mailto:marketing@codenimbussolutions.com"><Mail size={12} /> Contact Support</a>
        <a href="#privacy"><ShieldCheck size={12} /> Privacy Policy</a>
      </div>
      <small>POWERED BY <strong>INVITATION NATION</strong></small>
      <span>© 2026 Invitation Nation. All rights reserved. Crafted with care for your forever.</span>
    </footer>
  );
}

function Home() {
  return (
    <main className="invitation-page">
      <Navbar />
      <Hero />
      <Countdown />
      <About />
      <Wishes />
      <SendWishes />
      <Schedule />
      <Location />
      <Footer />
      <FloatingControls />
    </main>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}