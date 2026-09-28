import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "8x — Redesigning the invite-to-campaign flow",
  description:
    "8x is a B2B marketplace connecting brands with LinkedIn creators. One flow, taken from problem-finding through to a working prototype.",
};

const IMG = "/8x";
const PROTOTYPE = "https://souvik111.github.io/8x-s-Invite-Creator-s-Flow-Redesign/";

/* ---------- building blocks ---------- */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[26px] font-bold leading-[1.35] text-ink md:text-[32px] md:leading-[48px]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[20px] font-bold leading-[1.4] text-ink md:text-[24px] md:leading-[36px]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[18px] leading-[27px] text-black/60">{children}</p>;
}

function Shot({
  src,
  alt,
  w,
  h,
  className = "",
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={`h-auto w-full rounded-[10px] border border-black/10 ${className}`}
    />
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[18px] text-center text-[16px] font-medium leading-[21px] text-black/70">
      {children}
    </p>
  );
}

function ProblemCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[16px] text-[16px] font-light leading-[21px] text-black/70">{children}</p>
  );
}

// the two-up before/after pairs in the Screenshots section are joined by an arrow
function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 307 22"
      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[22px] w-[200px] -translate-x-1/2 -translate-y-1/2 text-black/35 lg:block"
      fill="none"
    >
      <path d="M0 11h295" stroke="currentColor" strokeWidth="1.5" />
      <path d="M295 3l10 8-10 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ---------- content ---------- */

const problems = [
  {
    problem: "Auto-sent invite message, no review step",
    where: "Invite-to-campaign flow",
    why: "A real message goes to a real person before a human sees or edits it — a deliberate speed choice, but the wrong trade-off for outreach that’s building a relationship",
  },
  {
    problem: "Redirect out of the grid on every single invite",
    where: "Invite-to-campaign flow",
    why: "The grid’s own layout (6+ cards, identical buttons) implies bulk action, but the product forces one-at-a-time, losing your place each time",
  },
  {
    problem: "“Which one are you?” re-asks a question already answered",
    where: "Onboarding",
    why: "The brand-only CTA clicked, plus the Company/Work-email fields just filled in, are two signals already saying “brand” — asked a third time anyway, as three equal options",
  },
  {
    problem: "Button promises a state the product hasn’t reached",
    where: "Campaign creation",
    why: "“Create campaign & view matches” implies the campaign is live; the next screen says “Not open yet,” contradicting its own CTA",
  },
  {
    problem: "Recency signal buried, engagement signal buried deeper",
    where: "Creator profile panel",
    why: "“Last posted 21d ago” — the most decision-relevant fact — sits in tiny grey text; the strongest signal (who actually engages, by role) is two tabs deep",
  },
  {
    problem: "5 truncated stat columns on one card",
    where: "Creator card",
    why: "Followers / Avg Engagement / Top Geo / Top Role / Asking Price crammed into one card, so every label gets abbreviated and cut off (“ASKING R…”)",
  },
];

const reasons = [
  {
    lead: "It’s the core transaction, not a supporting screen.",
    rest: " Everything else in the product exists to lead up to a brand reaching out to a creator.",
  },
  {
    lead: "It’s a trust problem, not just a confusion problem.",
    rest: " The other candidates cause hesitation or a wrong guess. This one sends a real, unreviewed message to a real person — a different order of consequence.",
  },
  {
    lead: "It has enough real surface area for a complete before-and-after story",
    rest: " — evaluating a creator, committing to reach out, reviewing what gets sent, confirming, and seeing status afterward — without sprawling into every screen in the product.",
  },
];

/* ---------- page ---------- */

export default function EightXPage() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[40px]">
      <Nav active="Work" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Hero */}
        <section className="mt-[81px] overflow-hidden rounded-[30px] bg-indigo">
          <div className="relative flex min-h-[355px] flex-col gap-8 px-[30px] py-[50px] md:px-[50px] md:py-[64px] lg:flex-row lg:gap-0">
            <div className="relative z-10 lg:max-w-[560px]">
              <h1 className="font-display text-[30px] font-bold leading-[1.35] text-white md:text-[40px] md:leading-[60px]">
                Redesigning the invite‑to‑campaign flow
              </h1>
              <p className="mt-[15px] text-[18px] leading-[27px] text-white/70">
                8x is a B2B marketplace connecting brands with LinkedIn creators. This is one flow,
                taken from problem-finding through to a working prototype, using Listen Labs as a
                reference rather than a template.
              </p>
            </div>
            <Image
              src={`${IMG}/hero-shot.png`}
              alt="8x campaign creators screen"
              width={623}
              height={329}
              priority
              className="h-auto w-full rounded-[12px] shadow-[0_24px_50px_rgb(0_0_0/0.25)] lg:absolute lg:left-[600px] lg:top-[60px] lg:w-[623px]"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="mt-[20px] grid grid-cols-1 gap-y-6 rounded-[20px] border border-black/20 py-[28px] sm:grid-cols-2 md:grid-cols-4 md:gap-y-0 md:py-[41px]">
          {[
            ["My Role", "Product Designer (redesign + prototype)"],
            ["Deliverables", "1 redesigned flow & interactive prototype"],
            ["Domain", "B2B Marketplace"],
            ["Duration", "24-hour challenge"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`px-[24px] md:px-[38px] ${i > 0 ? "md:border-l md:border-black/20" : ""}`}
            >
              <p className="text-[14px] uppercase leading-[21px] tracking-[0.98px] text-black/60">
                {label}
              </p>
              <p className="mt-[10px] text-[18px] font-semibold leading-[27px] text-indigo">
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* Overview */}
        <section className="mt-[60px]">
          <H2>Overview</H2>
          <div className="mt-[16px] flex flex-col gap-[14px]">
            <P>
              The brief: take 8x.business apart, redesign one flow end-to-end, and defend every
              decision against a reference product&apos;s design language. 8x is a B2B marketplace
              that connects brands with LinkedIn creators — brands browse a roster of vetted
              creators, brief them, and track every click and lead a sponsored post generates back to
              the creator and post that drove it.
            </P>
            <P>
              The brief was explicit that breadth isn&apos;t the goal: &quot;Redesign as much or as
              little as you can defend. One flow done properly beats every screen done thinly.&quot;
              So rather than reskinning the whole product, I used both 8x and the reference product
              first, end to end, to understand what each was actually doing before touching either —
              then picked one flow to take all the way through analysis, redesign, and a working
              prototype: <strong className="font-semibold text-ink">inviting a creator to a campaign.</strong>
            </P>
            <P>
              That flow is the core transaction 8x exists to support. Everything else in the product
              — browsing, campaign setup, tracking — exists to lead up to this one moment.
            </P>
          </div>
        </section>

        {/* Research */}
        <section className="mt-[50px]">
          <H2>Research — using both products first</H2>
          <div className="mt-[16px]">
            <P>
              Signed up for 8x as a brand and clicked through the real flow: signup, onboarding,
              campaign setup, the creator grid, inviting a creator, and the profile panel —
              screenshotting every screen along the way rather than judging it from the marketing
              site.
            </P>
          </div>
          <div className="mt-[24px]">
            <Shot src={`${IMG}/research.png`} alt="8x screens captured during the walkthrough" w={1200} h={221} />
          </div>
        </section>

        {/* What I found */}
        <section className="mt-[50px]">
          <H2>What I found</H2>
          <div className="mt-[24px] overflow-hidden rounded-[8px] border border-black/20 bg-white">
            {/* header */}
            <div className="hidden grid-cols-[263px_200px_1fr] gap-[60px] border-b border-black/20 px-[28px] py-[16px] text-[18px] font-medium leading-[23px] text-black md:grid">
              <span>Problem</span>
              <span>Where</span>
              <span>Why it matters</span>
            </div>
            {problems.map((r, i) => (
              <div
                key={r.problem}
                className={`grid gap-[10px] px-[24px] py-[20px] md:grid-cols-[263px_200px_1fr] md:gap-[60px] md:px-[28px] md:py-[26px] ${
                  i > 0 ? "border-t border-black/20" : "border-t border-black/20 md:border-t-0"
                }`}
              >
                <p className="text-[18px] font-light leading-[23px] text-black/70">{r.problem}</p>
                <p className="text-[18px] font-light leading-[23px] text-black/70">{r.where}</p>
                <p className="text-[18px] font-light leading-[23px] text-black/70">{r.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        <section className="mt-[50px]">
          <h2 className="font-display text-[22px] font-bold leading-[1.4] text-ink md:text-[24px] md:leading-[36px]">
            Screenshots
          </h2>

          {/* row 1 — two independent problems */}
          <div className="mt-[24px] grid gap-[24px] lg:grid-cols-2 lg:gap-[47px]">
            <figure>
              <Shot src={`${IMG}/p1.png`} alt="Invite sent with no review step" w={575} h={286} />
              <ProblemCaption>Problem 1: Auto-sent invite message, no review step</ProblemCaption>
            </figure>
            <figure>
              <Shot src={`${IMG}/p3.png`} alt="Onboarding asking which one are you" w={575} h={286} />
              <ProblemCaption>
                Problem 3: “Which one are you?” re-asks a question already answered
              </ProblemCaption>
            </figure>
          </div>

          {/* row 2 — before → after pair */}
          <div className="mt-[34px]">
            <div className="relative grid gap-[24px] lg:grid-cols-2 lg:gap-[47px]">
              <Shot src={`${IMG}/p2a.png`} alt="Creator grid" w={575} h={286} />
              <Shot src={`${IMG}/p2b.png`} alt="Redirected away from the grid" w={575} h={286} />
              <Arrow />
            </div>
            <p className="mt-[16px] text-center text-[16px] font-light leading-[21px] text-black/70">
              Problem 2: Redirect out of the grid on every single invite
            </p>
          </div>

          {/* row 3 — before → after pair */}
          <div className="mt-[34px]">
            <div className="relative grid gap-[24px] lg:grid-cols-2 lg:gap-[47px]">
              <Shot src={`${IMG}/p4a.png`} alt="Create campaign and view matches" w={575} h={285} />
              <Shot src={`${IMG}/p4b.png`} alt="Campaign not open yet" w={575} h={285} />
              <Arrow />
            </div>
            <p className="mt-[16px] text-center text-[16px] font-light leading-[21px] text-black/70">
              Problem 4: Button promises a state the product hasn’t reached
            </p>
          </div>

          {/* row 4 */}
          <div className="mt-[34px] grid gap-[24px] lg:grid-cols-2 lg:gap-[47px]">
            <figure>
              <Shot src={`${IMG}/p5.png`} alt="Creator profile panel" w={575} h={286} />
              <ProblemCaption>
                Problem 5: Recency signal buried, engagement signal buried deeper
              </ProblemCaption>
            </figure>
            <figure>
              <Shot src={`${IMG}/p6.png`} alt="Creator card with five stat columns" w={575} h={286} />
              <ProblemCaption>Problem 6: 5 truncated stat columns on one card</ProblemCaption>
            </figure>
          </div>
        </section>

        {/* Why this flow */}
        <section className="mt-[60px]">
          <H2>Why the invite flow, over the other candidates</H2>
          <div className="mt-[16px]">
            <P>I picked the invite flow for three reasons:</P>
          </div>
          <ol className="mt-[12px] flex list-decimal flex-col gap-[10px] pl-[22px] text-[18px] leading-[31px] text-black/60 marker:text-black/40">
            {reasons.map((r) => (
              <li key={r.lead}>
                <strong className="font-semibold text-ink">{r.lead}</strong>
                {r.rest}
              </li>
            ))}
          </ol>
        </section>

        {/* The redesign */}
        <section className="mt-[60px]">
          <H2>The redesign</H2>
          <div className="mt-[16px]">
            <P>
              Built as a working HTML/CSS/JS prototype, not static frames — every interaction
              described below is actually clickable.
            </P>
            <a
              href={PROTOTYPE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[6px] inline-block break-all text-[18px] font-semibold leading-[27px] text-indigo underline decoration-indigo/40 underline-offset-4 hover:decoration-indigo"
            >
              {PROTOTYPE}
            </a>
          </div>

          {/* 1 */}
          <div className="mt-[40px]">
            <H3>1. Creator card — cut from 5 stat columns to 4</H3>
            <div className="mt-[16px]">
              <P>
                Followers, Avg. Engagement, Top Geo, and Asking Price stayed, since those directly
                answer “is this creator worth what they’re asking, and are they where I need them.”
                Top Role moved into the profile panel, where there’s room to show it properly, rather
                than as a fifth abbreviated column. The bio line changed from a hard single-line
                truncation to a 2-line wrap — nothing gets cut off mid-word anymore.
              </P>
            </div>
            <div className="mt-[30px] grid items-end gap-[24px] md:grid-cols-2 md:gap-[146px]">
              <figure>
                <Shot src={`${IMG}/card-before.png`} alt="Creator card before" w={403} h={283} />
                <Caption>Before</Caption>
              </figure>
              <figure>
                <Shot src={`${IMG}/card-after.png`} alt="Creator card after" w={407} h={283} />
                <Caption>After</Caption>
              </figure>
            </div>
          </div>

          {/* 2 */}
          <div className="mt-[46px]">
            <H3>2. Recency moved from buried to visible</H3>
            <div className="mt-[16px]">
              <P>
                “Active 3d ago” now sits directly on the card. It was previously the smallest, greyest
                text at the bottom of the profile panel, despite being more decision-relevant than
                most of what was already on the card.
              </P>
            </div>
          </div>

          {/* 3 */}
          <div className="mt-[46px]">
            <H3>3. Multi-select replaces one-at-a-time inviting</H3>
            <div className="mt-[16px]">
              <P>
                A checkbox appears on hover; selecting creators surfaces a persistent bottom bar with
                a running count and a single “Invite selected” action — matching what the grid’s own
                layout already implied (many identical cards, same action) but never actually
                supported.
              </P>
            </div>
            <div className="mt-[30px]">
              <Shot src={`${IMG}/multi-select.png`} alt="Two creator cards selected with a bulk action bar" w={1200} h={606} />
              <Caption>
                Redesign — Campaign creators, two cards selected, bulk action bar visible
              </Caption>
            </div>
          </div>

          {/* 4 */}
          <div className="mt-[46px]">
            <H3>4. A review step, before anything sends</H3>
            <div className="mt-[16px]">
              <P>
                Selecting “Invite” now opens a panel showing exactly who the message is going to, an
                AI-drafted message that’s fully editable, and the brief link that will be attached.
                The message still gets drafted instantly — no lost speed — but a human sees it before
                it reaches a real person, instead of after.
              </P>
            </div>
            <div className="mt-[30px]">
              <Shot src={`${IMG}/invite-panel.png`} alt="Invite 2 creators review panel" w={1201} h={634} />
              <Caption>
                Redesign — Campaign creators, “Invite 2 creators” panel (recipients, editable
                message, attached brief link)
              </Caption>
            </div>
          </div>

          {/* 5 */}
          <div className="mt-[46px]">
            <H3>5. Confirmation without losing your place</H3>
            <div className="mt-[16px]">
              <P>
                Sending shows a toast (“Invite sent to 3 creators”) with a short undo window. Cards
                update in place to an “Invited” state. No redirect out of the grid — the
                browse-and-invite loop stays a loop.
              </P>
            </div>
            <div className="mt-[30px]">
              <Shot src={`${IMG}/toast.png`} alt="Toast confirmation with undo" w={1200} h={634} />
              <Caption>
                Redesign — Campaign creators, toast confirmation with Undo; invited cards update in
                place, no redirect
              </Caption>
            </div>
          </div>

          {/* 6 */}
          <div className="mt-[46px]">
            <H3>6. Campaign header condensed</H3>
            <div className="mt-[16px]">
              <P>
                The original stacked breadcrumb, title, subtitle, a standalone “Copy brief link”
                button, three pill-buttons (Budget/Clicks/Setup — two of which weren’t actually
                clickable despite looking like buttons), and a separate bordered status box: six
                visual blocks before any real content. Redesigned to two rows — title and live status
                share a row; brand, budget, click count, setup progress, and the copy-link action
                collapse into one quiet meta line below it, with icons and values instead of
                button-styled pills for facts that aren’t actions.
              </P>
            </div>
            <div className="mt-[30px] grid gap-[24px] md:grid-cols-2 md:gap-[40px]">
              <figure>
                <Shot src={`${IMG}/header-before.png`} alt="Campaign header before" w={580} h={306} />
                <Caption>Before</Caption>
              </figure>
              <figure>
                <Shot src={`${IMG}/header-after.png`} alt="Campaign header after" w={580} h={306} />
                <Caption>After</Caption>
              </figure>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="mt-[60px]">
          <H2>Reflection</H2>
          <div className="mt-[20px]">
            <P>
              The main trade-off in the redesign is explicit: the review-before-send panel adds one
              click to what used to be instant. That&apos;s a deliberate cost — an unreviewed message
              to a real person carries more risk than one extra click is worth avoiding.
            </P>
          </div>
          <blockquote className="mt-[22px] border-l-[5px] border-indigo bg-indigo/10 px-[24px] py-[24px] md:px-[38px] md:py-[30px]">
            <p className="text-[18px] font-semibold leading-[27px] text-slate-ink">
              With more time, the next thing I&apos;d go after is the brief editor — applying the same
              &quot;show the real thing, not raw formatting&quot; principle that shaped the rest of
              this redesign.
            </p>
          </blockquote>
          <div className="mt-[22px]">
            <P>
              ut the brief asked for one flow done properly over five done thinly, so that stayed a
              noted next step rather than a fourth thing attempted this pass.
            </P>
          </div>
        </section>

        {/* Closing */}
        <section className="relative mt-[60px] overflow-hidden rounded-[30px] bg-[#7c77ff] px-[24px] pt-[48px] pb-[48px] text-center md:px-[85px] md:pt-[60px] md:pb-[56px]">
          <Image
            aria-hidden
            src={`${IMG}/closing-art.png`}
            alt=""
            width={654}
            height={367}
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-[654px] object-cover lg:block"
          />
          <Image
            aria-hidden
            src={`${IMG}/closing-art.png`}
            alt=""
            width={654}
            height={367}
            className="pointer-events-none absolute left-[654px] top-0 hidden h-full w-[654px] object-cover lg:block"
          />
          <p className="relative mx-auto max-w-[1031px] font-display text-[22px] font-bold leading-[1.5] text-white md:text-[28px] md:leading-[42px]">
            Two creators selected. The message is already drafted, sitting right there, before it
            goes to a single real person. Edit a line, hit send, and the toast confirms it — no
            redirect, no wondering what just went out. That&apos;s the whole brief, solved.
          </p>
          <div className="relative mt-[36px] flex flex-wrap justify-center gap-[24px]">
            <Link
              href="/"
              className="btn-pop flex h-[49px] items-center rounded-full bg-white px-[25px] text-[16px] font-semibold text-slate-ink"
            >
              <span>Back to Home</span>
            </Link>
            <a
              href="#top"
              className="btn-pop flex h-[49px] items-center gap-[10px] rounded-full border border-white px-[25px] text-[16px] font-semibold text-white"
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

        {/* Footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
