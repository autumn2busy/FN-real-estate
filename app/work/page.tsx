import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Work & Results",
    description: "Case studies showcasing real results from FlyNerd Tech clients. See how AI automation drives measurable business outcomes.",
};

const caseStudies = [
    {
        slug: "luxury-ecommerce-transformation",
        category: "E-Commerce + AI",
        title: "Luxury Fashion Brand Transformation",
        client: "Premium apparel brand",
        description: "Complete digital overhaul including AI-powered product discovery, personalized shopping experiences, and unified data infrastructure across 12 markets.",
        challenge: "The brand struggled with fragmented customer data across multiple markets, low online conversion rates, and manual inventory management that couldn't keep pace with demand.",
        solution: "We implemented a unified customer data platform, AI-powered product recommendations, automated inventory syncing, and personalized email journeys based on browsing behavior.",
        results: [
            { value: "340%", label: "Revenue Growth" },
            { value: "2.8x", label: "Conversion Rate" },
            { value: "45%", label: "Cart Size Increase" },
            { value: "12", label: "Markets Unified" },
        ],
        testimonial: {
            quote: "FlyNerd Tech didn't just build us a system—they transformed how we think about customer experience. The results speak for themselves.",
            author: "Director of E-Commerce",
            company: "Premium Fashion Brand",
        },
        featured: true,
    },
    {
        slug: "saas-marketing-automation",
        category: "Marketing Operations",
        title: "SaaS Marketing Automation Engine",
        client: "B2B SaaS startup",
        description: "End-to-end marketing automation with AI-powered lead scoring, lifecycle journeys, and attribution modeling.",
        challenge: "The marketing team was spending 20+ hours per week on manual lead management. They had no visibility into which channels drove qualified leads.",
        solution: "We rebuilt their CRM architecture, implemented behavioral lead scoring, created 15+ automated nurture sequences, and built custom attribution dashboards.",
        results: [
            { value: "2.5x", label: "Lead Conversion" },
            { value: "60%", label: "Time Saved Weekly" },
            { value: "15+", label: "Automated Journeys" },
            { value: "$0", label: "Additional Ad Spend" },
        ],
        testimonial: {
            quote: "We went from chaos to clarity. Now we know exactly where our best leads come from and can focus our efforts accordingly.",
            author: "VP of Marketing",
            company: "B2B SaaS Startup",
        },
    },
    {
        slug: "service-business-ai-support",
        category: "AI Agents",
        title: "24/7 Intelligent Customer Service",
        client: "Service business",
        description: "AI concierge handling customer inquiries with human-level accuracy and empathy, integrated across web, SMS, and email.",
        challenge: "The support team was overwhelmed with repetitive questions, leading to slow response times and frustrated customers. They needed to scale without scaling headcount.",
        solution: "We deployed a custom AI agent trained on their knowledge base, integrated with their booking system, and built seamless handoff workflows for complex issues.",
        results: [
            { value: "80%", label: "Automation Rate" },
            { value: "2min", label: "Avg Response Time" },
            { value: "4.8/5", label: "Customer Satisfaction" },
            { value: "24/7", label: "Availability" },
        ],
        testimonial: {
            quote: "Our customers can't tell they're talking to AI—and they love how fast they get answers. This has been a game-changer.",
            author: "CEO",
            company: "Service Business",
        },
    },
];

export default function WorkPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="section-label">Case Studies</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Results That <span className="gradient-text">Speak</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Real projects, real metrics, real outcomes. See how we&apos;ve helped businesses
                            transform with AI-powered automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="pb-24 lg:pb-32">
                <div className="section-container space-y-16">
                    {caseStudies.map((study, index) => (
                        <article
                            key={study.slug}
                            className={`glass-card rounded-3xl overflow-hidden ${study.featured ? "p-10 lg:p-16" : "p-8 lg:p-12"
                                }`}
                        >
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Left Column */}
                                <div className="lg:w-1/2">
                                    <span className="text-sm text-[var(--gold-400)] font-medium">{study.category}</span>
                                    <h2 className="text-2xl lg:text-3xl font-semibold mt-2 mb-4">{study.title}</h2>
                                    <p className="text-[var(--text-secondary)] mb-8">{study.description}</p>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                                The Challenge
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)]">{study.challenge}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                                Our Solution
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)]">{study.solution}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="lg:w-1/2">
                                    {/* Results Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {study.results.map((result, i) => (
                                            <div key={i} className="bg-[var(--bg-base)] rounded-xl p-6 text-center">
                                                <div className="text-3xl font-bold gradient-text mb-1">{result.value}</div>
                                                <div className="text-sm text-[var(--text-muted)]">{result.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Testimonial */}
                                    <blockquote className="border-l-2 border-[var(--gold-500)] pl-6">
                                        <p className="text-[var(--text-secondary)] italic mb-4">
                                            &ldquo;{study.testimonial.quote}&rdquo;
                                        </p>
                                        <footer className="text-sm">
                                            <span className="text-white font-medium">{study.testimonial.author}</span>
                                            <span className="text-[var(--text-muted)]"> — {study.testimonial.company}</span>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Ready to Be Our Next Success Story?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Let&apos;s talk about what AI automation could do for your business.
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
