import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Database,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Plus,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';

const teamMembers = [
  { name: 'Ian Jason Creado', role: 'Co-founder', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Ian.png', bio: "Ian is a co-founder at HubCredo, where he looks after operations, making sure client research, outbound and inbound activity, and the automation behind them run smoothly and consistently. Before HubCredo, Ian worked in sales and business development, including as Director of Business Development at Trillbit, where he worked on GTM strategy, outbound, and hiring for a SaaS product. He has also consulted with more than 40 SMEs on their growth strategies. Outside work, Ian enjoys open sea swimming, treks, and long drives." },
  { name: 'Simon Gittins', role: 'Chief Marketing Officer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Simon.png', bio: 'Simon is a senior marketing and commercial leader with 35 years of experience, including 25 years in senior leadership across marketing, digital, creative, agency, and business development. An AI-certified professional and Frontier AI Trainer, he focuses on commercial growth, client relationships, GTM strategy, and building a strong market position at HubCredo. He brings strategy, creativity, technology, AI, and marketing together to help businesses grow. Outside work, Simon enjoys family time, Newcastle United, fitness, travel, and the outdoors.' },
  { name: 'Prateek Shrivastava', role: 'Project Manager', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Prateek.png', bio: "Prateek is a Project Manager focused on client relationships, project delivery, and digital growth. He turns client goals and requirements into clear action plans, coordinates internal teams, supports the sales and tender process, and helps clients get more value from their websites and digital marketing. With experience in project management, digital marketing, lead generation, and client services, he brings a structured, practical approach to delivery. Outside work, he enjoys exploring ideas, technology, digital trends, and creative pursuits." },
  { name: 'Gautam Anand', role: 'AI Product Manager', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Gautam.png', bio: "Gautam is an AI Product Manager focused on designing and strategising AI-powered automation products that solve business problems efficiently and at scale. At HubCredo, he designs end-to-end systems across GTM, operations, lead generation, enrichment, qualification, campaign orchestration, CRM, and follow-ups, while supporting testing, documentation, and delivery quality. Before joining HubCredo, Gautam worked in startup Founder's Office roles across product and business development, including product strategy, partnerships, and positioning. Outside work, he enjoys discovering different foods and desserts." },
  { name: 'Bhuvan', role: 'GTM Engineer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Bhuvan.png', bio: 'Bhuvan is a GTM Engineer focused on building systems that help businesses find, understand, and reach the right prospects. His work spans lead generation, data enrichment, outbound automation, and AI-powered GTM workflows using tools such as n8n, Clay, Apollo, and Supabase. He is especially interested in AI agents, agentic workflows, and MCP servers, and enjoys turning fragmented, repetitive GTM processes into reliable, scalable systems.' },
  { name: 'Karuna Shirali', role: 'Content Writer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Karuna.png', bio: 'Karuna is the Content Writer at HubCredo, where she works on B2B content and messaging across LinkedIn campaigns, email campaigns, LinkedIn posts, landing pages, newsletters, and other conversion-focused content. She researches audiences and adapts tone to make messaging feel relevant and natural. Before HubCredo, she worked as a Growth Marketer and Copywriter at a marketing agency across outreach, cold email, social media, advertising, and campaign strategy.' },
  { name: 'Vanshita Bafna', role: 'Sales Automation Specialist', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Vanshita.png', bio: 'Vanshita is a Sales Automation Specialist focused on lead generation, enrichment, scoring, routing, and delivery. Her toolkit includes n8n, Clay, Apollo.io, Instantly, Reply.io, Airtable, Apify, Firecrawl, Playwright, and Tavily. With a robotics and automation engineering background, she redesigns messy sales processes into resilient systems and is increasingly bringing AI agents and agentic workflows into GTM operations. Outside work, she enjoys friends, weekend getaways, and a self-appointed sushi audit.' },
  { name: 'Sumit Gupta', role: 'Sales Automation Specialist', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Sumit.png', bio: "Sumit is a Sales Automation Specialist working on workflow automation, data enrichment, and connecting outbound tools through APIs and webhooks. He works with n8n, Postman, Google Gemini, OpenAI APIs, Next.js, React, GitHub, and REST APIs to turn repetitive processes into scalable systems. Sumit enjoys building practical automation and web tools while developing toward becoming a well-rounded AI and automation engineer." },
];

const services = [
  ['Automated Outbound For B2B', 'Automating outbound prospecting to increase lead engagement.', '#f5d9d9', Workflow],
  ['Automated Data Enrichment', 'Automatically enriching CRM and prospect data for better targeting.', '#b5dee1', Database],
  ['n8n Automation For Business', 'Connecting apps and automating tasks to optimize processes.', '#d5ead6', Network],
  ['Cold Email Campaigns For B2B', 'Sending personalized cold emails to boost response rates.', '#ffced3', Mail],
  ['Email Marketing Automation', 'Automating email sequences to maximize engagement and ROI.', '#fff0ce', MessageCircle],
  ['AI Full-Stack Development', 'Building intelligent products, internal tools, and applications.', '#d9ecfb', Code2],
] as const;

const chooseTabs = [
  { label: 'Automation', title: 'Streamline Your Business Processes with AI Automation', text: 'Hubcredo automates repetitive tasks, data enrichment, and workflow management, letting your team focus on strategy and revenue growth.', icon: Workflow, tone: 'automation' },
  { label: 'Lead Gen', title: 'Find Better Prospects with Intelligent Lead Generation', text: 'Discover, enrich, and qualify the right prospects automatically so your team can spend more time building relationships and closing opportunities.', icon: Network, tone: 'lead-gen' },
  { label: 'CRM', title: 'Keep Your Customer Data Accurate and Actionable', text: 'Connect your CRM to the tools your team already uses and keep every record, follow-up, and pipeline update moving without manual work.', icon: Database, tone: 'crm' },
  { label: 'Integrations', title: 'Connect Every Tool into One Seamless Workflow', text: 'Bring your marketing, sales, and operations tools together with reliable automations that make information flow exactly where it needs to go.', icon: Layers3, tone: 'integrations' },
] as const;

const motionCards = [
  ['AI Full-Stack Development', 'Build intelligent products, internal tools, and applications.', Code2, 'cyan'],
  ['WhatsApp Chatbot', 'Turn conversations into qualified opportunities around the clock.', MessageCircle, 'blue'],
  ['LinkedIn Outreach', 'Create relevant conversations with smart social selling.', Linkedin, 'violet'],
  ['Email Outreach', 'Personalized sequences that keep your pipeline moving.', Mail, 'magenta'],
  ['Lead Generation', 'Find, enrich, qualify, and route the right prospects.', Network, 'sky'],
] as const;

const processSteps = [
  ['Discovery and Strategy', 'We analyze your needs, goals, and market trends to craft a data-driven AI strategy tailored to your business.', Sparkles, '#e8cdff'],
  ['Design and Development', 'Our experts blend creativity with AI-powered technology to design and develop innovative, user-friendly solutions.', Code2, '#ffe2d1'],
  ['Testing and Optimization', 'We rigorously test, refine, and optimize AI models to ensure accuracy, efficiency, and seamless integration.', Layers3, '#ffced3'],
  ['Deployment and Support', 'Once launched, we provide continuous monitoring, updates, and support to maximize performance and long success.', Check, '#d1e9ff'],
] as const;

const testimonials = [
  ['ShineX', 'Consumer Goods', 'Best Agency for AI-Powered Outbound & Lead Generation', 'We use Clay AI and n8n to automate lead generation, cold email campaigns, and CRM workflows—helping businesses scale faster.'],
  ['Medlyze', 'Healthcare Technology', 'Experts in Automated Sales & Marketing Workflows', 'From AI-driven email marketing to CRM automation, our solutions save hours of manual work while boosting conversions'],
  ['Zetwerk', 'Manufacturing', 'Smarter CRM Workflows', 'The workflows Hubcredo built with Clay and n8n transformed our CRM processes. Data is now accurate, enriched, and ready for action without manual effort'],
  ['Greentek Planet', 'Environmental Tech', 'Consistent Outreach, Better Responses', 'We struggled to maintain consistent cold email campaigns. Hubcredo’s automation setup runs seamlessly, improving response rates and saving hours daily.'],
  ['SmileID', 'Identity Verification', 'Organized Sales Pipelines', 'Thanks to Hubcredo, our sales pipeline is more organized than ever. Automated follow-ups and data enrichment allow us to focus on closing deals.'],
  ['Fintent', 'Financial Technology', 'Faster, Accurate Operations', 'Hubcredo’s AI-driven workflows removed repetitive tasks from our operations. The integration of automation tools like n8n and Clay made everything faster and more accurate.'],
];

const faqs = [
  ['What services does Hubcredo provide?', 'We specialize in AI-powered automation, lead generation, CRM management, cold email campaigns, data enrichment, and building end-to-end workflows using tools like Clay and n8n.'],
  ['How can automation improve my business?', 'Automation reduces repetitive tasks, speeds up outreach, maintains accurate data, and ensures your team focuses on closing deals rather than manual work.'],
  ['Which tools do you use for automation?', 'We work with Clay, n8n, HubSpot, Smartlead.ai, Apollo, and other AI-powered platforms to streamline workflows and marketing processes.'],
  ['Can Hubcredo handle cold email campaigns?', 'Yes. We automate cold emails, follow-ups, and personalization to improve response rates and save time for your sales team.'],
  ['How do you manage CRM systems?', 'We integrate AI and automation into your CRM to handle data enrichment, pipeline updates, reporting, and workflow triggers—keeping your sales process seamless.'],
  ['Do you provide custom automation workflows?', 'Absolutely. We design workflows tailored to your business, connecting multiple tools, automating processes, and ensuring measurable results.'],
  ['How quickly can I see results?', 'Many clients notice increased efficiency and improved lead engagement within the first few weeks of implementing our AI-driven workflows.'],
  ['Do you offer ongoing support after setup?', 'Yes. We provide ongoing monitoring, optimization, and support to ensure your automation continues to deliver results.'],
];

const animationNodes = [
  { label: 'Email', icon: Mail, className: 'anim-email' },
  { label: 'LinkedIn', icon: Linkedin, className: 'anim-linkedin' },
  { label: 'Cold calling', icon: Phone, className: 'anim-call' },
  { label: 'Development', icon: Code2, className: 'anim-development' },
  { label: 'AI agents', icon: Bot, className: 'anim-agents' },
  { label: 'Automations', icon: Workflow, className: 'anim-automations' },
];

type LegalSection = { title: string; paragraphs: string[] };

const privacySections: LegalSection[] = [
  { title: '1. Information We Collect', paragraphs: ['We may collect information you provide, including your name, email address, phone number, postal address, and any other information you choose to share through contact forms, registration, or newsletters.', 'When you use the Service, we may also collect device information, usage data, IP address, and information gathered through cookies and similar technologies. Cookies help us recognize returning visitors, understand usage, and improve the experience. You can disable cookies in your browser, although some functionality may be affected.'] },
  { title: '2. How We Use Your Information', paragraphs: ['We may use information to operate, maintain, and improve the Service; provide customer support; respond to inquiries; send announcements or promotional content where you have agreed to receive it; detect and address technical issues; and comply with legal obligations.'] },
  { title: '3. Sharing Your Information', paragraphs: ['We do not rent or sell your personal information. We may share it with service providers who perform functions on our behalf, when required by law, to protect our rights or safety, or in connection with a merger, acquisition, or sale of assets. Where possible, we require these providers to protect information in accordance with this policy.'] },
  { title: '4. Data Retention', paragraphs: ['We retain personal information only for as long as necessary for the purposes described in this policy, unless a longer period is required or permitted by law.'] },
  { title: '5. Security', paragraphs: ['We take reasonable measures to protect personal information from unauthorized access, alteration, disclosure, or destruction. However, no security measure is perfect or impenetrable, and we cannot guarantee absolute security.'] },
  { title: '6. Your Rights & Choices', paragraphs: ['Depending on your jurisdiction, you may have rights to access your personal data, correct inaccuracies, request deletion, object to or restrict processing, withdraw consent, and receive a portable copy of your data.'] },
  { title: '7. International Data Transfers', paragraphs: ['If you are located outside India, your information may be transferred to, stored, and processed in other countries. We will take steps to ensure such transfers are lawful and secure.'] },
  { title: '8. Third-Party Links & Services', paragraphs: ['The Service may contain links to other websites or integrate with third-party services. This policy does not apply to those third parties, and we encourage you to review their privacy policies.'] },
  { title: "9. Children's Privacy", paragraphs: ['Our Service is not intended for children under 13 or the applicable minimum age. We do not knowingly collect personal data from minors. If you believe we have done so, please contact us and we will delete it.'] },
  { title: '10. Changes to This Privacy Policy', paragraphs: ['We may update this policy from time to time. Material changes will be communicated through a prominent website notice or other appropriate means, and the updated date will be shown on this page.'] },
];

const termsSections: LegalSection[] = [
  { title: '1. Use of the Website', paragraphs: ['You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use of the Site.', 'You must not harm, disable, overburden, or impair the Site; attempt unauthorized access; or use the Site to send spam, false or misleading messages, or malicious code.'] },
  { title: '2. Intellectual Property', paragraphs: ['All content on the Site, including text, graphics, logos, images, icons, videos, and software, belongs to HubCredo or its content suppliers and is protected by applicable copyright and trademark laws.', 'You may not reproduce, copy, sell, resell, exploit, or use HubCredo trademarks and brand assets without our express written permission.'] },
  { title: '3. Information Accuracy', paragraphs: ['We strive to keep the information on our Site accurate and current, but make no warranties about its accuracy, completeness, or reliability. You use information on the Site at your own risk.'] },
  { title: '4. Services', paragraphs: ['HubCredo offers services related to lead generation, inside sales enablement, sales outreach support, AI automation, and related digital solutions. Engagements are subject to separate proposals or service agreements, which override conflicting provisions here. We may modify, suspend, or discontinue a service or feature without prior notice.'] },
  { title: '5. Third-Party Links', paragraphs: ['The Site may contain links to third-party websites or tools for convenience. We do not control or endorse them and are not responsible for their content, policies, or practices. Your use of third-party sites is subject to their own terms.'] },
  { title: '6. Limitation of Liability', paragraphs: ['To the fullest extent permitted by law, HubCredo and its team are not liable for indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, the Site or Services, including loss of profits, data, goodwill, or other intangible losses.'] },
  { title: '7. Indemnification', paragraphs: ['You agree to indemnify, defend, and hold harmless HubCredo, its directors, employees, partners, and affiliates from claims, damages, losses, liabilities, or expenses arising from your use of the Site or Services, violation of these Terms, or infringement of another party’s rights.'] },
  { title: '8. Termination', paragraphs: ['We may suspend or terminate your access to the Site or Services at any time, without prior notice or liability, including when these Terms are breached.'] },
  { title: '9. Disclaimer', paragraphs: ['All materials and Services are provided on an “as-is” and “as-available” basis. We make no express or implied warranties about availability, reliability, or fitness for a particular purpose.'] },
  { title: '10. Governing Law', paragraphs: ['These Terms are governed by and construed in accordance with the laws of India, without regard to conflict of law provisions.'] },
  { title: '11. Changes to These Terms', paragraphs: ['We may update these Terms at any time. The revised version will be posted on this page with the updated date. By continuing to use the Site, you accept those changes.'] },
];

function LegalPage({ title, intro, sections, onHome }: { title: string; intro: string; sections: LegalSection[]; onHome: () => void }) {
  return <div className="legal-page"><header className="site-header"><nav className="nav-wrap" aria-label="Legal page navigation"><a className="brand" href="#top" onClick={onHome} aria-label="Hubcredo home"><img src="/images/Hubcredo_logo_(1)_(3) copy.png"height={200} alt="Hubcredo" /></a><button className="legal-home" onClick={onHome}>Back to home <ArrowRight size={16} /></button></nav></header><main className="legal-main"><div className="legal-hero"><img className="legal-logo" src="/images/Hubcredo_logo_1_3.png" alt="HubCredo" /><h1>{title}</h1><p>{intro}</p></div><article className="legal-content">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</article></main><footer className="footer legal-footer"><div className="footer-bottom"><span>Copyright 2026 © All rights Reserved.</span><button onClick={onHome}>Return to HubCredo</button></div></footer></div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeChoose, setActiveChoose] = useState(0);
  const [page, setPage] = useState<'home' | 'privacy' | 'terms'>('home');

  useEffect(() => {
    const chooseRotation = window.setInterval(() => {
      setActiveChoose((current) => (current + 1) % chooseTabs.length);
    }, 4200);
    return () => window.clearInterval(chooseRotation);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') setPage('privacy');
      else if (hash === '#terms') setPage('terms');
      else setPage('home');
    };
    window.addEventListener('hashchange', onHash);
    onHash();
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const goHome = () => { window.location.hash = '#top'; setPage('home'); };
  const selectedChoose = chooseTabs[activeChoose];
  const ChooseIcon = selectedChoose.icon;

  if (page === 'privacy') return <LegalPage title="Privacy Policy" intro="Your privacy matters to HubCredo. This policy explains how we collect, use, share, and protect information when you use our website and services." sections={privacySections} onHome={goHome} />;
  if (page === 'terms') return <LegalPage title="Terms & Conditions" intro="These terms govern your use of the HubCredo website, services, tools, and resources." sections={termsSections} onHome={goHome} />;

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Hubcredo home"><img src="/images/Hubcredo_logo_1_3.png" alt="Hubcredo" /></a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#top" onClick={closeMenu}>Home</a>
            <a href="#our-team" onClick={closeMenu}>Our Team</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <details className="products-menu"><summary>Products <ChevronDown size={14} /></summary><div className="products-dropdown"><a href="https://pipeline.hubcredo.com/" target="_blank" rel="noreferrer">Outreach Pipeline</a><a href="https://hr.hubcredo.com/" target="_blank" rel="noreferrer">Recruitment Pipeline</a></div></details>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy fade-in"><p className="eyebrow"><span /> <strong>Creative AI agency</strong></p><p className="hero-kicker">At Hubcredo, we integrate cutting-edge AI to automate your business processes and unlock growth</p><h1>Revolutionize Your Business <strong>with AI-Powered Solutions</strong></h1><a className="button button-purple" href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer">Book A Free Consultation <ArrowRight size={18} /></a></div>
          <div className="hero-visual fade-in delay-1" aria-label="Animated AI and automation network">
            <div className="hero-grid" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-lockup"><img src="/images/Hubcredo_logo_(1)_(3) copy.png" alt="Hubcredo" /><span>AI ENGINE <i /> LIVE SYSTEM</span></div><div className="hero-center"><Sparkles size={30} /><b>AI<br />engine</b><small>LIVE SYSTEM</small></div>
            {animationNodes.map(({ label, icon: Icon, className }) => <div className={`animation-node ${className}`} key={label}><Icon size={20} /><span>{label}</span></div>)}
            <span className="signal signal-1" /><span className="signal signal-2" /><span className="signal signal-3" /><div className="hero-live"><i /> Workflows running <strong>24/7</strong></div>
          </div>
        </section>

        <section className="creative-strip"><div className="strip-inner"><span>We’re</span><div className="strip-image"><img src="https://hubcredo.com/wp-content/uploads/2024/10/video-h1.webp" alt="Creative AI agency preview" /></div><span>Creative</span><strong>AI Agency</strong><p>At Hubcredo, we create AI-powered automation systems that eliminate manual tasks, improve efficiency, and help your business grow faster.</p><a href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer">Book A Meeting <ArrowRight size={18} /></a></div></section>

        <section className="choose-section section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Why should you choose?</p><h2>Systems that turn<br /><strong>effort into growth.</strong></h2></div><div className="choose-layout"><div className={`seed-mark seed-mark-${activeChoose}`} key={activeChoose}><ChooseIcon size={120} strokeWidth={1} /></div><div className="choose-tabs"><div className="tab-pills" role="tablist" aria-label="Hubcredo capabilities">{chooseTabs.map((tab, index) => <button className={activeChoose === index ? 'active' : ''} key={tab.label} onClick={() => setActiveChoose(index)} role="tab" aria-selected={activeChoose === index}>{tab.label}</button>)}</div><div className={`choose-panel choose-panel-${selectedChoose.tone}`} key={selectedChoose.label}><div className="panel-icon"><ChooseIcon size={27} /></div><div><h3>{selectedChoose.title}</h3><p>{selectedChoose.text}</p></div></div></div></div></section>

        <section className="motion-systems" aria-label="Hubcredo AI automation systems"><div className="motion-heading"><p className="eyebrow"><span /> AI-powered systems</p><h2>Build, connect, and<br /><strong>automate everything.</strong></h2></div><div className="motion-viewport"><div className="motion-track">{[...motionCards, ...motionCards].map(([title, text, Icon, tone], index) => <article className={`motion-card ${tone}`} key={`${title}-${index}`}><div className="motion-icon"><Icon size={27} /></div><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={19} /></article>)}</div></div></section>

        <section className="team-section" id="our-team"><div className="section-shell"><div className="section-title team-heading"><div><p className="eyebrow"><span /> Our team</p><h2>Our team is<br /><strong>here to help.</strong></h2></div><p>A diverse group of specialists, united by curiosity, sharp thinking, and a shared commitment to making our clients' success easier to achieve.</p></div><div className="team-grid">{teamMembers.map((member) => <article className="team-card" key={member.name}><img src={member.image} alt={member.name} /><div className="team-shade" /><div className="team-info"><div><h3>{member.name}</h3><p>{member.role}</p></div><span className="circle-arrow"><ArrowRight size={16} /></span></div><div className="team-bio"><p>{member.bio}</p></div></article>)}</div></div></section>

        <section className="counter-section"><div className="counter-grid"><div><Check size={23} /><strong>50<small>+</small></strong><span>Completed Projects</span></div><div><Check size={23} /><strong>30<small>+</small></strong><span>Business Automated</span></div><div><Check size={23} /><strong>20<small>+</small></strong><span>5 Star Reviews</span></div></div></section>

        <section className="feedback-section"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Client’s Feedback</p><h2>Trusted by teams<br /><strong>that move forward.</strong></h2></div><div className="testimonial-slider"><button className="slider-button" onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">‹</button><div className="testimonial-card"><p className="testimonial-company">{testimonials[activeTestimonial][0]} <i>/</i> {testimonials[activeTestimonial][1]}</p><h3>{testimonials[activeTestimonial][2]}</h3><div className="stars">★★★★★</div><p>{testimonials[activeTestimonial][3]}</p></div><button className="slider-button" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial">›</button></div><div className="slider-dots">{testimonials.map((testimonial, index) => <button className={activeTestimonial === index ? 'active' : ''} key={testimonial[0]} onClick={() => setActiveTestimonial(index)} aria-label={`Show ${testimonial[0]} testimonial`} />)}</div></div></section>

        <section className="services-section" id="services"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> What we do</p><h2>Solutions built<br /><strong>for momentum.</strong></h2></div><div className="service-grid">{services.map(([title, text, color, Icon]) => <article className="service-card" style={{ background: color }} key={title}><div className="service-art"><Icon size={80} strokeWidth={1.1} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <div className="marquee"><div><span>✦</span> AI-Powered Automation <span>✦</span> Result-Oriented Workflows <span>✦</span> Startup friendly <span>✦</span> Smart Data Enrichment <span>✦</span> Faster response time <span>✦</span> Automated Lead Generation <span>✦</span> Cold Email Made Easy <span>✦</span> Optimized Marketing Campaigns</div></div>

        <section className="process-section"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Our process</p><h2>Our Process is Divided<br />into <strong>Four Key Phases</strong></h2></div><div className="process-grid">{processSteps.map(([title, text, Icon, color]) => <article className="process-card" style={{ background: color }} key={title}><Icon size={66} strokeWidth={1.15} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="partners-section"><div className="section-shell"><h3>We are a Proud partner of</h3><div className="partners-viewport"><div className="partners partners-track"><span>n8n</span><span>Clay</span><span>HubSpot</span><span>Smartlead</span><span>Apollo</span><span>Supabase</span><span>n8n</span><span>Clay</span><span>HubSpot</span><span>Smartlead</span><span>Apollo</span><span>Supabase</span></div></div><div className="video-title"><p className="eyebrow"><span /> Testimonial from a client</p><h2>Hear what teams<br /><strong>say about us.</strong></h2></div><div className="video-placeholder"><div className="video-play"><span>▶</span></div><strong>Hubcredo client story</strong><small>Watch how AI-powered workflows change the day-to-day.</small></div></div></section>

        <section className="faq-section" id="faq"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> FAQ</p><h2>Everything you need<br /><strong>to know.</strong></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span>{activeFaq === index ? <X size={19} /> : <Plus size={19} />}</button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="contact-ring ring-one" /><div className="contact-ring ring-two" /><div className="contact-inner"><p className="eyebrow"><span /> Start a conversation</p><h2>Build your next<br /><strong>growth system.</strong></h2><a className="button button-purple" href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer">Book A Free Consultation <ArrowRight size={18} /></a></div></section>
      </main>

      <footer className="footer"><div className="footer-inner"><a className="brand" href="#top" onClick={goHome}><img src="/images/Hubcredo_logo_(1)_(3) copy.png"height={200} alt="Hubcredo" /></a><div className="footer-links"><a href="#top" onClick={goHome}>Home</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Services</a><a href="#our-team" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('our-team')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Our Team</a><details className="products-menu"><summary>Products <ChevronDown size={14} /></summary><div className="products-dropdown"><a href="https://pipeline.hubcredo.com/" target="_blank" rel="noreferrer">Outreach Pipeline</a><a href="https://hr.hubcredo.com/" target="_blank" rel="noreferrer">Recruitment Pipeline</a></div></details></div><div className="footer-legal"><a href="#privacy" onClick={() => setPage('privacy')}>Privacy Policy</a><a href="#terms" onClick={() => setPage('terms')}>Terms &amp; Conditions</a></div></div><div className="footer-office"><div><strong>REGISTERED OFFICE</strong><p>HubCredo Solutions Private Limited<br />3rd Floor, Rainmakers Workspace,<br />7th Main Road, JP Nagar Phase 2,<br />Bengaluru, Karnataka — 560078</p></div><div><strong>EMAIL</strong><p>business@hubcredo.com</p></div></div><div className="footer-bottom"><span>Copyright 2026 © All rights Reserved.</span><span>AI-powered automation · Lead generation · CRM</span></div></footer>
    </div>
  );
}

export default App;
