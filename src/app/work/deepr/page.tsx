import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Deepr — Case Study",
  description:
    "Every song you love has a whole world of people behind it. Most of them you'll never know their name.",
};

const IMG = "/deepr";

/* ---------- small building blocks ---------- */

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
        src={`${IMG}/asterisk.png`}
        alt=""
        width={24}
        height={24}
        className={light ? "h-[20px] w-[20px] object-contain brightness-0 invert" : "h-[24px] w-[24px] object-contain"}
      />
      <span
        className={
          light
            ? "text-[16px] font-medium uppercase leading-[24px] text-white"
            : "text-[18px] font-bold uppercase leading-[27px] text-blue-text"
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
  titleWidth = 461,
  children,
}: {
  tag: string;
  title: string;
  titleWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="card-hover rounded-[20px] border border-line-blue bg-surface p-[24px] md:p-[30px] md:pr-[35px]">
      <Tag>{tag}</Tag>
      <h3
        className="mt-[18px] font-display text-[22px] font-bold leading-[1.4] text-ink md:text-[28px] md:leading-[42px]"
        style={{ maxWidth: titleWidth }}
      >
        {title}
      </h3>
      <p className="mt-[16px] text-[18px] leading-[27px] text-ink-soft">
        {children}
      </p>
    </div>
  );
}

function Caption({ children }: { children: string }) {
  return (
    <p className="mt-[17px] text-center text-[16px] leading-[24px] text-ink-soft">
      {children}
    </p>
  );
}

// Figma "tv": black 1200x684 bezel, screen inset at 14.3,12.8 sized 1171x660.
// The screen is a looping prototype recording (converted from the Figma GIF).
function TvFrame({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  return (
    <div className="relative aspect-[1200/684] w-full overflow-hidden rounded-[20px] bg-black">
      <video
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute left-[1.195%] top-[1.873%] h-[96.45%] w-[97.61%] object-cover"
      />
    </div>
  );
}

/* ---------- page ---------- */

export default function DeeprPage() {
  return (
    <main id="top" className="min-h-screen bg-bg pb-[106px]">
      <Nav active="Work" />

      <div className="mx-auto w-full max-w-[1200px] px-6 xl:px-0">
        {/* Hero */}
        <section className="mt-[81px] overflow-hidden rounded-[30px] bg-blue">
          <div className="relative flex min-h-[304px] flex-col items-center px-6 pt-[43px] pb-[30px] text-center">
            <Image
              aria-hidden
              src={`${IMG}/hero-notes.png`}
              alt=""
              fill
              className="pointer-events-none object-cover"
              sizes="1200px"
              priority
            />
            <Image
              src={`${IMG}/deepr-logo.png`}
              alt="Deepr"
              width={150}
              height={43}
              className="relative h-[43px] w-[150px] object-contain"
              priority
            />
            <h1 className="relative mt-[16px] max-w-[952px] font-display text-[26px] font-bold leading-[1.4] text-white md:text-[38px] md:leading-[57px]">
              Every song you love has a whole world of people behind it. Most of
              them you&apos;ll never know their name.
            </h1>
          </div>
          <div className="flex min-h-[127px] flex-col items-center bg-blue-band px-6 pt-[22px] pb-[22px] md:pb-0">
            <p className="text-[14px] uppercase leading-[21px] tracking-[0.98px] text-white">
              company backed by
            </p>
            <div className="mt-[16px] flex flex-wrap items-center justify-center gap-x-[47px] gap-y-4">
              <Image
                src={`${IMG}/backer-a16z.png`}
                alt="a16z Talent x Opportunity"
                width={128}
                height={46}
                className="h-[46px] w-auto"
              />
              <Image
                src={`${IMG}/backer-google.png`}
                alt="Google for Startups"
                width={197}
                height={25}
                className="h-[25px] w-auto"
              />
              <Image
                src={`${IMG}/backer-apple.png`}
                alt="Apple"
                width={38}
                height={46}
                className="h-[46px] w-auto"
              />
              <Image
                src={`${IMG}/backer-allblk.png`}
                alt="ALLBLK"
                width={97}
                height={46}
                className="h-[46px] w-auto"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-[30px] grid grid-cols-1 gap-y-6 rounded-[20px] border border-line bg-surface py-[28px] sm:grid-cols-2 md:gap-y-0 md:py-[38px] md:grid-cols-[327fr_287fr_299fr_287fr]">
          {[
            ["My Role", "Solo Designer — End to End"],
            ["Surfaces", "7 platforms designed"],
            ["Stack", "iOS · Web Widgets · TV"],
            ["Status", "Concept — Unreleased"],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`py-[3px] pr-[20px] ${i > 0 ? "pl-[24px] md:pl-[52px] md:border-l md:border-line" : "pl-[24px] md:pl-[38px]"}`}
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

        {/* 01 — The Problem */}
        <section className="mt-[80px]">
          <Eyebrow>01 — The Problem</Eyebrow>
          <Heading>
            Music credits are buried.
            <br />
            The people who make songs are invisible.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[14px]">
            <Body>
              Open Spotify. Play your favourite song. Now try to find out who
              produced it. Who played bass. Who co-wrote the hook. You might find
              a songwriter credit buried three taps deep — if you know where to
              look. Most people don&apos;t, and most platforms don&apos;t make
              it easy.
            </Body>
            <Body>
              This isn&apos;t a minor inconvenience. It&apos;s a systemic
              problem. Producers, session musicians, mixing engineers, and
              co-writers are the invisible workforce behind every song you love.
              They have no discovery surface. No profile page a fan can stumble
              onto. No way for a casual listener to go from &quot;I love this
              beat&quot; to &quot;who made this beat?&quot;
            </Body>
            <Body>
              This is the problem I was brought in to solve. As the designer on
              this engagement, I was responsible for turning dense, inaccessible
              music industry metadata into experiences that real people would
              actually want to explore — across seven different surfaces, each
              with its own constraints, conventions, and user expectations. The
              work below covers the full concept: research, flows, and
              high-fidelity screens I designed and presented to the product
              team. Not every piece of it made it into the app you can download
              today, but the thinking and the screens are real design work, done
              for a real product.
            </Body>
          </div>
          <blockquote className="mt-[30px] rounded-r-[36px] border-l-[5px] border-blue bg-blue-tint pl-[24px] pr-[24px] pt-[30px] pb-[30px] md:pl-[36px] md:pr-[113px] md:pt-[41px] md:pb-[40px]">
            <p className="font-display text-[22px] font-bold leading-[1.5] text-blue-text md:text-[28px] md:leading-[42px]">
              How do you make people care about information they&apos;ve never
              even known existed — and do it across seven completely different
              platforms without forcing a single visual language on any of them?
            </p>
          </blockquote>
        </section>

        {/* 02 — Who I Was Designing For */}
        <section className="mt-[80px]">
          <div className="max-w-[753px]">
            <Eyebrow>02 — Who I Was Designing For</Eyebrow>
            <Heading>
              Two audiences.
              <br />
              One shared curiosity.
            </Heading>
            <div className="mt-[10px]">
              <Body>
                Deepr has two distinct user types — and the design challenge was
                that they have completely different entry points into the same
                information.
              </Body>
            </div>
          </div>
          <div className="mt-[30px] grid gap-[20px] md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[20px] bg-blue-tint p-[24px] md:h-[524px] md:p-[30px]">
              <h3 className="font-display text-[28px] font-bold leading-[42px] text-ink">
                The Curious Listener
              </h3>
              <p className="mt-[22px] max-w-[298px] text-[18px] leading-[27px] text-ink-soft">
                They love music but have never thought about who produced it.
                They don&apos;t know what an ASCAP publisher is. They&apos;ve
                never heard the term &quot;session musician.&quot; But
                they&apos;re curious — if you show them something interesting,
                they&apos;ll explore it. The design has to create that
                curiosity, not assume it exists.
              </p>
              <Image
                src={`${IMG}/persona-listener.png`}
                alt="Illustration of a listener wearing headphones"
                width={315}
                height={330}
                className="mx-auto mt-6 h-[330px] w-[315px] max-w-full object-contain md:absolute md:left-[257px] md:top-[194px] md:mt-0"
              />
            </div>
            <div className="relative overflow-hidden rounded-[20px] bg-blue-tint p-[24px] md:h-[524px] md:p-[30px]">
              <h3 className="font-display text-[28px] font-bold leading-[42px] text-ink">
                The Industry Insider
              </h3>
              <p className="mt-[22px] max-w-[298px] text-[18px] leading-[27px] text-ink-soft">
                Producers, engineers, session musicians. They know credits exist
                — they just can&apos;t get discovered through them. For them,
                Deepr isn&apos;t about exploration; it&apos;s about visibility.
                Their work finally has a surface. They need profiles,
                connections, and the ability to be found.
              </p>
              <Image
                src={`${IMG}/persona-insider.png`}
                alt="Illustration of a musician playing guitar"
                width={230}
                height={379}
                className="mx-auto mt-6 h-[379px] w-[230px] max-w-full object-contain md:absolute md:left-[333px] md:top-[145px] md:mt-0"
              />
            </div>
          </div>
        </section>

        {/* 03 — The Netflix Widget */}
        <section className="mt-[80px]">
          <Eyebrow>03 — The Netflix Widget</Eyebrow>
          <Heading>
            Invisible until you need it.
            <br />
            Undeniable when you do.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              Deepr needed a way to surface music credits while users watch
              content — without ever leaving the streaming platform. I chose
              Netflix as the first integration target because of its
              music-heavy catalogue. The constraint I set for myself was
              extreme:{" "}
              <strong className="font-semibold text-ink">
                you cannot interrupt the viewing experience.
              </strong>{" "}
              The widget has to exist within Netflix&apos;s interface without
              looking like it doesn&apos;t belong, and it has to add value
              without demanding attention.
            </Body>
            <Body>
              I designed a quiet pill button in the corner of the Netflix
              player. When tapped, a panel slides in from the right — listing
              every song in the content, with expandable credits, a QR code to
              save songs to your phone, and a deliberate sponsored slot
              (Deepr&apos;s B2B revenue model). The panel never covers the
              video. The user never leaves Netflix.
            </Body>
          </div>
          <div className="mt-[30px]">
            <TvFrame
              src={`${IMG}/video/tv-netflix.mp4`}
              poster={`${IMG}/tv-netflix.png`}
              alt="Netflix player showing the Go Deepr button beside Play and More Info"
            />
          </div>
          <Caption>High Fidelity Prototype of Netflix Widget</Caption>
          <div className="mt-[40px] grid gap-[30px] md:grid-cols-2">
            <KeyCard
              tag="Key Design Decision"
              title="The button that belongs in the controls"
            >
              The &quot;Go Deepr&quot; button sits inside Netflix&apos;s native
              playback controls bar, the same row as play, skip, volume, and
              fullscreen. It doesn&apos;t float on top of the video or interrupt
              the frame. It&apos;s styled as a compact red pill with a small
              circular icon, sized and weighted to match the surrounding native
              controls rather than standing out from them. The moment
              you&apos;re curious about a song, the moment you think &quot;what
              was that track?&quot; — it&apos;s right there, exactly where a
              native Netflix control would be. That restraint was the hardest
              part of this design.
            </KeyCard>
            <KeyCard tag="B2B Model" title="The sponsored takeover" titleWidth={310}>
              This is how Deepr makes money as a B2B product, but I designed the
              sponsorship to feel like part of the experience, not an ad bolted
              onto it. When a brand sponsors a title&apos;s music panel, the
              entire panel header becomes theirs: &quot;This Experience Is
              Sponsored By,&quot; their logo, and a full-width lifestyle image
              that sets the tone before a single song is shown. It&apos;s a real
              estate trade, the brand gets a premium, unmissable placement, and
              in return the panel underneath stays completely clean. No banner
              ads wedged between songs, no interruptions mid-scroll. One honest,
              upfront placement instead of a dozen small annoying ones.
            </KeyCard>
          </div>
        </section>

        {/* 04 — YouTube TV Widget */}
        <section className="mt-[80px]">
          <Eyebrow>04 — YouTube TV Widget</Eyebrow>
          <Heading>
            TV is a louder platform.
            <br />
            The widget had to adapt.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              YouTube TV lives on a television, controlled by a remote with a
              D-pad and a handful of buttons. Every assumption I&apos;d made
              designing for Netflix had to be rebuilt for a platform where the
              user can point and click, but can&apos;t type, can&apos;t
              pinch-to-zoom, and is sitting eight feet from the screen instead
              of holding it in their hand.
            </Body>
            <Body>
              The entry point sits inside YouTube TV&apos;s own playback bar,
              next to Networks, Episodes, and More to Watch — a &quot;Episode 3
              Playlist&quot; control with an eye icon. Selecting it doesn&apos;t
              cover the video; it pillarboxes it down to make room for the panel
              sliding in from the right, exactly like a native TV app would
              behave.
            </Body>
          </div>
          <div className="mt-[30px]">
            <TvFrame
              src={`${IMG}/video/tv-youtube.mp4`}
              poster={`${IMG}/tv-youtube.png`}
              alt="YouTube TV player showing the Episode 3 playlist control"
            />
          </div>
          <Caption>High Fidelity Prototype of Youtube TV</Caption>
          <div className="mt-[40px] grid gap-[30px] md:grid-cols-2">
            <KeyCard tag="Key Design Decision" title="The Hide/Show Video toggle">
              When a song starts playing, its album art expands to fill the
              space above the playlist — and a &quot;Hide Video&quot; control
              appears, letting the viewer collapse the show entirely to focus on
              the music. Tap it again and &quot;Show Video&quot; brings the
              episode back. On a phone, the video and the credits can coexist in
              separate panes. On a TV, they&apos;re fighting for the same
              limited real estate, so I gave the viewer the choice instead of
              deciding for them.
            </KeyCard>
            <KeyCard tag="Sponsor Rotation" title="The takeover adapts per session" titleWidth={358}>
              The same sponsored-takeover pattern from Netflix carries over here
              — but on TV I designed it to rotate. One session opens with
              Coca-Cola branding the header and a banner beneath the
              mini-player; browse into an artist&apos;s profile and the sponsor
              can shift to McDonald&apos;s, complete with its own offer banner.
              The panel&apos;s structure stays identical regardless of
              who&apos;s sponsoring it — only the brand assets swap.
            </KeyCard>
          </div>
          <div className="mt-[38px]">
            <Body>
              Tapping into a song goes one level deeper —{" "}
              <strong className="font-semibold text-ink">
                &quot;All Musicians Present In The Song&quot;
              </strong>{" "}
              — a stacked list of every contributor and their role: Band,
              Produced By, Written By. Tapping any of them opens a full profile,
              with a photo and a short bio, the same &quot;character&quot;
              treatment as the iOS app. This is where the initials-avatar
              fallback earns its keep: not every session musician has a profile
              photo on file, so contributors without one get a clean circular
              initials badge instead of a broken image or a blank silhouette —
              visible in the flow as &quot;SK&quot; for a producer named Sonny
              Kilfoyle.
            </Body>
          </div>
          <div className="mt-[30px] rounded-[20px] border border-line-blue bg-blue px-[24px] py-[28px] md:px-[30px] md:py-[32px]">
            <Tag light>Solving a TV-Specific Problem</Tag>
            <h3 className="mt-[15px] font-display text-[22px] font-bold leading-[1.4] text-white md:text-[28px] md:leading-[42px]">
              Typing with a remote is painful. So: a QR code.
            </h3>
            <p className="mt-[10px] max-w-[1064px] text-[18px] leading-[27px] text-white/70">
              Saving a playlist is trivial on a phone — tap a button, it&apos;s
              in your library. On TV, there&apos;s no keyboard, no sign-in flow
              that doesn&apos;t feel painful with a D-pad. So the &quot;Save
              This Playlist&quot; action on TV doesn&apos;t try to save anything
              on the TV at all. It generates a QR code with the playlist name
              and duration, and a simple instruction: &quot;Save the QR code
              above to open and save this playlist in YouTube.&quot; The viewer
              scans it with the phone already in their hand, and the save
              happens where saving is actually easy. Designing for TV meant
              recognising which actions belong on the TV and which ones should
              just hand off to a better-suited device.
            </p>
          </div>
        </section>

        {/* 05 — Connects */}
        <section className="mt-[117px]">
          <Eyebrow>05 — Connects</Eyebrow>
          <Heading>
            Don&apos;t just show who made it.
            <br />
            Let people reach them.
          </Heading>
          <div className="mt-[15px] flex flex-col gap-[15px]">
            <Body>
              Turning credits into profiles solves discovery — now you know who
              made the song. But Deepr&apos;s insider users don&apos;t just want
              to be found, they want to be reachable. So I designed Connects: a
              feature that lets anyone browse every credit on a song and message
              the people behind it directly, without leaving the app.
            </Body>
            <Body>
              While a song plays, the mini-player collapses into the background
              and a &quot;Select Credits to Browse&quot; grid appears underneath
              it — every contributor on that track as a tappable avatar card:
              the artist, the album, the release year, every writer, producer,
              mixer, and mastering engineer. Multiple credits can be selected at
              once, turning a single song into a jumping-off point for exploring
              an entire team of people.
            </Body>
          </div>
          {/* Phone exports carry their drop shadow (376x732); bodies sit at 78.5,15 inside */}
          <div className="relative mt-[40px] overflow-hidden rounded-[20px] bg-surface xl:h-[584px]">
            {/* small screens: crop each export (shadow padding) down to the phone body */}
            <div className="grid grid-cols-2 justify-items-center gap-4 px-4 py-8 sm:grid-cols-4 xl:hidden">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[220/462] w-full max-w-[220px] overflow-hidden">
                  <Image
                    src={`${IMG}/phone-connects-${n}.png`}
                    alt={`Connects flow screen ${n}`}
                    width={376}
                    height={732}
                    className="-ml-[35.7%] -mt-[6.8%] h-auto w-[171.2%] max-w-none"
                  />
                </div>
              ))}
            </div>
            {[85, 355, 625, 895].map((x, i) => (
              <Image
                key={x}
                src={`${IMG}/phone-connects-${i + 1}.png`}
                alt=""
                aria-hidden
                width={376}
                height={732}
                className="absolute top-[55px] hidden h-[732px] w-[376.5px] max-w-none xl:block"
                style={{ left: x - 78.5 }}
              />
            ))}
          </div>
          <Caption>High Fidelity Connects UI flow</Caption>
          <div className="mt-[50px] grid gap-[30px] md:grid-cols-2">
            <KeyCard
              tag="Key Design Decision"
              title="Browse by role, not by wall of names"
            >
              A profile like Avery Lipman&apos;s — a record label executive with
              96 songs and 53 collaborators to his name — could easily become an
              overwhelming wall of credits. I added role filters (All, Artist,
              Writer, Producer) right below the profile header so the same
              profile serves a casual browser and a specialist trying to find
              every producer credit equally well.
            </KeyCard>
            <KeyCard
              tag="Real-World Use Case"
              title="A&R scouting, built into the product"
              titleWidth={358}
            >
              The messaging screens in this flow show a genuine industry use
              case: an executive telling a colleague &quot;I found a young
              songwriter who&apos;d be a great addition to the family,&quot; and
              the reply — &quot;Send me their Deepr profile.&quot; That single
              exchange is the clearest proof of Deepr&apos;s value to insiders:
              credits aren&apos;t just historical metadata here, they&apos;re a
              live talent-discovery and networking layer for the music
              industry.
            </KeyCard>
          </div>
        </section>

        {/* 06 — Platform Integrations */}
        <section className="mt-[80px]">
          <Eyebrow>06 — Platform Integrations</Eyebrow>
          <Heading>Context beats consistency. Every time.</Heading>
          <div className="mt-[15px] flex flex-col gap-[10px]">
            <Body>
              This is the design principle I&apos;m most proud of from Deepr.
              When we integrated into four streaming platforms, the instinct was
              to create one visual language and apply it everywhere. Consistent
              brand identity. Same colours, same components, same layout.
              That&apos;s what most companies do.
            </Body>
            <Body>
              I did the opposite. Deepr takes on each platform&apos;s visual
              language — its colours, its spacing, its conventions — and adapts.
              On YouTube Music, Deepr is dark red. On YouTube, it lives inside
              the existing Details tab. On APEX, it&apos;s the richest
              experience with credits, concerts, merch, and reviews. On Amazon
              Music, it&apos;s the most restrained — a subtle expandable section
              that matches Amazon&apos;s conservative UI.
            </Body>
            <Body>
              The result: Deepr never feels like a third-party plugin. It feels
              like a feature the platform always should have had.
            </Body>
          </div>
          <div className="mt-[46px] grid grid-cols-1 gap-y-[40px] rounded-[20px] bg-surface px-[20px] pt-[40px] pb-[40px] sm:grid-cols-2 md:grid-cols-4 md:px-[30px] md:pt-[50px] md:pb-[50px]">
            {[
              ["YouTube Music", "phone-ytmusic", true],
              ["YouTube", "phone-youtube", false],
              ["Apex Music", "phone-apex", false],
              ["Amazon Music", "phone-amazon", false],
            ].map(([name, file, hasVideo]) => (
              <div key={name as string} className="flex flex-col items-center">
                <h3 className="font-display text-[28px] font-bold leading-[42px] text-ink">
                  {name}
                </h3>
                {hasVideo ? (
                  <video
                    src={`${IMG}/video/${file}.mp4`}
                    poster={`${IMG}/${file}.png`}
                    aria-label={`Deepr inside ${name}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    className="mt-[14px] h-[405px] w-[200px] rounded-[30px] object-cover"
                  />
                ) : (
                  <Image
                    src={`${IMG}/${file}.png`}
                    alt={`Deepr inside ${name}`}
                    width={200}
                    height={408}
                    className="mt-[14px] h-[408px] w-[200px] object-contain"
                  />
                )}
              </div>
            ))}
          </div>
          <Caption>High Fidelity Prototype of 4 different platform</Caption>
        </section>

        {/* 07 — The Why Behind the What */}
        <section className="mt-[80px]">
          <div className="max-w-[775px]">
            <Eyebrow>07 — The Why Behind the What</Eyebrow>
            <h2 className="mt-[10px] font-display text-[26px] font-bold leading-[1.35] text-ink md:text-[32px] md:leading-[48px]">
              Three principles that defined Deepr&apos;s design.
            </h2>
          </div>
          <div className="mt-[50px] grid gap-[20px] md:mt-[70px] md:grid-cols-3">
            {[
              {
                n: "01",
                tag: "Core principle",
                title: "Language is design",
                body: (
                  <>
                    &quot;ASCAP Publisher&quot; → &quot;Executive
                    Producer.&quot; &quot;Mix Engineer (rec.)&quot; →
                    &quot;Mixed this track.&quot; The single biggest impact I
                    had on Deepr wasn&apos;t a layout or a colour choice — it was
                    rewriting every credit label in plain language. When the
                    words are right, the interface barely needs to exist.
                  </>
                ),
              },
              {
                n: "02",
                tag: "Multi-platform strategy",
                title: "Context beats consistency",
                body: (
                  <>
                    Deepr looks different on every platform it touches — and
                    that&apos;s the point. YouTube Music&apos;s dark red,
                    Amazon&apos;s restraint, APEX&apos;s richness. The product
                    adapts to where it lives rather than forcing brand
                    consistency. The result: it always feels native, never
                    alien.
                  </>
                ),
              },
              {
                n: "03",
                tag: "Interaction philosophy",
                title: "No dead ends, ever",
                body: (
                  <>
                    Every element in Deepr leads somewhere. Every credit leads to
                    a profile. Every profile leads to a discography. Every song
                    leads to more credits. The entire product is a web of
                    connections. If a user hits a screen with nothing to tap,
                    the design has failed.
                  </>
                ),
              },
            ].map((p) => (
              <div key={p.n} className="relative pt-[56px]">
                <Image
                  aria-hidden
                  src={`${IMG}/num-${p.n}.png`}
                  alt=""
                  width={254}
                  height={90}
                  className="pointer-events-none absolute left-[26px] top-0 h-[90px] w-[254px] select-none object-contain object-left-top"
                />
                <div className="relative min-h-[371px] rounded-[20px] bg-blue-deep px-[26px] pt-[30px] pb-[30px]">
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src={`${IMG}/asterisk.png`}
                      alt=""
                      width={20}
                      height={20}
                      className="h-[20px] w-[20px] object-contain brightness-0 invert"
                    />
                    <span className="text-[16px] font-bold uppercase leading-[24px] text-white">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-[10px] font-display text-[26px] font-bold leading-[39px] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-[10px] text-[18px] leading-[27px] text-white/70">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08 — The Outcome */}
        <section className="mt-[80px]">
          <Eyebrow>08 — The Outcome</Eyebrow>
          <Heading>
            Designed end to end.
            <br />
            Presented across seven surfaces.
          </Heading>
          <div className="mt-[15px]">
            <Body>
              This concept work covers the full scope, from research to
              high-fidelity screens, across every surface Deepr&apos;s music
              discovery experience could touch. I designed every screen, every
              widget, every platform integration, and every interaction from
              scratch and presented them to the product team. Deepr itself is a
              live, real product — this case study documents the design thinking
              behind a body of work I did for it, not a claim that every screen
              shown here shipped as-is.
            </Body>
          </div>
          <div className="mt-[38px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-4">
            {[
              ["icon-7", "Surfaces designed — iOS, Netflix, YouTube TV, YTM, YouTube, APEX, Amazon"],
              ["icon-concept", "Concept — full flows & hi-fi screens, unreleased"],
              ["icon-4", "Backers of Deepr — a16z, Google, Apple, ALLBLK"],
              ["icon-1", "Designer — end to end, every surface, every pixel"],
            ].map(([icon, text]) => (
              <div
                key={icon}
                className="flex min-h-[227px] flex-col items-center rounded-[20px] border border-tile-line bg-tile px-[32px] pt-[34px] pb-[30px]"
              >
                <Image
                  src={`${IMG}/${icon}.png`}
                  alt=""
                  width={60}
                  height={60}
                  className="h-[60px] w-[60px] object-contain"
                />
                <p className="mt-[19px] text-center text-[18px] font-medium leading-[27px] text-blue-tile-text">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing quote */}
        <section className="relative mt-[80px] overflow-hidden rounded-[20px] bg-blue px-[24px] pt-[48px] pb-[48px] text-center md:px-[85px] md:pt-[65px] md:pb-[65px]">
          <Image
            aria-hidden
            src={`${IMG}/quote-notes.png`}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="1200px"
          />
          <p className="relative mx-auto max-w-[1030px] font-display text-[24px] font-bold leading-[1.5] text-white md:text-[32px] md:leading-[48px]">
            &quot;Deepr taught me that the hardest design problem isn&apos;t
            making something look good — it&apos;s making something{" "}
            <span className="text-white">invisible</span> feel important
            enough to explore.&quot;
          </p>
          <div className="relative mt-[30px] flex flex-wrap justify-center gap-[24px]">
            <Link
              href="/work/8x"
              className="btn-pop flex h-[49px] items-center rounded-full bg-orange px-[25px] text-[16px] font-semibold text-white"
            >
              <span>Next Case Study: 8x</span>
            </Link>
            <a
              href="#top"
              className="btn-pop flex h-[49px] items-center gap-[10px] rounded-full bg-white px-[25px] text-[16px] font-semibold text-orange"
            >
              <Image
                src={`${IMG}/back-to-top.svg`}
                alt=""
                width={18}
                height={17}
                className="h-[17px] w-[18px]"
              />
              <span>Back to Top</span>
            </a>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
