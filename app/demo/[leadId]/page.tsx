import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MoveRight, CheckCircle2, Globe, ShieldCheck, Zap } from "lucide-react";

export default async function LeadDemoPage({ params }: { params: { leadId: string } }) {
  const { leadId } = params;

  const lead = await prisma.agencyLead.findUnique({
    where: { id: leadId },
  });

  if (!lead) {
    notFound();
  }

  const businessName = lead.businessName;
  const niche = lead.niche;
  const intelData = lead.intelData as any;
  const painPoints = intelData?.painPoints || ["low search visibility", "manual booking process"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-400 selection:text-black font-sans">
      {/* Premium Gradient Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center font-bold text-black border-2 border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            FN
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            FLYNERD <span className="text-yellow-400">DEMO</span>
          </span>
        </div>
        <Link 
          href={`mailto:hello@flynerd.tech?subject=Feedback on ${businessName} Demo`}
          className="bg-yellow-400 hover:bg-yellow-300 transition-all text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]"
        >
          CLAIM THIS SITE <MoveRight size={18} />
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-400 text-sm font-medium animate-pulse">
              <Zap size={14} /> EXCLUSIVE PREVIEW FOR {businessName.toUpperCase()}
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[1.1]">
              A New Era for <br />
              <span className="text-yellow-400 decoration-yellow-400/30 underline decoration-8 underline-offset-8">
                {businessName}
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              We took your business details and built a conversion-focused web portal designed specifically for {niche} professionals. No more generic templates — this is built to turn your local visibility into booked clients.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <Globe className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-bold text-lg mb-2 text-white">Hyper-Local SEO</h3>
                <p className="text-sm text-neutral-500">Optimized specifically for searches in your local service area.</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <ShieldCheck className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-bold text-lg mb-2 text-white">Trust Focused</h3>
                <p className="text-sm text-neutral-500">Built-in review widgets and trust markers for higher conversion.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-[2.5rem] blur-2xl group-hover:bg-yellow-400/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                {lead.walkthroughVideoUrl ? (
                  <iframe 
                    src={lead.walkthroughVideoUrl.replace("/share/", "/embed/")}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="autoplay"
                  />
                ) : (
                  <div className="text-center p-8 space-y-4">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <Zap className="text-yellow-400" size={32} />
                    </div>
                    <h3 className="font-bold text-xl">Personalized Walkthrough</h3>
                    <p className="text-neutral-500 text-sm">Our AI is finishing your custom video tour. Refresh in a moment.</p>
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

      {/* Pain Points Section */}
      <section className="bg-white/[0.02] py-24 border-y border-white/5 px-12">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">Current Audit Gaps</h2>
            <p className="text-neutral-400">We identified these critical areas where the new demo outperforms your current presence:</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {painPoints.map((point: string, i: number) => (
              <div key={i} className="flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 border border-white/5 hover:border-yellow-400/50 transition-colors shadow-lg shadow-black/20">
                <CheckCircle2 className="text-yellow-400" size={20} />
                <span className="font-semibold text-neutral-300">{point.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-12 text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
          Ready to dominate your <br /> 
          <span className="text-yellow-400">local market?</span>
        </h2>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          This demo is live and ready to be customized with your actual brand colors, testimonials, and booking links. We can have the full version launched in as little as 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
           <Link 
            href={`mailto:hello@flynerd.tech?subject=Launch ${businessName} Website`}
            className="bg-yellow-400 hover:bg-yellow-300 transition-all text-black font-extrabold px-12 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          >
            LAUNCH THIS SITE
          </Link>
          <Link 
            href="https://calendly.com/flynerd" 
            className="border-2 border-white/10 hover:border-white/30 transition-all px-12 py-5 rounded-full text-lg font-bold"
          >
            BOOK STRATEGY CALL
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-12 text-center text-neutral-600 text-sm tracking-widest uppercase">
        © 2026 Flynerd Tech AI Automation. All rights reserved.
      </footer>
    </div>
  );
}
