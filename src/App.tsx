import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CalendarCheck2,
  Code2,
  Database,
  Layers3,
  Linkedin,
  Mail,
  MailOpen,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Plus,
  Sparkles,
  Send,
  Workflow,
  X,
} from 'lucide-react';

const teamMembers = [
  { name: 'Simon Gittins', role: 'Chief Marketing Officer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Simon_pic.png', bio: 'Simon is a senior marketing and commercial leader with 35 years of experience, including 25 years in senior leadership across marketing, digital, creative, agency, and business development. An AI-certified professional and Frontier AI Trainer, he focuses on commercial growth, client relationships, GTM strategy, and building a strong market position at HubCredo. He brings strategy, creativity, technology, AI, and marketing together to help businesses grow. Outside work, Simon enjoys family time, Newcastle United, fitness, travel, and the outdoors.' },
  { name: 'Shashikant Burnwal', role: 'Co-founder', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Shashikant_pic.png', bio: "Shashikant is a co-founder at HubCredo, where he works with founders and leadership teams on growth, GTM, sales, partnerships, and the systems needed to execute them. He enjoys taking ambiguous problems from the early idea stage through research, strategy, experimentation, and implementation.Before HubCredo, Shashikant co-founded Trillbit, a deep-tech startup that he helped build from 0 to 1 and scale to a $3M fundraise. He has also worked across product, strategy, technology, and operations at companies including Ola and Tata Motors, and holds a B.Tech + M.Tech from IIT Kharagpur and an MBA from ISB.Outside of work, Shashikant enjoys exploring new ideas, reading, and spending time with family and friends." },
  { name: 'Ian Jason Creado', role: 'Co-founder', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Ian_pic.png', bio: "Ian is a co-founder at HubCredo, where he looks after operations, making sure client research, outbound and inbound activity, and the automation behind them run smoothly and consistently. Before HubCredo, Ian worked in sales and business development, including as Director of Business Development at Trillbit, where he worked on GTM strategy, outbound, and hiring for a SaaS product. He has also consulted with more than 40 SMEs on their growth strategies. Outside work, Ian enjoys open sea swimming, treks, and long drives." },

  { name: 'Aarti Malhotra', role: 'Senior Content Writer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Aarti_pic.png', bio: "Aarti is a Senior Content Writer at HubCredo, where she works on B2B content and messaging across LinkedIn, email campaigns, websites, newsletters, and other marketing content. She enjoys understanding the audience and the business behind each project before working on the content. Her work involves turning ideas and sometimes complex topics into content that is clear, relevant, and easy to connect with. Alongside content, Aarti also works on the business development side at HubCredo. She sources relevant projects, writes and submits proposals, and helps bring in new business through platforms such as Upwork. Before HubCredo, Aarti worked across marketing, communications, advertising, and content, with experience at organisations including Lowe Lintas, FCB Ulka, Mudra Communications and Satyam Computer Services. Outside work, Aarti loves a bit of retail therapy and binge-watching thrillers on the weekends. And when she gets into her \"reading mode\", she can happily get through a book a day." },
  { name: 'Prateek Shrivastava', role: 'Project Manager', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Prateek_pic.png', bio: "Prateek is a Project Manager focused on client relationships, project delivery, and digital growth. He turns client goals and requirements into clear action plans, coordinates internal teams, supports the sales and tender process, and helps clients get more value from their websites and digital marketing. With experience in project management, digital marketing, lead generation, and client services, he brings a structured, practical approach to delivery. Outside work, he enjoys exploring ideas, technology, digital trends, and creative pursuits." },
  { name: 'Gautam Anand', role: 'AI Product Manager', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Gautam_pic.png', bio: "Gautam is an AI Product Manager focused on designing and strategising AI-powered automation products that solve business problems efficiently and at scale. At HubCredo, he designs end-to-end systems across GTM, operations, lead generation, enrichment, qualification, campaign orchestration, CRM, and follow-ups, while supporting testing, documentation, and delivery quality. Before joining HubCredo, Gautam worked in startup Founder's Office roles across product and business development, including product strategy, partnerships, and positioning. Outside work, he enjoys discovering different foods and desserts." },
  { name: 'Bhuvan', role: 'GTM Engineer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Bhuvan_pic.png', bio: 'Bhuvan is a GTM Engineer focused on building systems that help businesses find, understand, and reach the right prospects. His work spans lead generation, data enrichment, outbound automation, and AI-powered GTM workflows using tools such as n8n, Clay, Apollo, and Supabase. He is especially interested in AI agents, agentic workflows, and MCP servers, and enjoys turning fragmented, repetitive GTM processes into reliable, scalable systems.' },
  { name: 'Karuna Shirali', role: 'Content Writer', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Karuna_pic.png', bio: 'Karuna is the Content Writer at HubCredo, where she works on B2B content and messaging across LinkedIn campaigns, email campaigns, LinkedIn posts, landing pages, newsletters, and other conversion-focused content. She researches audiences and adapts tone to make messaging feel relevant and natural. Before HubCredo, she worked as a Growth Marketer and Copywriter at a marketing agency across outreach, cold email, social media, advertising, and campaign strategy.' },
  { name: 'Vanshita Bafna', role: 'Sales Automation Specialist', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Vanshita_pic.png', bio: 'Vanshita is a Sales Automation Specialist focused on lead generation, enrichment, scoring, routing, and delivery. Her toolkit includes n8n, Clay, Apollo.io, Instantly, Reply.io, Airtable, Apify, Firecrawl, Playwright, and Tavily. With a robotics and automation engineering background, she redesigns messy sales processes into resilient systems and is increasingly bringing AI agents and agentic workflows into GTM operations. Outside work, she enjoys friends, weekend getaways, and a self-appointed sushi audit.' },
  { name: 'Sumit Gupta', role: 'Sales Automation Specialist', image: 'https://hubcredo.com/wp-content/uploads/2025/09/Sumit_pic.png', bio: "Sumit is a Sales Automation Specialist working on workflow automation, data enrichment, and connecting outbound tools through APIs and webhooks. He works with n8n, Postman, Google Gemini, OpenAI APIs, Next.js, React, GitHub, and REST APIs to turn repetitive processes into scalable systems. Sumit enjoys building practical automation and web tools while developing toward becoming a well-rounded AI and automation engineer." },
];

const serviceCards = [
  {
    title: 'Automated Outbound For B2B',
    text: 'Automating outbound prospecting to increase lead engagement.',
    icon: Workflow,
    animation: 'outbound',
    tag: 'Outbound engine',
    caption: 'Autonomous outreach running end-to-end',
    features: ['Personalized sequences at scale', 'Auto-enriched contact data', 'Multi-channel: email + LinkedIn'],
  },
  {
    title: 'Cold Calling, Live',
    text: 'Live calls placed and picked up in real time.',
    icon: Phone,
    animation: 'calling',
    tag: 'Voice AI',
    caption: 'Live calls placed and answered in real time',
    features: ['Real dials, real pickups', 'Live transcription & lead scoring', 'Instant CRM call logging'],
  },
  {
    title: 'Development & Coding',
    text: 'Custom workflows and apps built in React, Java, and JS.',
    icon: Code2,
    animation: 'coding',
    tag: 'Full-stack build',
    caption: 'Code shipped straight from the workflow',
    features: ['React, Java & JS delivery', 'API and webhook integrations', 'Shipped, tested, documented'],
  },
  {
    title: 'Chatbot, Live & Chatting',
    text: 'AI chat that responds to visitors instantly, 24/7.',
    icon: MessageCircle,
    animation: 'chatbot',
    tag: 'AI concierge',
    caption: 'AI replies instantly, day or night',
    features: ['Instant 24/7 responses', 'Context-aware conversations', 'Smart handoff to your sales team'],
  },
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
  ['Global BPO', 'Consumer Goods', 'Best Agency for AI-Powered Outbound & Lead Generation', 'We use Clay AI and n8n to automate lead generation, cold email campaigns, and CRM workflows—helping businesses scale faster.'],
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

function EmailShowcase() {
  return <div className="showcase-animation email-showcase"><div className="email-window"><div className="mini-window-bar"><span /><span /><span /></div><div className="email-field"><small>To</small><b>growth@acme.io</b></div><div className="email-field"><small>Subject</small><b className="type-subject">A smarter way to grow</b></div><div className="email-body"><span className="type-body">Hi Alex, let’s build a better pipeline.</span><i /></div><div className="email-send"><Send size={13} /></div></div><div className="email-plane"><Send size={24} /></div><strong className="sent-badge">Sent <Check size={13} /></strong></div>;
}

function LinkedinShowcase() {
  return <div className="showcase-animation linkedin-showcase"><div className="linkedin-head"><Linkedin size={16} /><span>Outreach sequence</span><i /></div><div className="linkedin-messages"><div className="linkedin-message message-one"><span>Hi Maya, enjoyed your latest launch.</span><Check size={12} /></div><div className="linkedin-message message-two"><span>Would love to share a quick idea.</span><Check size={12} /></div><div className="linkedin-message message-three"><span>Open to a short conversation?</span><Check size={12} /></div></div><div className="linkedin-status"><span /> Sending thoughtfully</div></div>;
}

function CallingShowcase() {
  return <div className="showcase-animation calling-showcase"><div className="call-radar radar-one" /><div className="call-radar radar-two" /><div className="call-avatar"><Phone size={25} /></div><div className="call-label"><strong>Alex Morgan</strong><span className="call-ringing">Ringing...</span><span className="call-connected">Call Connected</span></div><div className="call-wave">{Array.from({ length: 11 }, (_, index) => <i key={index} style={{ '--bar-delay': `${index * 90}ms` } as React.CSSProperties} />)}</div></div>;
}

function WorkflowShowcase() {
  const workflowNodes = [['Lead', Mail], ['Enrich', Database], ['Email sent', Send], ['Opened', MailOpen], ['AI', Bot], ['CRM', Network], ['Meeting booked', CalendarCheck2], ['Deal closed', Check]] as const;

  return (
    <div className="showcase-animation workflow-showcase">
      <div className="workflow-runner" aria-hidden="true" />
      {workflowNodes.map(([label, Icon], index) => (
        <div className={`workflow-node workflow-node-${index}`} key={label}>
          <Icon size={16} />
          <span>{label}</span>
        </div>
      ))}
      <div className="workflow-caption"><span /> n8n workflow running</div>
    </div>
  );
}

function CodeShowcase() {
  return <div className="showcase-animation code-showcase"><div className="code-window"><div className="mini-window-bar"><span /><span /><span /><em>automation.tsx</em></div><div className="code-lines"><p style={{ '--line-delay': '0s' } as React.CSSProperties}><small>01</small><span><b>const</b> workflow = <i>async</i> () =&gt; {'{'}</span></p><p style={{ '--line-delay': '.32s' } as React.CSSProperties}><small>02</small><span><b>return</b> await <u>connect</u>(pipeline);</span></p><p style={{ '--line-delay': '.64s' } as React.CSSProperties}><small>03</small><span><b>await</b> workflow.<u>run</u>();</span></p><p style={{ '--line-delay': '.96s' } as React.CSSProperties}><small>04</small><span>{'}'}</span></p></div><div className="code-cursor" /></div><div className="code-saved"><Check size={12} /> build saved</div></div>;
}

function ChatbotShowcase() {
  return <div className="showcase-animation chatbot-showcase"><div className="chatbot-head"><span className="bot-avatar"><Bot size={16} /></span><div><strong>HubCredo AI</strong><small>Online now</small></div><i /></div><div className="chat-messages"><div className="chat-message chat-user chat-one">Can you enrich these leads?</div><div className="chat-typing typing-one"><i /><i /><i /></div><div className="chat-message chat-ai chat-two">Absolutely. I’ll get that moving.</div><div className="chat-message chat-user chat-three">Route qualified replies to sales.</div><div className="chat-typing typing-two"><i /><i /><i /></div><div className="chat-message chat-ai chat-four">Done. Your workflow is live.</div></div></div>;
}

function ChooseWorkflowDiagram() {
  const nodes = [
    { label: 'Lead In', icon: Mail },
    { label: 'Enrich', icon: Database },
    { label: 'Score', icon: Sparkles },
    { label: 'Route', icon: Network },
    { label: 'Outreach', icon: Send },
    { label: 'CRM Update', icon: Check },
  ] as const;
  return (
    <div className="choose-workflow-diagram">
      <div className="choose-workflow-track">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div className="choose-workflow-node-wrapper" key={node.label}>
              <div className="choose-workflow-node" style={{ '--node-delay': `${index * 0.6}s` } as React.CSSProperties}>
                <Icon size={20} />
                <span>{node.label}</span>
              </div>
              {index < nodes.length - 1 && <div className="choose-workflow-connector"><div className="choose-workflow-pulse" style={{ '--pulse-delay': `${index * 0.6}s` } as React.CSSProperties} /></div>}
            </div>
          );
        })}
      </div>
      <div className="choose-workflow-caption"><span /> n8n workflow running end-to-end</div>
    </div>
  );
}

function AutomationShowcase() {
  const cards = [
    ['email', 'Automated Email Outreach', EmailShowcase],
    ['linkedin', 'LinkedIn Outreach at Scale', LinkedinShowcase],
    ['calling', 'Cold Calling, Live', CallingShowcase],
    ['workflow', 'Workflows Running Automatically (n8n)', WorkflowShowcase],
    ['code', 'Development & Coding (React, Java, JS)', CodeShowcase],
    ['chatbot', 'Chatbot, Live & Chatting', ChatbotShowcase],
  ] as const;
  return (
    <section className="automation-showcase">
      <div className="showcase-section-glow showcase-section-glow-one" aria-hidden="true" />
      <div className="showcase-section-glow showcase-section-glow-two" aria-hidden="true" />
      <div className="showcase-section-grid" aria-hidden="true" />
      <div className="section-shell">
        <div className="section-title centered showcase-heading">
          <p className="eyebrow"><span /> See HubCredo AI in action</p>
          <h2>Systems that keep<br /><strong>moving for you.</strong></h2>
          <p>Watch intelligent outreach, development, and automation work together in real time.</p>
        </div>
        <div className="showcase-grid">
          {cards.map(([type, label, Animation], index) => (
            <article className={`showcase-card showcase-${type}`} style={{ '--showcase-delay': `${index * 0.08}s` } as React.CSSProperties} key={label}>
              <span className="showcase-card-glow" aria-hidden="true" />
              <div className="showcase-visual">
                <span className="showcase-visual-corner corner-tl" />
                <span className="showcase-visual-corner corner-tr" />
                <span className="showcase-visual-corner corner-bl" />
                <span className="showcase-visual-corner corner-br" />
                <Animation />
              </div>
              <div className="showcase-card-footer">
                <span className="showcase-live"><i /> Live system</span>
                <h3>{label}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  return <div className="legal-page"><header className="site-header"><nav className="nav-wrap" aria-label="Legal page navigation"><a className="brand" href="#top" onClick={onHome} aria-label="Hubcredo home"><img src="/images/Hubcredo_logo_(1)_(3) copy.png" alt="Hubcredo" /></a><button className="legal-home" onClick={onHome}>Back to home <ArrowRight size={16} /></button></nav></header><main className="legal-main"><div className="legal-hero"><h1>{title}</h1><p>{intro}</p></div><article className="legal-content">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</article></main><footer className="footer legal-footer"><div className="footer-bottom"><span>Copyright 2026 © All rights Reserved.</span><button onClick={onHome}>Return to HubCredo</button></div></footer></div>;
}

/* ---------- Services: live calling animation (dummy prospect) ---------- */
function CallWorkflow() {
  return (
    <div className="service-workflow calling-workflow">
      <div className="call-card">
        <span className="call-card-glow" />
        <div className="call-avatar-wrap">
          <span className="call-ring r1" />
          <span className="call-ring r2" />
          <span className="call-ring r3" />
          <div className="call-avatar-photo">
            <span>AM</span>
            <i className="call-avatar-badge"><Phone size={11} /></i>
          </div>
        </div>
        <div className="call-identity">
          <strong>Alex Morgan</strong>
          <small>VP Sales · Acme Inc</small>
          <span className="call-number">+1 (415) 555-0132</span>
        </div>
        <div className="call-status">
          <span className="status-dialing">Dialing…</span>
          <span className="status-ringing">Ringing…</span>
          <span className="status-connected"><i /> Connected · 00:12</span>
        </div>
        <div className="call-wave-live">
          {Array.from({ length: 16 }, (_, index) => <i key={index} style={{ '--wave-delay': `${index * 55}ms` } as React.CSSProperties} />)}
        </div>
        <div className="call-actions">
          <span className="call-btn call-decline"><X size={15} /></span>
          <span className="call-btn call-accept"><Phone size={15} /></span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Services: chatbot animation with composer + send states ---------- */
function ChatWorkflow() {
  return (
    <div className="service-workflow chatbot-workflow">
      <div className="chat-panel">
        <div className="chat-panel-head">
          <span className="chat-bot-avatar"><Bot size={15} /></span>
          <div>
            <strong>HubCredo AI</strong>
            <small><i /> Online now</small>
          </div>
        </div>
        <div className="chat-thread">
          <div className="chat-row chat-row-user">
            <div className="chat-bubble-new bubble-user">Can you help with that?</div>
            <span className="bubble-status">
              <em className="status-sending">Sending…</em>
              <em className="status-sent">Sent <Check size={10} /></em>
            </span>
          </div>
          <div className="chat-row chat-row-bot">
            <div className="chat-typing-new"><i /><i /><i /></div>
          </div>
          <div className="chat-row chat-row-bot">
            <div className="chat-bubble-new bubble-bot">Absolutely — booking that in now.</div>
          </div>
        </div>
        <div className="chat-composer">
          <span className="chat-input">
            <span className="chat-typed">Can you help with that?</span>
            <em className="chat-caret" />
          </span>
          <button className="chat-send" type="button" aria-label="Send message"><Send size={15} /></button>
        </div>
      </div>
    </div>
  );
}

function ServiceWorkflow({ animation }: { animation: string }) {
  if (animation === 'outbound') return <div className="service-workflow outbound-workflow"><div className="workflow-steps">{([['Data Enriched', Database], ['Email Sent', Send], ['LinkedIn Sent', MessageCircle], ['Reply Received', Check]] as const).map(([label, Icon], index) => <div className="service-step" style={{ '--step-delay': `${index}s` } as React.CSSProperties} key={label}><span className="step-icon"><Icon size={19} /></span><span>{label}</span><i><Check size={11} /></i></div>)}</div><strong className="flow-complete">Flow Complete <Check size={13} /></strong></div>;
  if (animation === 'calling') return <CallWorkflow />;
  if (animation === 'coding') return <div className="service-workflow coding-workflow"><div className="code-placeholder"><div className="code-top"><span /><span /><span /></div>{['const flow = await connect();', 'await enrich(leads);', 'return workflow.run();'].map((line, index) => <p style={{ '--code-delay': `${index * .75}s` } as React.CSSProperties} key={line}><small>0{index + 1}</small><span>{line}</span></p>)}<b className="code-caret" /></div><strong className="service-complete"><Check size={15} /> Build complete</strong></div>;
  return <ChatWorkflow />;
}

function ServicesCarousel() {
  const [activeService, setActiveService] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const goToService = (nextIndex: number) => setActiveService((nextIndex + serviceCards.length) % serviceCards.length);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveService((current) => (current + 1) % serviceCards.length), 4500);
    return () => window.clearInterval(timer);
  }, [paused]);
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => { setDragStart(event.clientX); setPaused(true); event.currentTarget.setPointerCapture(event.pointerId); };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => { if (dragStart !== null) setDragOffset(event.clientX - dragStart); };
  const handlePointerUp = () => { if (Math.abs(dragOffset) > 55) goToService(activeService + (dragOffset < 0 ? 1 : -1)); setDragStart(null); setDragOffset(0); setPaused(false); };
  return <div className="services-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { if (dragStart === null) setPaused(false); }}><div className="carousel-viewport" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}><div className="carousel-track" style={{ transform: `translateX(calc(-${activeService * 100}% + ${dragOffset}px))` }}>{serviceCards.map(({ title, text, icon: Icon, animation, tag, caption, features }, index) => <article className="service-card carousel-card" key={title} aria-hidden={activeService !== index}><div className="service-card-inner"><div className="service-card-content"><div className="service-icon-badge"><Icon size={26} strokeWidth={1.6} /></div><span className="service-tag">{tag}</span><h3>{title}</h3><p>{text}</p><ul className="service-feature-list">{features.map((feature) => <li key={feature}><Check size={14} /><span>{feature}</span></li>)}</ul></div><div className="service-card-visual"><div className="service-card-visual-grid" /><span className="service-card-visual-badge"><span /> Live preview</span><ServiceWorkflow animation={animation} /><span className="service-card-visual-caption">{caption}</span></div></div></article>)}</div></div><div className="carousel-controls"><button onClick={() => goToService(activeService - 1)} aria-label="Previous service">‹</button><div className="carousel-dots">{serviceCards.map((service, index) => <button className={activeService === index ? 'active' : ''} onClick={() => goToService(index)} aria-label={`Show ${service.title}`} key={service.title} />)}</div><button onClick={() => goToService(activeService + 1)} aria-label="Next service">›</button></div></div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeChoose, setActiveChoose] = useState(0);
  const [page, setPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    }, { threshold: 0.22 });

    document.querySelectorAll('.process-section, .hero-stats, .counter-section').forEach((section) => {
      observer.observe(section);
    });

    if (processRef.current) processRef.current.classList.add('in-view');

    return () => observer.disconnect();
  }, []);

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
          <a className="brand" href="#top" aria-label="Hubcredo home"><img src="/images/Hubcredo_logo_(1)_(3) copy.png" alt="Hubcredo" /></a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#top" onClick={closeMenu}>Home</a>
            <a href="#our-team" onClick={closeMenu}>Our Team</a>
            <details className="services-menu"><summary>Services <ChevronDown size={14} /></summary><div className="services-dropdown">
              <a href="#services" onClick={closeMenu}>GTM Automation</a>
              <a href="#services" onClick={closeMenu}>Website & App Development</a>
              <a href="#services" onClick={closeMenu}>Content Engineering</a>
              <a href="#services" onClick={closeMenu}>AI-Powered Marketing</a>
            </div></details>
            <details className="products-menu"><summary>Products <ChevronDown size={14} /></summary><div className="products-dropdown"><a href="https://pipeline.hubcredo.com/" target="_blank" rel="noreferrer">Outreach Pipeline</a><a href="https://hr.hubcredo.com/" target="_blank" rel="noreferrer">Recruitment Pipeline</a></div></details>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy fade-in">
              <p className="eyebrow hero-eyebrow"><Sparkles size={14} /> <strong>BUILD. AUTOMATE. GROW.</strong></p>
              <p className="hero-kicker">AI-powered technology and go-to-market solutions for ambitious companies.</p>
              <h1>
  Revolutionize Your Business with{' '}
  <strong className="hero-gradient-title">
    <span className="strip-word strip-gradient" style={{ '--word-delay': '.05s' } as React.CSSProperties}>AI-Powered Solutions</span>{' '}
    <span className="strip-word strip-gradient" style={{ '--word-delay': '.2s' } as React.CSSProperties}></span>
  </strong>
</h1>
              <a className="button button-purple hero-cta" href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer">Book A Free Consultation <ArrowRight size={18} /></a>
              <span className="hero-meta"><i /> 30+ automation systems live in production</span>
              <div className="hero-stats">
                <div className="hero-stat" style={{ '--stat-delay': '.08s' } as React.CSSProperties}>
                  <strong className="pop-number">50+</strong>
                  <span>Projects delivered</span>
                </div>
                <div className="hero-stat" style={{ '--stat-delay': '.22s' } as React.CSSProperties}>
                  <strong className="pop-number">24/7</strong>
                  <span>Workflows running</span>
                </div>
                <div className="hero-stat" style={{ '--stat-delay': '.36s' } as React.CSSProperties}>
                  <strong className="pop-number">4.9/5</strong>
                  <span>Client rating</span>
                </div>
              </div>
            </div>

            <div className="hero-visual fade-in delay-1" aria-label="Animated AI and automation network">
              <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
              <div className="hero-center"><Sparkles size={30} /><b>AI<br />engine</b><small>LIVE SYSTEM</small></div>
              {animationNodes.map(({ label, icon: Icon, className }) => <div className={`animation-node ${className}`} key={label}><Icon size={20} /><span>{label}</span></div>)}
              <div className="hero-live"><i /> Workflows running <strong>24/7</strong></div>
            </div>
          </div>
        </section>

        <section className="choose-section section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Why should you choose?</p><h2>Systems that turn<br /><strong>effort into growth.</strong></h2></div><div className="choose-layout"><div className="choose-left-col"><div className={`seed-mark seed-mark-${activeChoose}`} key={activeChoose}><ChooseIcon size={120} strokeWidth={1} /></div><ChooseWorkflowDiagram /></div><div className="choose-tabs"><div className="tab-pills" role="tablist" aria-label="Hubcredo capabilities">{chooseTabs.map((tab, index) => <button className={activeChoose === index ? 'active' : ''} key={tab.label} onClick={() => setActiveChoose(index)} role="tab" aria-selected={activeChoose === index}>{tab.label}</button>)}</div><div className={`choose-panel choose-panel-${selectedChoose.tone}`} key={selectedChoose.label}><div className="panel-icon"><ChooseIcon size={27} /></div><div><h3>{selectedChoose.title}</h3><p>{selectedChoose.text}</p></div></div></div></div></section>

        <section className="motion-systems" aria-label="Hubcredo AI automation systems"><div className="motion-heading"><p className="eyebrow"><span /> AI-powered systems</p><h2>Build, connect, and<br /><strong>automate everything.</strong></h2></div><div className="motion-viewport"><div className="motion-track">{[...motionCards, ...motionCards].map(([title, text, Icon, tone], index) => <article className={`motion-card ${tone}`} key={`${title}-${index}`}><span className="motion-card-glow" /><div className="motion-icon"><Icon size={26} /></div><div className="motion-card-body"><h3>{title}</h3><p>{text}</p></div><span className="motion-arrow"><ArrowRight size={16} /></span></article>)}</div></div></section>

        <AutomationShowcase />

        <section className="team-section" id="our-team"><div className="section-shell"><div className="section-title team-heading"><div><p className="eyebrow"><span /> Our team</p><h2>Our team is<br /><strong>here to help.</strong></h2></div><p>A diverse group of specialists, united by curiosity, sharp thinking, and a shared commitment to making our clients' success easier to achieve.</p></div><div className="team-grid">{teamMembers.map((member) => <article className="team-card" key={member.name}><img src={member.image} alt={member.name} /><div className="team-shade" /><div className="team-info"><div><h3>{member.name}</h3><p>{member.role}</p></div><span className="circle-arrow"><ArrowRight size={16} /></span></div><div className="team-bio"><p>{member.bio}</p></div></article>)}</div></div></section>

        <section className="counter-section"><div className="counter-grid"><div><Check size={23} /><strong className="pop-number">50<small>+</small></strong><span>Completed Projects</span></div><div><Check size={23} /><strong className="pop-number">30<small>+</small></strong><span>Business Automated</span></div><div><Check size={23} /><strong className="pop-number">20<small>+</small></strong><span>5 Star Reviews</span></div></div></section>

        <section className="feedback-section"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Client’s Feedback</p><h2>Trusted by teams<br /><strong>that move forward.</strong></h2></div><div className="testimonial-slider"><button className="slider-button" onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial">‹</button><div className="testimonial-card"><p className="testimonial-company">{testimonials[activeTestimonial][0]} <i>/</i> {testimonials[activeTestimonial][1]}</p><h3>{testimonials[activeTestimonial][2]}</h3><div className="stars">★★★★★</div><p>{testimonials[activeTestimonial][3]}</p></div><button className="slider-button" onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial">›</button></div><div className="slider-dots">{testimonials.map((testimonial, index) => <button className={activeTestimonial === index ? 'active' : ''} key={testimonial[0]} onClick={() => setActiveTestimonial(index)} aria-label={`Show ${testimonial[0]} testimonial`} />)}</div></div></section>

        <section className="services-section" id="services"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> What we do</p><h2>Solutions built<br /><strong>for momentum.</strong></h2></div><ServicesCarousel /></div></section>

        <div className="marquee"><div><span>✦</span> AI-Powered Automation <span>✦</span> Result-Oriented Workflows <span>✦</span> Startup friendly <span>✦</span> Smart Data Enrichment <span>✦</span> Faster response time <span>✦</span> Automated Lead Generation <span>✦</span> Cold Email Made Easy <span>✦</span> Optimized Marketing Campaigns</div></div>

        <section className="process-section" ref={processRef}><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> Our process</p><h2>Our Process is Divided<br />into <strong>Four Key Phases</strong></h2></div><div className="process-grid"><div className="process-connector-line" />{processSteps.map(([title, text, Icon], index) => <article className="process-card" style={{ '--card-delay': `${index * 0.15}s` } as React.CSSProperties} key={title}><div className="process-card-glow" /><Icon size={56} strokeWidth={1.15} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="partners-section"><div className="section-shell"><h3>We are a Proud partner of</h3><div className="partners-viewport"><div className="partners partners-track">{[
          ['n8n', '/images/n8n.png'],
          ['Clay', '/images/Clay.jpg'],
          ['HubSpot', '/images/hubspot.png'],
          ['Smartlead', '/images/smartlead.jpeg'],
          ['Apollo', '/images/apollo.jpg'],
          ['Supabase', '/images/supabase.png'],
          ['n8n', '/images/n8n.png'],
          ['Clay', '/images/Clay.jpg'],
          ['HubSpot', '/images/hubspot.png'],
          ['Smartlead', '/images/smartlead.jpeg'],
          ['Apollo', '/images/apollo.jpg'],
          ['Supabase', '/images/supabase.png'],
        ].map(([tool, logo], index) => <span className="tool-logo" key={`${tool}-${index}`}><img src={logo} alt={tool} /></span>)}</div></div><div className="video-title"><p className="eyebrow"><span /> Testimonial from a client</p><h2>Hear what teams<br /><strong>say about us.</strong></h2></div><div className="video-embed">
  <wistia-player media-id="ro4r3gvhvc" aspect="1.7777777777777777"></wistia-player>
</div></div></section>

        <section className="faq-section" id="faq"><div className="section-shell"><div className="section-title centered"><p className="eyebrow"><span /> FAQ</p><h2>Everything you need<br /><strong>to know.</strong></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}><span>{question}</span>{activeFaq === index ? <X size={19} /> : <Plus size={19} />}</button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div></section>

      </main>

      <footer className="footer hero-themed-footer"><div className="footer-ambient footer-ambient-one" aria-hidden="true" /><div className="footer-ambient footer-ambient-two" aria-hidden="true" /><div className="footer-grid-bg" aria-hidden="true" /><div className="footer-top"><div className="footer-brand-col"><a className="brand" href="#top" onClick={goHome}><img src="/images/Hubcredo_logo_(1)_(3) copy.png" alt="Hubcredo" /></a><p className="footer-tagline">AI-powered GTM systems for B2B revenue growth.</p><div className="footer-socials"><a href="https://www.linkedin.com/company/hubcredo" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:business@hubcredo.com" aria-label="Email"><Mail size={18} /></a><a href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer" aria-label="Book a call"><Phone size={18} /></a></div></div><div className="footer-cols"><div className="footer-col"><h4>Services</h4><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Automated Outbound</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Data Enrichment</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>n8n Automation</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Cold Email Campaigns</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Email Marketing</a><a href="#services" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>AI Full-Stack Dev</a></div><div className="footer-col"><h4>Products</h4><a href="https://pipeline.hubcredo.com/" target="_blank" rel="noreferrer">Outreach Pipeline</a><a href="https://hr.hubcredo.com/" target="_blank" rel="noreferrer">Recruitment Pipeline</a></div><div className="footer-col"><h4>Company</h4><a href="#top" onClick={goHome}>Home</a><a href="#our-team" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('our-team')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Our Team</a><a href="#faq" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>FAQ</a><a href="https://calendly.com/hubcredo/introductory-call" target="_blank" rel="noreferrer">Book a Call</a></div><div className="footer-col"><h4>Legal</h4><a href="#privacy" onClick={() => setPage('privacy')}>Privacy Policy</a><a href="#terms" onClick={() => setPage('terms')}>Terms &amp; Conditions</a></div><div className="footer-col"><h4>Contact</h4><p className="footer-contact-text">HubCredo Solutions Pvt Ltd<br />3rd Floor, Rainmakers Workspace<br />7th Main Road, JP Nagar Phase 2<br />Bengaluru, Karnataka 560078</p><a href="mailto:business@hubcredo.com" className="footer-email">business@hubcredo.com</a></div></div></div><div className="footer-bottom"><span>© 2026 HubCredo Solutions Private Limited. All rights reserved.</span></div></footer>
    </div>
  );
}

export default App;
