import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Globe, ShieldCheck, Zap, Lock } from "lucide-react";
import DelayedCTA from "@/components/demo/DelayedCTA";

export default async function LeadDemoPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;

  const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
  if (!lead) notFound();

  const businessName = lead.businessName;
  const niche = lead.niche;
  const intelData = lead.intelData as any;
  const painPoints: string[] =
    intelData?.painPoints || ["low search visibility", "manual booking process"];
  const socialProofPoints: string[] = intelData?.socialProofPoints || [];
  const operatingContext: string = intelData?.operatingContext || "";

  // ── Brand Colors from Intel Agent ────────────────────────────────────────
  const brandColors = intelData?.brandColors || {};
  const accentColor: string = brandColors.accent || "#fbbf24";
  const primaryColor: string = brandColors.primary || "#0a0a0a";

  // ── Expiry Check ─────────────────────────────────────────────────────────
  const isExpired =
    lead.validUntil != null && new Date() > new Date(lead.validUntil);

  if (isExpired) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white text-center px-8 gap-8"
        style={{ background: primaryColor }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: `${accentColor}44`, background: `${accentColor}11` }}
        >
          <Lock size={36} style={{ color: accentColor }} />
        </div>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-4xl font-black tracking-tight">
            This Preview Has Expired
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            The exclusive 7-day demo for{" "}
            <span className="font-bold text-white">{businessName}</span> is no
            longer active. Request a fresh access link below.
          </p>
        </div>
        <Link
          href={`mailto:hello@flynerd.tech?subject=New Access Request — ${businessName}`}
          className="font-extrabold px-10 py-4 rounded-full text-base transition-all"
          style={{
            background: accentColor,
            color: primaryColor,
            boxShadow: `0 0 24px ${accentColor}55`,
          }}
        >
          REQUEST NEW ACCESS
        </Link>
        <p className="text-xs text-neutral-600 tracking-widest uppercase">
          © 2026 Flynerd Tech AI Automation
        </p>
      </div>
    );
  }

  // ── Time Remaining Badge ──────────────────────────────────────────────────
  let expiresLabel: string | null = null;
  if (lead.validUntil) {
    const hoursLeft = Math.max(
      0,
      Math.ceil(
        (new Date(lead.validUntil).getTime() - Date.now()) / (1000 * 60 * 60)
      )
    );
    expiresLabel = hoursLeft > 0 ? `Expires in ${hoursLeft}h` : "Expiring soon";
  }

  return (
    <div
      className="min-h-screen text-white selection:text-black font-sans"
      style={
        {
          background: "#0a0a0a",
          "--brand-primary": primaryColor,
          "--brand-accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold border-2 shadow-lg"
            style={{
              background: accentColor,
              borderColor: accentColor,
              color: primaryColor,
              boxShadow: `0 0 15px ${accentColor}55`,
            }}
          >
            FN
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            FLYNERD{" "}
            <span style={{ color: accentColor }}>DEMO</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {expiresLabel && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                borderColor: `${accentColor}44`,
                color: accentColor,
                background: `${accentColor}11`,
              }}
            >
              {expiresLabel}
            </span>
          )}
          <Link
            href={`mailto:hello@flynerd.tech?subject=Feedback on ${businessName} Demo`}
            className="font-bold px-8 py-3 rounded-full flex items-center gap-2 text-sm transition-all"
            style={{
              background: accentColor,
              color: primaryColor,
              boxShadow: `0 0 20px ${accentColor}33`,
            }}
          >
            CLAIM THIS SITE
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-48 pb-24 px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium animate-pulse"
              style={{
                borderColor: `${accentColor}44`,
                background: `${accentColor}0d`,
                color: accentColor,
              }}
            >
              <Zap size={14} /> EXCLUSIVE PREVIEW FOR {businessName.toUpperCase()}
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[1.1]">
              A New Era for <br />
              <span
                className="underline decoration-8 underline-offset-8"
                style={{
                  color: accentColor,
                  textDecorationColor: `${accentColor}55`,
                }}
              >
                {businessName}
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              {operatingContext
                ? `${operatingContext} We built a conversion-focused web portal designed specifically for ${niche} professionals — turning local visibility into booked clients.`
                : `We took your business details and built a conversion-focused web portal designed specifically for ${niche} professionals. No more generic templates — this is built to turn your local visibility into booked clients.`}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <Globe
                  className="mb-4 group-hover:scale-110 transition-transform"
                  size={28}
                  style={{ color: accentColor }}
                />
                <h3 className="font-bold text-lg mb-2 text-white">Hyper-Local SEO</h3>
                <p className="text-sm text-neutral-500">
                  Optimized specifically for searches in your local service area.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <ShieldCheck
                  className="mb-4 group-hover:scale-110 transition-transform"
                  size={28}
                  style={{ color: accentColor }}
                />
                <h3 className="font-bold text-lg mb-2 text-white">Trust Focused</h3>
                <p className="text-sm text-neutral-500">
                  Built-in review widgets and trust markers for higher conversion.
                </p>
              </div>
            </div>
          </div>

          {/* ── Video Panel ──────────────────────────────────────────────── */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative group">
              <div
                className="absolute -inset-4 rounded-[2.5rem] blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `${accentColor}33` }}
              />
              <div className="relative rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                {lead.walkthroughVideoUrl ? (
                  lead.walkthroughVideoUrl.includes(".mp4") ? (
                    <video
                      src={lead.walkthroughVideoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={
                        lead.walkthroughVideoUrl.includes("/share/")
                          ? lead.walkthroughVideoUrl.replace("/share/", "/embed/")
                          : lead.walkthroughVideoUrl
                      }
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="autoplay"
                    />
                  )
                ) : (
                  <div className="text-center p-8 space-y-4">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <Zap size={32} style={{ color: accentColor }} />
                    </div>
                    <h3 className="font-bold text-xl">Personalized Walkthrough</h3>
                    <p className="text-neutral-500 text-sm">
                      Our AI is finishing your custom video tour. Refresh in a moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-neutral-500 tracking-widest uppercase">
              Video Walkthrough • Tailored specifically for {businessName}
            </p>
          </div>
        </div>
      </section>

      {/* ── Pain Points ─────────────────────────────────────────────────── */}
      <section className="bg-white/[0.02] py-24 border-y border-white/5 px-12">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Current Audit Gaps
            </h2>
            <p className="text-neutral-400">
              We identified these critical areas where the new demo outperforms
              your current presence:
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {painPoints.map((point: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 border border-white/5 hover:border-opacity-50 transition-colors shadow-lg shadow-black/20"
                style={
                  { "--tw-border-opacity": 1 } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    `${accentColor}80`)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.05)")
                }
              >
                <CheckCircle2 size={20} style={{ color: accentColor }} />
                <span className="font-semibold text-neutral-300">
                  {point.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ────────────────────────────────────────────────── */}
      {socialProofPoints.length > 0 && (
        <section className="py-24 px-12">
          <div className="max-w-7xl mx-auto space-y-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              What Customers Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialProofPoints.map((snippet: string, i: number) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] text-left space-y-4"
                >
                  <div
                    className="text-2xl font-black"
                    style={{ color: accentColor }}
                  >
                    "
                  </div>
                  <p className="text-neutral-300 italic leading-relaxed">
                    {snippet}
                  </p>
                  <div
                    className="h-px w-12"
                    style={{ background: `${accentColor}44` }}
                  />
                  <p className="text-xs text-neutral-600 tracking-widest uppercase">
                    Verified Review
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA (delayed reveal via client island) ──────────────────────── */}
      <section className="py-32 px-12 text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
          Ready to dominate your <br />
          <span style={{ color: accentColor }}>local market?</span>
        </h2>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          This demo is live and ready to be customized with your actual brand
          colors, testimonials, and booking links. We can have the full version
          launched in as little as 7 days.
        </p>
        {/* Client island — handles the 15s delay + brand pulse */}
        <DelayedCTA
          businessName={businessName}
          demoSiteUrl={lead.demoSiteUrl}
          delayMs={15000}
          accentColor={accentColor}
          primaryColor={primaryColor}
        />
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-12 text-center text-neutral-600 text-sm tracking-widest uppercase">
        © 2026 Flynerd Tech AI Automation. All rights reserved.
      </footer>
    </div>
  );
}