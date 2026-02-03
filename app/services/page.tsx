import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Zap, Sparkles, Mail, Cpu, Globe, FileText, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Services",
    description: "AI automation, marketing operations, email campaigns, AI agents, website design, and content systems. Full-spectrum solutions for growing businesses.",
};

const services = [
    {
        slug: "ai-automation",
        icon: Zap,
        title: "AI Automation & Workflow Design",
        tagline: "Work smarter, not harder",
        description: "Intelligent systems that handle the repetitive work while you focus on what matters. Custom automations built for your exact business needs.",
        features: [
            "Custom workflow automation",
            "Process optimization audits",
            "Tool integration (Make.com, Zapier, n8n)",
            "AI-powered decision logic",
            "Performance monitoring dashboards",
        ],
        startingAt: "Custom",
    },
    {
        slug: "marketing-operations",
        icon: Sparkles,
        title: "Marketing Operations & CRM",
        tagline: "The foundation that scales",
        description: "CRM cleanup, lifecycle journeys, and attribution readiness. We build the marketing infrastructure that scales with your growth.",
        features: [
            "CRM data cleanup & migration",
            "Lifecycle journey mapping",
            "Lead scoring automation",
            "Attribution modeling",
            "Marketing analytics setup",
        ],
        startingAt: "$2,500",
        featured: true,
    },
    {
        slug: "email-campaigns",
        icon: Mail,
        title: "Personalized Email Campaigns",
        tagline: "Campaigns that convert",
        description: "From strategy to launch, we handle it all. Audience segmentation, AI-powered copy, A/B testing, and performance tracking.",
        features: [
            "Strategy & consultation",
            "Audience segmentation",
            "AI-assisted copywriting",
            "ActiveCampaign setup",
            "Performance tracking & optimization",
        ],
        startingAt: "$499",
        popular: true,
    },
    {
        slug: "ai-agents",
        icon: Cpu,
        title: "AI Agents & Integrations",
        tagline: "24/7 intelligent assistants",
        description: "Chatbots, support copilots, and content assistants that work around the clock. Seamlessly integrated with Shopify, Wix, Slack, and more.",
        features: [
            "Custom chatbot development",
            "Support ticket automation",
            "Lead qualification agents",
            "Content generation assistants",
            "Multi-platform integration",
        ],
        startingAt: "$1,500",
    },
    {
        slug: "website-design",
        icon: Globe,
        title: "Website Design for Conversion",
        tagline: "Beautiful sites that perform",
        description: "Conversion-focused websites with SEO foundations built in. Clean, fast, and designed to turn visitors into customers.",
        features: [
            "Custom design & development",
            "SEO-first architecture",
            "Conversion optimization",
            "Analytics integration",
            "Performance optimization",
        ],
        startingAt: "$3,000",
    },
    {
        slug: "content-systems",
        icon: FileText,
        title: "Content Systems & Repurposing",
        tagline: "Create once, distribute everywhere",
        description: "Newsletter, blog, and repurposing workflows. AI-powered efficiency that multiplies your content impact.",
        features: [
            "Content strategy development",
            "Newsletter automation",
            "Blog workflow setup",
            "Repurposing pipelines",
            "AI content assistance",
        ],
        startingAt: "$1,000",
    },
];

export default function ServicesPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="section-label">Our Services</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Full-Spectrum AI <span className="gradient-text">Solutions</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            End-to-end systems designed to work together, scale infinitely, and evolve with your business.
                            From automation to AI agents—we build what you need.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className={`glass-card rounded-2xl p-8 lg:p-10 group relative overflow-hidden ${service.featured ? "lg:col-span-2 lg:flex lg:gap-12" : ""
                                    }`}
                            >
                                {service.popular && (
                                    <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-3 py-1 rounded-full">
                                        Starting at {service.startingAt}
                                    </span>
                                )}
                                {service.featured && (
                                    <span className="absolute top-4 right-4 text-xs font-semibold text-[var(--gold-400)] bg-[var(--gold-500)]/10 px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                )}

                                <div className={service.featured ? "lg:w-1/2" : ""}>
                                    <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-6 group-hover:scale-110 transition-transform">
                                        <service.icon size={28} />
                                    </div>
                                    <p className="text-sm text-[var(--gold-400)] font-medium mb-2">{service.tagline}</p>
                                    <h2 className="text-2xl font-semibold mb-4 group-hover:text-[var(--gold-400)] transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                </div>

                                <div className={service.featured ? "lg:w-1/2" : ""}>
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                                <CheckCircle size={16} className="text-[var(--gold-400)] flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[var(--text-muted)]">
                                            Starting at <span className="text-white font-semibold">{service.startingAt}</span>
                                        </span>
                                        <span className="flex items-center gap-2 text-sm text-[var(--gold-400)] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn more <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Not Sure Where to Start?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free strategy call and we&apos;ll help you identify the highest-impact opportunities for your business.
                        </p>
                        <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Book a Strategy Call
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
