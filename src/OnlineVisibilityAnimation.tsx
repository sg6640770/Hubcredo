import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import './online-visibility-animation.css';
import { Check, Globe, Link2, Newspaper, PenLine, Quote, Radar, Search, Sparkles, Star } from 'lucide-react';

/* ==========================================================================
   OnlineVisibilityAnimation
   One unified, ~18s looping story: Discovery → Trust → Authority → AI Search.
   Styling lives in the existing `.vz-*` rules in index.css plus the small
   addendum in online-visibility-animation.css.
   ========================================================================== */

/* ---------- Editable placeholder constants ---------- */
const CFG = {
  query: 'best b2b automation agency',
  clicks: '+312% organic clicks',
  avgRating: 4.9,
  reviewCount: '1,284',
  velocity: '↑ 24%',
  authorityFrom: 32,
  authorityTo: 78,
  authorityDelta: '+46',
  aiQuestion: 'Best agency for B2B automation?',
  aiAnswer: 'HubCredo stands out for B2B automation, combining GTM, outbound and AI workflows.',
  aiHighlightWords: 3,
  scores: [28, 52, 74, 92, 92, 0], // per scene; index 4 = finale, 5 = idle pause
};

/* ---------- Timeline ---------- */
const SCENE_MS = 3600;
const STARTS = [0, 3600, 7200, 10800, 14400]; // 4 scenes + finale
const FADE_AT = 16000; // finale fade-out begins (400ms)
const END_ACTIVE = 16400;
const LOOP_MS = 18200; // + 1.8s pause
const TICK_MS = 50;
const STATIC_T = 15800; // reduced-motion: finale frame

const LABELS = [
  'Discovery · Be found first',
  'Trust · Build confidence',
  'Authority · Earn the web’s trust',
  'AI Search · Get recommended by AI',
  'Visible across every discovery layer',
  '',
];

const PILLS = [
  { label: 'Discovery', Icon: Search },
  { label: 'Trust', Icon: Star },
  { label: 'Authority', Icon: Link2 },
  { label: 'AI Search', Icon: Sparkles },
] as const;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const sceneAt = (t: number) => (t >= END_ACTIVE ? 5 : t >= STARTS[4] ? 4 : clamp(Math.floor(t / SCENE_MS), 0, 3));

/* ---------- Hooks ---------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useInView(ref: RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

/** Master clock: one rAF loop. Progress bar is written directly (no re-render); scene logic re-renders every TICK_MS. */
function useMasterTimeline(active: boolean, barRef: RefObject<HTMLElement>) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) {
      setT(0);
      if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
      return;
    }
    let raf = 0;
    let last = -1e9;
    const t0 = performance.now();
    const tick = (now: number) => {
      const el = Math.max(0, now - t0) % LOOP_MS; // rAF timestamps can precede t0 by a few ms
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(el / END_ACTIVE, 1)})`;
      if (el < last || el - last >= TICK_MS) {
        last = el;
        setT(el);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, barRef]);
  return t;
}

/** Eased rAF count — never jumps. */
function useCount(target: number, duration = 900, from = 0, immediate = false) {
  const [value, setValue] = useState(immediate ? target : from);
  const current = useRef(value);
  useEffect(() => {
    if (immediate) {
      current.current = target;
      setValue(target);
      return;
    }
    const start = current.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = start + (target - start) * eased;
      current.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, immediate]);
  return value;
}

const useUid = () => useId().replace(/:/g, '');

type SceneProps = { lt: number; still: boolean };

/* ---------- Scene 1: Discovery ---------- */
const OTHER_ROWS = [
  { title: 'B2B Automation Guide', domain: 'reviewhub.com' },
  { title: 'Top Automation Agencies', domain: 'techpicks.io' },
  { title: 'Agency Comparison', domain: 'bizdaily.com' },
];
const RANK_START = 1700;

function DiscoveryScene({ lt }: SceneProps) {
  const typed = clamp(Math.floor((lt - 250) / 50), 0, CFG.query.length);
  const rank = lt < RANK_START ? 7 : Math.max(1, 7 - Math.floor((lt - RANK_START) / 200));
  const brandSlot = rank >= 4 ? 3 : rank - 1;
  const glow = (7 - rank) / 6;
  const rowStyle = (slot: number, index: number, extra?: CSSProperties): CSSProperties => ({
    transform: `translateY(${slot * 36}px)`,
    opacity: lt >= 1400 + index * 80 ? 1 : 0,
    ...extra,
  });
  return (
    <>
      <div className="vz-search vz-glass vz-in-right">
        <Search size={14} />
        <span>{CFG.query.slice(0, typed)}</span>
        <i className="vz-caret" />
      </div>
      <div className="vz-rows">
        {OTHER_ROWS.map((row, i) => {
          const slot = i + (brandSlot <= i ? 1 : 0);
          return (
            <div className="vz-row vz-glass" key={row.domain} style={rowStyle(slot, i)}>
              <strong>#{slot + 1}</strong>
              <span className="vz-t">{row.title} <small>· {row.domain}</small></span>
            </div>
          );
        })}
        <div className="vz-row vz-glass is-brand" style={rowStyle(brandSlot, 3, { ['--glow' as string]: glow })}>
          <strong key={rank} className="vz-tick">#{rank}</strong>
          <span className="vz-t">B2B Automation Experts <small>· yourbrand.com</small></span>
          <em className="vz-tag">Your Brand</em>
          {rank === 1 && <span className="vz-burst" />}
        </div>
      </div>
      <div className={`vz-pers vz-glass${lt >= 2000 ? ' is-in' : ''}`}><Sparkles size={11} /> Personalised for you</div>
      {lt >= 3000 && <span className="vz-chip vz-in-right vz-clicks">{CFG.clicks}</span>}
    </>
  );
}

/* ---------- Scene 2: Trust ---------- */
const REVIEWS = [
  { av: 'DR', quote: 'Our enquiries doubled in two months.', who: 'Daniel R.' },
  { av: 'PS', quote: 'Fast, reliable and genuinely helpful.', who: 'Priya S.' },
];

function TrustScene({ lt, still }: SceneProps) {
  const gid = useUid();
  const avg = useCount(lt >= 300 ? CFG.avgRating : 0, 1000, 0, still);
  return (
    <div className="vz-trust">
      <div>
        <div className="vz-stars">
          {[0, 1, 2, 3, 4].map((i) => {
            const on = lt >= 300 + i * 200;
            return <Star key={i} size={16} className={`vz-star${on ? ' is-on' : ''}`} fill={on ? 'currentColor' : 'none'} />;
          })}
        </div>
        <div className="vz-avg">{avg.toFixed(1)}</div>
        <div className="vz-sub">from {CFG.reviewCount} reviews</div>
        <div className="vz-vel vz-glass">
          <div className="vz-vel-top">
            <span>Review velocity</span>
            <em className={`vz-chip vz-trend${lt >= 2400 ? ' is-in' : ''}`}>{CFG.velocity}</em>
          </div>
          <svg viewBox="0 0 120 40" aria-hidden="true">
            <defs>
              <linearGradient id={`vzv-${gid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#9633f6" />
                <stop offset="1" stopColor="#e13bc9" />
              </linearGradient>
            </defs>
            <path className={`vz-line${lt >= 1000 ? ' is-in' : ''}`} pathLength={100} stroke={`url(#vzv-${gid})`} d="M2 36 C20 34 28 26 46 28 S72 16 88 18 S108 6 117 4" />
            <circle className={`vz-line-dot${lt >= 2000 ? ' is-in' : ''}`} cx="117" cy="4" r="2.6" fill="#ff8ed6" />
          </svg>
        </div>
      </div>
      <div className="vz-trust-r">
        <div className={`vz-google vz-glass${lt >= 2300 ? ' is-in' : ''}`}>
          <span className="vz-g">G</span>
          <div><b>Google</b><small>Seller Rating</small></div>
          <strong>{CFG.avgRating}/5</strong>
        </div>
        {REVIEWS.map((review, i) => (
          <div className={`vz-review vz-glass${lt >= 1400 + i * 500 ? ' is-in' : ''}`} key={review.who}>
            <span className="vz-av">{review.av}</span>
            <div>
              <p>{review.quote}</p>
              <small><Check size={9} /> Verified · {review.who}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Scene 3: Authority ---------- */
const CX = 176;
const CY = 100;
const NODES = [
  { label: 'Industry Publication', Icon: Newspaper, x: 74, y: 28 },
  { label: 'Brand Mention', Icon: Quote, x: 250, y: 24 },
  { label: 'Backlink', Icon: Link2, x: 48, y: 140 },
  { label: 'News Feature', Icon: Globe, x: 296, y: 130 },
  { label: 'Guest Article', Icon: PenLine, x: 262, y: 178 },
];
const ICON_STATIC: CSSProperties = { position: 'static', width: 12, height: 12, flex: '0 0 auto' };
const lineAt = (i: number) => 450 + i * 450; // line draws first…
const nodeAt = (i: number) => lineAt(i) + 250; // …then its node appears

function AuthorityScene({ lt, still }: SceneProps) {
  const gid = useUid();
  const score = useCount(lt >= 600 ? CFG.authorityTo : CFG.authorityFrom, 2000, CFG.authorityFrom, still);
  const flash = NODES.some((_, i) => {
    const d = lt - nodeAt(i) - 900; // first pulse arrival
    return d >= 0 && d % 900 < 160;
  });
  return (
    <div className="vz-net">
      <svg viewBox="0 0 412 212" aria-hidden="true">
        <defs>
          {NODES.map((n, i) => (
            <linearGradient key={i} id={`vza-${gid}-${i}`} gradientUnits="userSpaceOnUse" x1={CX} y1={CY} x2={n.x} y2={n.y}>
              <stop offset="0" stopColor="#9633f6" />
              <stop offset="1" stopColor="#26c7f5" />
            </linearGradient>
          ))}
        </defs>
        {NODES.map((n, i) => (
          <path key={`l${i}`} className={`vz-link${lt >= lineAt(i) ? ' is-in' : ''}`} pathLength={100} stroke={`url(#vza-${gid}-${i})`} d={`M${CX} ${CY} L${n.x} ${n.y}`} />
        ))}
        {NODES.map((n, i) =>
          lt >= nodeAt(i) ? (
            <circle key={`p${i}`} r="2.6" fill="#7df0ff" className="vz-pdot">
              <animateMotion dur="0.9s" repeatCount="indefinite" path={`M${n.x} ${n.y} L${CX} ${CY}`} />
            </circle>
          ) : null,
        )}
      </svg>
      <div className={`vz-center is-in${flash ? ' is-flash' : ''}`}><Radar size={16} style={ICON_STATIC} /><span>Your Brand</span></div>
      {NODES.map(({ label, Icon, x, y }, i) => (
        <div className={`vz-node vz-glass${lt >= nodeAt(i) ? ' is-in' : ''}`} key={label} style={{ left: x, top: y }}>
          <span><Icon size={12} style={ICON_STATIC} /></span>{label}
        </div>
      ))}
      <div className="vz-auth vz-glass">
        <small>Authority Score</small>
        <strong>{Math.round(score)}</strong>
        <em className={`vz-chip vz-trend${lt >= 2600 ? ' is-in' : ''}`}>{CFG.authorityDelta}</em>
      </div>
      <div className={`vz-ticker vz-glass${lt >= 2400 ? ' is-in' : ''}`}><i /> New backlink detected · DR 72</div>
    </div>
  );
}

/* ---------- Scene 4: AI Search & Agentic ---------- */
const TECH = ['AEO', 'GEO', 'AIO', 'Schema'];
const AGENT = ['Reads your services', 'Checks availability', 'Books a call'];
const ANSWER_WORDS = CFG.aiAnswer.split(' ');

function AISearchScene({ lt }: SceneProps) {
  const typed = clamp(Math.floor((lt - 200) / 40), 0, CFG.aiQuestion.length);
  const words = lt >= 1900 ? clamp(Math.floor((lt - 1900) / 50) + 1, 0, ANSWER_WORDS.length) : 0;
  const showDots = typed === CFG.aiQuestion.length && words === 0 && lt >= 1500;
  const head = ANSWER_WORDS.slice(0, Math.min(words, CFG.aiHighlightWords)).join(' ');
  const rest = words > CFG.aiHighlightWords ? ' ' + ANSWER_WORDS.slice(CFG.aiHighlightWords, words).join(' ') : '';
  return (
    <div className="vz-ai">
      <div className="vz-chat vz-glass">
        <div className="vz-chat-head"><span><Sparkles size={11} /></span><b>AI assistant</b><i /></div>
        {typed > 0 && <div className="vz-ub">{CFG.aiQuestion.slice(0, typed)}</div>}
        {showDots && <div className="vz-dots"><i /><i /><i /></div>}
        {words > 0 && (
          <div className="vz-ans">
            <span className={`vz-hl${words >= CFG.aiHighlightWords ? ' is-on' : ''}`}>{head}</span>{rest}
          </div>
        )}
        <span className={`vz-cite vz-glass${lt >= 2700 ? ' is-in' : ''}`}><Link2 size={10} /> [1] hubcredo.com</span>
      </div>
      <div className="vz-side">
        <div className="vz-chips">
          {TECH.map((label, i) => (
            <span className={`vz-tech${lt >= 600 + i * 350 ? ' is-lit' : ''}`} key={label}>{label}<Check size={11} /></span>
          ))}
        </div>
        <div className="vz-agent vz-glass">
          <b>Agentic Readiness</b>
          {AGENT.map((item, i) => (
            <span className={lt >= 2400 + i * 350 ? 'is-on' : ''} key={item}><i><Check size={8} /></i>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Finale ---------- */
const TILES = [
  { label: 'Discovery', Icon: Search, value: '#1' },
  { label: 'Trust', Icon: Star, value: `${CFG.avgRating}★` },
  { label: 'Authority', Icon: Link2, value: String(CFG.authorityTo) },
  { label: 'AI Search', Icon: Sparkles, value: 'AI Cited' },
];

function FinaleScene({ lt }: SceneProps) {
  return (
    <div className="vz-final">
      <div className="vz-tiles">
        {TILES.map(({ label, Icon, value }, i) => (
          <div className={`vz-tile vz-glass${lt >= 100 + i * 150 ? ' is-in' : ''}`} key={label}>
            <span className="vz-tile-label"><Icon size={11} /> {label}</span>
            <strong>{value}</strong>
            <i><Check size={9} /></i>
          </div>
        ))}
      </div>
      <span className={`vz-full${lt >= 900 ? ' is-in' : ''}`}><Check size={12} /> Fully Visible</span>
    </div>
  );
}

const SCENES = [DiscoveryScene, TrustScene, AuthorityScene, AISearchScene, FinaleScene];

/* ---------- Main component ---------- */
const RING_C = 2 * Math.PI * 15;

export default function OnlineVisibilityAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const ringId = useUid();
  const reduced = useReducedMotion();
  const inView = useInView(rootRef);
  const liveT = useMasterTimeline(inView && !reduced, barRef);

  const t = reduced ? STATIC_T : liveT;
  const scene = sceneAt(t);
  const lt = scene < 5 ? t - STARTS[scene] : 0;
  const score = useCount(CFG.scores[scene], 1200, 0, reduced);

  // Incoming scene is rendered with the outgoing one for its first 300ms (derived from time, so no flicker).
  const nodes = [];
  if (!reduced && scene >= 1 && scene <= 4 && lt < 300) {
    const Prev = SCENES[scene - 1];
    nodes.push(<div className="vz-scene is-leaving" key={scene - 1}><Prev lt={SCENE_MS} still={reduced} /></div>);
  }
  if (scene < 5) {
    const Current = SCENES[scene];
    nodes.push(<div className="vz-scene" key={scene}><Current lt={lt} still={reduced} /></div>);
  }

  return (
    <div className="service-workflow vz-workflow">
      <div className="vz" ref={rootRef} role="img" aria-label="Animation: a brand gets discovered, trusted, given authority and recommended by AI search">
        <div className="vz-top">
          <span className="vz-brand"><i />HubCredo</span>
          <div className="vz-tracker">
            {PILLS.map(({ label, Icon }, i) => {
              const done = scene === 4 || (scene < 4 && i < scene);
              const active = scene < 4 && i === scene;
              return (
                <span className={`vz-pill${active ? ' is-active' : ''}${done ? ' is-done' : ''}`} key={label} title={label}>
                  <Icon size={14} />
                  {done && <b><Check size={8} /></b>}
                </span>
              );
            })}
          </div>
          <div className={`vz-ring${scene === 4 && !reduced ? ' is-glow' : ''}`}>
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <defs>
                <linearGradient id={`vzr-${ringId}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#9633f6" />
                  <stop offset="1" stopColor="#26c7f5" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke={`url(#vzr-${ringId})`} strokeWidth="3" strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={RING_C * (1 - clamp(score, 0, 100) / 100)} transform="rotate(-90 18 18)" />
            </svg>
            <strong>{Math.round(score)}</strong>
          </div>
        </div>

        <div className={`vz-stage${scene === 4 && t >= FADE_AT ? ' is-fading' : ''}`}>{nodes}</div>

        <div className="vz-foot">
          <div className="vz-bar"><i ref={barRef} style={{ transform: reduced ? 'scaleX(1)' : 'scaleX(0)' }} /></div>
          <span className="vz-label" key={scene}>{LABELS[scene]}</span>
        </div>
      </div>
    </div>
  );
}
