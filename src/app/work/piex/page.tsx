import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "PIEX Solar SaaS — Case Study",
  description:
    "Designing an operations dashboard and energy forecast model for an industrial solar monitoring platform.",
};

const IMG = "/piex";

/* ---------- building blocks ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-medium text-[16px] uppercase leading-[24px] tracking-[1.26px] text-blue-text md:text-[18px] md:leading-[27px]">
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-[15px] font-display text-[26px] font-bold leading-[1.35] text-ink md:text-[32px] md:leading-[48px]">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[18px] leading-[27px] text-ink-soft">{children}</p>;
}

function Tag({ children, light }: { children: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-[6px]">
      <Image
        src="/deepr/asterisk.png"
        alt=""
        width={24}
        height={24}
        className={
          light
            ? "h-[20px] w-[20px] object-contain brightness-0 invert"
            : "h-[24px] w-[24px] object-contain slate-asterisk"
        }
      />
      <span
        className={
          light
            ? "text-[16px] font-medium uppercase leading-[24px] text-white"
            : "text-[16px] font-bold uppercase leading-[24px] text-slate-ink"
        }
      >
        {children}
      </span>
    </div>
  );
}

function KeyCard({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-hover rounded-[20px] bg-sand p-[24px] md:p-[30px]">
      <Tag>{tag}</Tag>
      <h3 className="mt-[18px] font-display text-[22px] font-bold leading-[1.4] text-slate-ink md:text-[28px] md:leading-[42px]">
        {title}
      </h3>
      <p className="mt-[16px] text-[18px] leading-[27px] text-ink-soft">{children}</p>
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[17px] text-center text-[16px] leading-[24px] text-ink-soft">{children}</p>
  );
}

function Shot({
  src,
  alt,
  w,
  h,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className="h-auto w-full rounded-[12px] shadow-[0_18px_40px_rgb(0_0_0/0.12)]"
    />
  );
}

/* ---------- content ---------- */

const personas = [
  {
    icon: "persona-1",
    title: "Plant Operator",
    body: "On-site, checking the dashboard constantly. Needs to catch issues fast — an inverter underperforming, a zone dropping below threshold, an anomaly on the production curve. The Alerts panel (2 Critical, 3 Warnings today) is their first stop.",
    q: "“Is anything broken right now, and what do I do about it?”",
  },
  {
    icon: "persona-2",
    title: "Operations Manager",
    body: "Tracks daily trends and compares actual vs expected production. Uses the Production Analysis chart hourly — looking at where the actual line diverges from the expected dashed line, and why. Needs to plan maintenance before issues escalate.",
    q: "“Are we on target today, and where are the performance gaps?”",
  },
  {
    icon: "persona-3",
    title: "Executive / Decision Maker",
    body: "Needs the headline numbers fast: 61.60 MWh produced, ₺75,802 revenue, 10,986 kg CO₂ saved — all vs yesterday. Doesn't drill into zone-level data. The KPI strip at the top is the entire interface for this user.",
    q: "“How did we perform today, and are we trending up?”",
  },
];

const principles = [
  {
    n: "01",
    tag: "Data → Decision",
    title: "The chart must tell, not just show",
    body: "A production curve that shows a dip is data. A production curve that marks that dip with a red dot, links it to a timestamped alert chip (“Inverter 4 underperforming — 09:30”), and shows the deviation percentage in the tooltip (-48.0%) is a decision tool. Every chart element in PIEX earns its place by reducing the cognitive gap between “I see something” and “I know what to do.”",
  },
  {
    n: "02",
    tag: "Semantic colour system",
    title: "Colour is a communication system",
    body: "Green means performing normally. Amber means attention needed. Red means critical failure. This isn't aesthetic — it's a language. Zone B2 is amber at 74%. The System Alerts summary shows 2 red, 3 amber, 12 green at a glance. The production curve uses red dots for anomaly events. Colour never carries meaning alone (each is paired with a number, label, or text), but it makes the most important information visible before you consciously look for it.",
  },
  {
    n: "03",
    tag: "Progressive disclosure",
    title: "Drill-down on demand, not by default",
    body: "The dashboard shows 12 zone cards. All 12 numbers are visible. But the full Section B2 breakdown — output vs expected, performance percentage, status label, “Investigate Section” CTA — only appears when you tap the zone. This progressive disclosure keeps the overview scannable while making granular data one action away. Industrial operators know when they need detail. The interface doesn't force it on them when they don't.",
  },
];

const outcome = [
  ["icon-tile-1.png", "Desktop screens — Operations Dashboard + Forecasting"],
  ["icon-tile-2.svg", "Mobile screens — designed for on-site use, not scaled down"],
  ["icon-tile-3.svg", "SaaS marketing visual — promotional image for the platform"],
  ["icon-tile-4.svg", "Full challenge — brief to final delivery"],
];

/* ---------- page ---------- */

export default function PiexPage() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[106px]">
      <Nav active="Work" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Hero */}
        <section className="mt-[81px] overflow-hidden rounded-[30px] bg-slate">
          <div className="relative flex min-h-[355px] flex-col gap-8 px-[50px] py-[60px] md:flex-row md:items-center md:gap-0">
            <h1 className="relative z-10 max-w-[539px] font-display text-[30px] font-bold leading-[1.4] text-white md:text-[44px] md:leading-[66px]">
              Solar® SaaS Designing for clarity under pressure.
            </h1>
            <Image
              src={`${IMG}/hero-dashboard.png`}
              alt="PIEX operations dashboard"
              width={623}
              height={443}
              priority
              className="h-auto w-full rounded-[16px] shadow-[0_24px_50px_rgb(0_0_0/0.25)] md:absolute md:left-[627px] md:top-[60px] md:w-[623px]"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="mt-[20px] grid grid-cols-1 gap-y-6 rounded-[20px] border border-line bg-transparent py-[28px] sm:grid-cols-2 md:gap-y-0 md:py-[38px] md:grid-cols-[327fr_287fr_299fr_287fr]">
          {[
            ["My Role", "UI/UX Designer"],
            ["Deliverables", "2 Desktop · 2 Mobile · 1 Marketing Visual"],
            ["Domain", "Industrial Energy · Enterprise SaaS"],
            ["Duration", "48-hour challenge"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`py-[3px] pr-[20px] ${
                i > 0 ? "pl-[24px] md:pl-[52px] md:border-l md:border-line" : "pl-[24px] md:pl-[38px]"
              }`}
            >
              <p className="text-[14px] uppercase leading-[21px] tracking-[0.98px] text-ink-soft">
                {label}
              </p>
              <p className="mt-[10px] text-[18px] font-semibold leading-[27px] text-blue-stat">
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* 01 — The Brief */}
        <section className="mt-[80px]">
          <Eyebrow>01 — The Brief</Eyebrow>
          <Heading>
            Dense data. Critical decisions.
            <br />
            No room for confusion.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[14px]">
            <Body>
              An industrial energy software company needed a UI/UX designer to reimagine their solar
              plant monitoring platform. The challenge: design two complex data screens — an
              operations dashboard and an energy forecast model — that plant operators could read and
              act on in seconds, not minutes.
            </Body>
            <Body>
              This wasn&apos;t a consumer app. The users are on-site operators managing live solar
              infrastructure — 12 zones, dozens of inverter strings, and real-time production data
              flowing every minute. A missed anomaly costs revenue. An inverter underperforming at
              74% for six hours is a maintenance issue, not a blip. The interface isn&apos;t just
              showing data — it&apos;s the tool through which operators make high-stakes decisions
              under time pressure.
            </Body>
            <Body>
              No reference screens were provided. No existing design system to follow. Complete
              creative freedom — with the constraint that the result had to feel enterprise-grade,
              trustworthy, and scannable by someone who&apos;s checking it every few minutes between
              site walks.
            </Body>
          </div>
          <blockquote className="mt-[30px] rounded-r-[36px] border-l-[5px] border-slate bg-slate-tint pl-[24px] pr-[24px] pt-[30px] pb-[30px] md:pl-[36px] md:pr-[113px] md:pt-[41px] md:pb-[40px]">
            <p className="font-display text-[22px] font-bold leading-[1.5] text-slate-ink md:text-[28px] md:leading-[42px]">
              How do you surface 20+ live data points — production, zone health, system alerts,
              environmental conditions — in a layout an operator can read in under three seconds,
              without any training?
            </p>
          </blockquote>
        </section>

        {/* 02 — Understanding the Users */}
        <section className="mt-[80px]">
          <div className="max-w-[753px]">
            <Eyebrow>02 — Understanding the Users</Eyebrow>
            <Heading>Three roles. Three questions. One interface.</Heading>
            <div className="mt-[10px]">
              <Body>
                Before opening Figma, I mapped who would be using this platform and what specific
                question each role needed answered the moment they opened the screen. The dashboard
                user in the design — Emre Kaya, Plant Operator — grounded every layout decision.
                Every section exists because someone real needs it.
              </Body>
            </div>
          </div>
          <div className="mt-[38px] grid gap-[20px] md:grid-cols-3">
            {personas.map((p) => (
              <div key={p.title} className="card-hover flex flex-col rounded-[20px] bg-sand p-[30px]">
                <Image
                  src={`${IMG}/${p.icon}.png`}
                  alt=""
                  width={70}
                  height={70}
                  className="h-[70px] w-[70px]"
                />
                <h3 className="mt-[15px] font-display text-[24px] font-bold leading-[1.3] text-ink md:text-[28px]">
                  {p.title}
                </h3>
                <p className="mt-[20px] text-[18px] leading-[27px] text-ink-soft">{p.body}</p>
                <div className="mt-auto border-t border-black/10 pt-[20px]">
                  <p className="text-[16px] leading-[24px] text-ink-soft">Core question</p>
                  <p className="mt-[8px] text-[18px] font-medium leading-[27px] text-black/80">
                    {p.q}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 — Operations Dashboard */}
        <section className="mt-[80px]">
          <Eyebrow>03 — Operations Dashboard</Eyebrow>
          <Heading>Everything that matters. Nothing that doesn&apos;t.</Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              The operations dashboard needed to answer three questions simultaneously:{" "}
              <strong className="font-semibold text-ink">
                What are we producing right now? Where are the problems? What does the system alerts
                panel say?
              </strong>{" "}
              These aren&apos;t three separate panels — they&apos;re three layers of the same answer,
              designed to be read in one scan.
            </Body>
            <Body>
              The design is organised into four zones, each serving a distinct cognitive purpose. The
              KPI strip at the top gives you today&apos;s headline numbers at a glance. The
              Production Analysis chart (with actual vs expected lines) gives you the trend. The
              Solar Plant Monitoring section with 12 zone cards gives you spatial, per-zone health.
              The System Alerts panel gives you prioritised action. No hunting — each zone answers
              its own question.
            </Body>
          </div>
          <div className="mt-[30px]">
            <Shot
              src={`${IMG}/dashboard-desktop.png`}
              alt="PIEX operations dashboard, desktop"
              w={1200}
              h={853}
            />
          </div>
          <Caption>
            Hi-Fi — Operations Dashboard (Desktop)
            <br />
            <span className="mt-2 inline-block max-w-[1001px]">
              Each KPI card includes a sparkline showing the metric&apos;s trend throughout the day —
              not just the current number. This lets the operator see at a glance whether a metric is
              improving, declining, or stable without switching to the chart view
            </span>
          </Caption>

          <div className="mt-[40px] grid gap-[30px] md:grid-cols-2">
            <KeyCard
              tag="Key Design Decision"
              title="Actual vs Expected — the chart that does the operator's job for them"
            >
              The Production Analysis chart overlays two lines: the solid blue actual production
              curve and a dashed grey expected production curve. When the two diverge significantly —
              like at 9:30, where actual hit 1.42 MW against an expected of 1.42 MW but deviation
              read -48.0% — the gap is the anomaly. Red dots mark the three critical deviation
              events: Inverter 4 underperforming at 09:30, Section B2 voltage drop at 12:15, and a
              communication issue at 16:40. Below the chart, those events become timestamped amber
              chips. The operator doesn&apos;t need to spot the dip themselves — the chart calls it
              out before they even look for it.
            </KeyCard>
            <KeyCard tag="Design Decision" title="12 zones. One problem visible immediately.">
              The System Alerts panel doesn&apos;t just show a log — it opens with a triage summary:
              2 Critical (red), 3 Warnings (amber), 12 Normal (green). The operator knows their
              workload before reading a single alert. Below that, alerts are sorted by urgency and
              recency — &quot;Inverter 4 efficiency dropped below threshold (String 4-2 · 3 minutes
              ago)&quot; is at the top because it&apos;s the most recent critical issue. Each alert
              row is a tap to investigate, not a dead-end notification.
            </KeyCard>
          </div>

          <div className="mt-[30px]">
            <KeyCard tag="Design Decision" title="System Alerts: prioritised, not just listed">
              The System Alerts panel doesn&apos;t just show a log — it opens with a triage summary:
              2 Critical (red), 3 Warnings (amber), 12 Normal (green). The operator knows their
              workload before reading a single alert. Below that, alerts are sorted by urgency and
              recency — &quot;Inverter 4 efficiency dropped below threshold (String 4-2 · 3 minutes
              ago)&quot; is at the top because it&apos;s the most recent critical issue. Each alert
              row is a tap to investigate, not a dead-end notification.
            </KeyCard>
          </div>
        </section>

        {/* 04 — Energy Forecast Model */}
        <section className="mt-[80px]">
          <Eyebrow>04 — Energy Forecast Model</Eyebrow>
          <Heading>Confidence is data too. Show it.</Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              The Forecasting screen is a separate view in PIEX — accessible from the sidebar under
              &quot;Forecasting,&quot; directly below the Dashboard. Where the dashboard is reactive
              (&quot;what&apos;s happening right now&quot;), Forecasting is proactive: &quot;what
              will the plant produce tomorrow, and how confident is the model?&quot; Operator Emre
              Kaya can switch between these two views instantly from the sidebar without losing
              context.
            </Body>
            <Body>
              The screen answers three questions in one glance: the predicted daily output (47.14
              MWh), the irradiation conditions driving that number (max 775 W/m²), and the
              model&apos;s confidence in its own prediction (88% forecast reliability). The fourth
              KPI — 24.8°C average temperature — sits alongside, because temperature directly affects
              panel efficiency. These aren&apos;t decorative metrics. Each one is a signal the
              operator acts on.
            </Body>
          </div>
          <div className="mt-[30px]">
            <Shot
              src={`${IMG}/forecast-desktop.png`}
              alt="PIEX energy forecast model, desktop"
              w={1200}
              h={853}
            />
          </div>
          <Caption>Hi-Fi — Forecast Model (Desktop)</Caption>

          <div className="mt-[40px] grid gap-[30px] md:grid-cols-2">
            <KeyCard
              tag="Key Design Decision"
              title="Calibrate Model is in the top bar — not buried in the chart"
            >
              The &quot;Calibrate Model&quot; button lives in the top navigation bar, right next to
              the date picker and the Hourly/Daily toggle. This is a deliberate placement: it needs
              to be accessible from anywhere on the Forecasting screen, not tied to a specific chart
              or panel. When an operator sees the MAPE rising (14.3% is on the edge) or the
              model&apos;s accuracy drifting from 85%, the recalibration action shouldn&apos;t
              require scrolling to find. It&apos;s persistent, visible, and always ready — one click
              regardless of where on the forecast the operator is looking.
            </KeyCard>
            <KeyCard
              tag="Primary Action"
              title="Weather data alongside model data — not separated"
            >
              The Weather Forecast panel (Konya · Today: 35°C Sunny, 0% humidity, 26% cloud coverage,
              0% rain probability) sits directly alongside the production chart, not on a separate
              page. This matters: the forecast model&apos;s confidence in 47.14 MWh output depends on
              those weather conditions holding. If cloud coverage climbs from 26% to 70%, the 88%
              reliability estimate changes. By placing weather data next to the forecast, the
              operator can immediately see whether the model&apos;s assumptions match the real
              expected conditions.
            </KeyCard>
            <KeyCard tag="Design Thinking" title="The confidence band makes uncertainty visible">
              The Production &amp; Irradiation Forecast chart shows three things simultaneously: the
              actual production curve (solid blue), the expected production curve (dashed blue), and
              a shaded confidence band between them. The band is the model&apos;s range of confidence
              — it narrows where the model is certain (around peak hours at 12:00–12:45) and widens
              where conditions are less predictable (early morning, late afternoon). The 88%
              reliability figure in the KPI card gives you the summary. The band gives you the where.
            </KeyCard>
            <KeyCard tag="Model Transparency" title="Show the machine's homework">
              The Model Information strip at the bottom (PIEX Forecast v3.2 · Gradient Boost —
              Accuracy 85%, Avg Deviation 0.8 MW, Training Data 393 days, Last Calibration 09 Mar
              2026, MAPE 14.3%) exists because industrial operators don&apos;t trust black boxes. An
              operator whose plant is rated for 8.92 MW peak needs to know the model predicting their
              next day&apos;s output was trained on over a year of real data and last calibrated six
              months ago. Hiding these numbers would feel dishonest. Showing them builds trust in the
              forecast — even when the accuracy isn&apos;t perfect.
            </KeyCard>
          </div>
        </section>

        {/* 05 — Mobile Responsive */}
        <section className="mt-[80px]">
          <Eyebrow>05 — Mobile Responsive</Eyebrow>
          <Heading>
            Not a scaled-down desktop.
            <br />A different experience.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              The brief asked for responsive mobile screens — not scaled-down desktop layouts, but
              genuinely intentional mobile experiences. An operator checking the dashboard on their
              phone while walking the site near Section B2 has completely different needs from one
              watching a monitor in the control room.
            </Body>
            <Body>
              On mobile, the hierarchy tightens. The four KPIs (7.54 MW current power, 61.60 MWh
              daily production, ₺75,802 revenue, 10,986 kg CO₂) compress into a 2×2 grid at the top —
              the most critical numbers, immediately visible. The production trend appears as a
              compact sparkline card below, with the amber anomaly dot visible even at small size.
              Revenue and CO₂ follow. A persistent bottom navigation bar (Dashboard / Forecast /
              Alerts / Settings) keeps all core sections one tap away, never buried in a hamburger
              menu.
            </Body>
          </div>
          <div className="mt-[40px] flex flex-wrap items-start justify-center gap-[20px] md:gap-[30px]">
            {[
              ["mobile-dashboard-trim", "Mobile Dashboard", "Progressive disclosure"],
              ["mobile-forecast-trim", "Mobile Forecast", "Key metrics + action"],
            ].map(([file, title, sub]) => (
              // exports carry the drop-shadow margin: 490 wide keeps the phone itself at 390
              <figure key={file} className="w-[350px] md:w-[490px]">
                <Image
                  src={`${IMG}/${file}.png`}
                  alt={title}
                  width={490}
                  height={872}
                  className="h-auto w-full"
                />
                <figcaption className="mt-[6px] text-center text-[16px] leading-[24px] text-ink-soft">
                  {title}
                  <br />
                  {sub}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 06 — The Why Behind the What */}
        <section className="mt-[80px]">
          <div className="max-w-[775px]">
            <Eyebrow>06 — The Why Behind the What</Eyebrow>
            <h2 className="mt-[10px] font-display text-[26px] font-bold leading-[1.35] text-ink md:text-[32px] md:leading-[48px]">
              Three principles that guided every decision.
            </h2>
          </div>
          <div className="mt-[50px] grid gap-[20px] md:mt-[70px] md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n} className="relative pt-[56px]">
                <Image
                  aria-hidden
                  src={`${IMG}/num-${p.n}.png`}
                  alt=""
                  width={254}
                  height={90}
                  className="pointer-events-none absolute left-[26px] top-0 h-[90px] w-[254px] select-none object-contain object-left-top"
                />
                <div className="relative min-h-[527px] rounded-[20px] bg-slate-deep px-[26px] pt-[30px] pb-[30px]">
                  <Tag light>{p.tag}</Tag>
                  <h3 className="mt-[10px] font-display text-[24px] font-bold leading-[1.4] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-[10px] text-[18px] leading-[27px] text-white/70">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — The Outcome */}
        <section className="mt-[80px]">
          <Eyebrow>07 — The Outcome</Eyebrow>
          <Heading>Five deliverables. 48 hours. Zero templates.</Heading>
          <div className="mt-[15px]">
            <Body>
              Every screen was designed from scratch in Figma — no pre-made dashboard UI kits, no
              lifted component libraries. The visual system (PIEX branding, blue/green/amber semantic
              colour logic, typography, component patterns), the information architecture, and the
              responsive strategy were all original work, built under a 48-hour challenge deadline.
              The operations dashboard alone contains 4 KPI cards with sparklines, a dual-line
              production analysis chart with anomaly markers and alert chips, 12 zone health cards, a
              system alerts panel with triage summary, and a 5-column environmental conditions strip
              — all on a single screen, readable at a glance.
            </Body>
          </div>
          <div className="mt-[38px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-4">
            {outcome.map(([icon, text]) => (
              <div
                key={text}
                className="flex min-h-[296px] flex-col items-center rounded-[20px] bg-sand px-[32px] pt-[34px] pb-[30px]"
              >
                <Image
                  src={`${IMG}/${icon}`}
                  alt=""
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] object-contain"
                />
                <p className="mt-[24px] text-center text-[20px] font-medium leading-[30px] text-blue-tile-text">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-[38px]">
            <Body>
              I didn&apos;t stop at static Figma screens. I built a{" "}
              <strong className="font-bold text-ink">working interactive prototype</strong> of the
              operations dashboard using Claude Code and Figma MCP — pushed live to GitHub Pages.
              It&apos;s a functional web application: the full KPI strip, the production analysis
              chart with red anomaly markers, the 12-zone monitoring grid with Section B2 highlighted
              amber, the system alerts panel with its 2 Critical / 3 Warnings / 12 Normal triage
              summary, and the environmental conditions strip from Konya, Turkey — all rendering live
              in the browser.
            </Body>
          </div>
        </section>

        {/* Closing quote */}
        <section className="relative mx-auto mt-[80px] overflow-hidden rounded-[20px] bg-slate-deep px-[24px] pt-[48px] pb-[48px] text-center md:px-[63px] md:pt-[65px] md:pb-[65px]">
          <Image
            aria-hidden
            src={`${IMG}/turbine-left.png`}
            alt=""
            width={218}
            height={375}
            className="pointer-events-none absolute left-[33px] top-[113px] hidden h-[375px] w-[218px] opacity-30 lg:block"
          />
          <Image
            aria-hidden
            src={`${IMG}/turbine-right.png`}
            alt=""
            width={218}
            height={375}
            className="pointer-events-none absolute left-[947px] top-[73px] hidden h-[375px] w-[218px] opacity-30 lg:block"
          />
          <p className="relative mx-auto max-w-[1072px] font-display text-[24px] font-bold leading-[1.5] text-white md:text-[32px] md:leading-[48px]">
            &quot;Section B2 is underperforming at 74%. Inverter 4 dropped below threshold 3 minutes
            ago. The operator already knows, because the interface told them before they had to look.
            That&apos;s the whole brief, solved.&quot;
          </p>
          <div className="relative mt-[40px] flex flex-wrap justify-center gap-[24px]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop flex h-[49px] items-center rounded-full bg-white px-[25px] text-[16px] font-semibold text-slate-ink"
            >
              <span>Open Live Prototype</span>
            </a>
            <a
              href="#top"
              className="btn-pop flex h-[49px] items-center gap-[10px] rounded-full border border-white bg-orange px-[25px] text-[16px] font-semibold text-white"
            >
              <Image
                src="/deepr/back-to-top.svg"
                alt=""
                width={18}
                height={17}
                className="h-[17px] w-[18px] brightness-0 invert"
              />
              <span>Back to Top</span>
            </a>
          </div>
        </section>

        <footer className="mt-[60px] border-t border-black/20 pt-[26px]">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[16px] font-light leading-[21px] text-black/70">
            <p>© 2026 Souvik Mondal</p>
            <p className="flex items-center gap-[8px]">
              website build with love in
              <Image
                src="/claude-pixel.png"
                alt="Claude"
                width={34}
                height={21}
                className="h-[21px] w-[34px] object-contain [image-rendering:pixelated]"
              />
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
