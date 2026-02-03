import Link from "next/link";
import { ArrowUpRight, Sparkles, Zap, Cpu, Mail, Globe, FileText, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Zap,
    number: "01",
    title: "AI Automation & Workflows",
    description: "Intelligent systems that handle the repetitive work while you focus on what matters. Custom automations built for your exact business needs.",
    href: "/services/ai-automation",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Marketing Operations",
    description: "CRM cleanup, lifecycle journeys, and attribution readiness. We build the marketing infrastructure that scales.",
    href: "/services/marketing-operations",
    featured: true,
  },
  {
    icon: Mail,
    number: "03",
    title: "Email Campaign Automation",
    description: "Personalized campaigns that convert. From strategy to launch, we handle it all. Starting at $499 per campaign.",
    href: "/services/email-campaigns",
  },
  {
    icon: Cpu,
    number: "04",
    title: "AI Agents & Integrations",
    description: "Chatbots, support copilots, and content assistants that work 24/7. Seamlessly integrated with your existing stack.",
    href: "/services/ai-agents",
  },
  {
    icon: Globe,
    number: "05",
    title: "Website Design",
    description: "Conversion-focused websites with SEO foundations built in. Clean, fast, and designed to turn visitors into customers.",
    href: "/services/website-design",
  },
  {
    icon: FileText,
    number: "06",
    title: "Content Systems",
    description: "Newsletter, blog, and repurposing workflows. Create once, distribute everywhere with AI-powered efficiency.",
    href: "/services/content-systems",
  },
];

const results = [
  { value: "340%", label: "Revenue Growth", sublabel: "E-commerce Brand" },
  { value: "2.5x", label: "Lead Conversion", sublabel: "SaaS Startup" },
  { value: "80%", label: "Support Automated", sublabel: "Service Business" },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We dive deep into your business, tech stack, and goals. No cookie-cutter solutions here.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "A clear roadmap with priorities, timelines, and expected outcomes. You know exactly what to expect.",
  },
  {
    step: "03",
    title: "Build",
    description: "Weekly demos, transparent progress, and iterative refinement. You're involved every step.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description: "Go live with confidence. We stick around to optimize, train your team, and ensure success.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full Bleed Image Background */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Brand Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-lightbulb.jpg')" }}
        />

        {/* Gradient Overlays - Steel Grey */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18191D] via-[#18191D]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18191D]/85 via-transparent to-[#18191D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(24,25,29,0.5)_70%)]" />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid-lines" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl px-6 pt-24">
          {/* Pre-heading */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--amber-500)]" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[var(--amber-400)]">
              AI Automation Agency
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--amber-500)]" />
          </div>

          {/* Main Heading */}
          <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-bold leading-[0.9] tracking-tighter mb-4">
            <span className="block text-[var(--text-primary)]">FLYNERD</span>
            <span className="block gradient-text">TECH</span>
          </h1>

          {/* Tagline */}
          <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-light text-[var(--text-secondary)] tracking-wide mb-4 max-w-2xl mx-auto">
            Where Intelligence Meets Influence
          </p>

          {/* FLYNERD Acronym */}
          <p className="text-[clamp(0.65rem,1.2vw,0.8rem)] font-medium text-[var(--text-muted)] tracking-[0.15em] uppercase mb-10 max-w-xl mx-auto">
            <span className="text-[var(--amber-400)]">F</span>reethinking{" "}
            <span className="text-[var(--amber-400)]">L</span>ifestyle{" "}
            <span className="text-[var(--amber-400)]">Y</span>earners{" "}
            <span className="text-[var(--amber-400)]">N</span>avigating{" "}
            <span className="text-[var(--amber-400)]">E</span>very{" "}
            <span className="text-[var(--amber-400)]">R</span>elevant{" "}
            <span className="text-[var(--amber-400)]">D</span>omain
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            AI automation and systems design for businesses ready to scale.
            We build intelligent workflows that work while you sleep.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-primary px-8 py-4 pulse-glow">
              Book a Strategy Call
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/services" className="btn btn-ghost px-8 py-4 bg-[rgba(24,25,29,0.8)] backdrop-blur-sm border border-[var(--glass-border)]">
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] z-10">
          <div className="w-5 h-8 border border-[var(--amber-500)]/40 flex items-start justify-center p-1 bg-[rgba(24,25,29,0.6)] backdrop-blur-sm">
            <div className="w-0.5 h-2 bg-[var(--amber-400)] animate-bounce" />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-light leading-tight mb-8">
              This is not just an agency.<br />
              <span className="gradient-text">It&apos;s home for Freethinking Radicals.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              At FlyNerd, our mission is to <strong className="text-[var(--gold-400)]">inspire and elevate creative intellectuals</strong>.
              We believe that every system we build is an opportunity to refine our craft and learn.
              As practitioners and curators of creative culture, we draw inspiration from art, design, fashion, music, tech—and beyond.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              We are dedicated to <strong className="text-[var(--gold-400)]">pushing the boundaries of creativity and innovation</strong>,
              fostering a community that celebrates intellectual style and inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">Our Services</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-4 mb-4">
              Full-Spectrum <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              End-to-end AI systems designed to work together, scale infinitely, and evolve with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={`glass-card rounded-2xl p-8 group relative overflow-hidden ${service.featured ? "ring-2 ring-[var(--gold-500)]/30" : ""
                  }`}
              >
                {service.featured && (
                  <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--gold-400)] bg-[var(--gold-500)]/10 px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <span className="text-sm text-[var(--text-muted)] font-mono">{service.number}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-[var(--gold-400)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-[var(--gold-400)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">Results</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-4 mb-4">
              Outcomes That <span className="gradient-text">Speak</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, i) => (
              <div key={i} className="text-center glass-card rounded-2xl p-10">
                <div className="text-[clamp(3rem,8vw,5rem)] font-bold gradient-text leading-none mb-2">
                  {result.value}
                </div>
                <div className="text-lg font-medium text-white mb-1">{result.label}</div>
                <div className="text-sm text-[var(--text-muted)]">{result.sublabel}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/work" className="btn btn-ghost">
              View Case Studies <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">Our Process</span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-4 mb-4">
              How We <span className="gradient-text">Deliver</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-[var(--gold-500)]/10 absolute -top-4 -left-2">
                  {step.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,185,35,0.12)_0%,transparent_70%)] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(43,90,106,0.15)_0%,transparent_70%)] -translate-y-1/2" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mb-6">
              Ready to Build Something <span className="gradient-text">Exceptional</span>?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Let&apos;s discuss how we can architect AI systems that accelerate your business and create lasting competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                Book a Strategy Call
                <ArrowUpRight size={20} />
              </Link>
              <Link href="/pricing" className="btn btn-ghost text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
