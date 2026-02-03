import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Transparent pricing for AI automation services. From $499 email campaigns to full-scale business transformation.",
};

const pricingTiers = [
    {
        name: "Starter",
        subtitle: "Email Campaign Automation",
        price: "$499",
        period: "per campaign",
        description: "Perfect for testing the waters. A complete done-for-you email campaign with strategy, copy, and automation.",
        features: [
            "30-min strategy consultation",
            "Audience segmentation setup",
            "3-5 email sequence",
            "AI-assisted copywriting",
            "ActiveCampaign setup",
            "A/B testing",
            "30-day performance report",
        ],
        cta: "Get Started",
        href: "/contact?package=starter",
        popular: true,
    },
    {
        name: "Build",
        subtitle: "Foundation Package",
        price: "$2,500",
        period: "one-time",
        description: "Get your systems in order. CRM cleanup, basic automations, and a solid foundation for growth.",
        features: [
            "Everything in Starter",
            "CRM data cleanup",
            "3 custom automations",
            "Lead scoring setup",
            "Basic analytics dashboard",
            "2 weeks of support",
            "Team training session",
        ],
        cta: "Get Started",
        href: "/contact?package=build",
    },
    {
        name: "Optimize",
        subtitle: "Growth Retainer",
        price: "$5,000",
        period: "/month",
        description: "Ongoing optimization and expansion. We become an extension of your team.",
        features: [
            "Everything in Build",
            "Unlimited automations",
            "AI agent development",
            "Advanced attribution",
            "Weekly strategy calls",
            "Priority support",
            "Content system setup",
        ],
        cta: "Get Started",
        href: "/contact?package=optimize",
        featured: true,
    },
    {
        name: "Scale",
        subtitle: "Full Transformation",
        price: "$10,000",
        period: "/month",
        description: "Complete AI transformation. Full-stack implementation with dedicated resources.",
        features: [
            "Everything in Optimize",
            "Dedicated project manager",
            "Custom integrations",
            "Enterprise AI solutions",
            "Data warehouse setup",
            "24/7 monitoring",
            "Quarterly strategy reviews",
        ],
        cta: "Contact Us",
        href: "/contact?package=scale",
    },
];

const faqs = [
    {
        question: "What if I'm not sure which package I need?",
        answer: "Book a free strategy call and we'll help you identify the right fit based on your goals, budget, and current setup.",
    },
    {
        question: "Can I upgrade my package later?",
        answer: "Absolutely. Most clients start with Build or a Starter campaign, then move to monthly retainers as they see results.",
    },
    {
        question: "Do you offer custom packages?",
        answer: "Yes. If none of these fit your needs exactly, we can create a custom scope based on your specific requirements.",
    },
    {
        question: "What's your refund policy?",
        answer: "We stand behind our work. If you're not satisfied with deliverables, we'll make it right or refund unused work.",
    },
    {
        question: "How quickly can you start?",
        answer: "Typically within 1-2 weeks of signing. Rush timelines may be available for an additional fee.",
    },
    {
        question: "Do you require long-term contracts?",
        answer: "Monthly retainers are month-to-month with 30 days notice. Project work is milestone-based with agreed deliverables.",
    },
];

export default function PricingPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="section-label">Pricing</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Transparent <span className="gradient-text">Pricing</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            From single campaigns to full business transformation. Choose what fits your stage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`glass-card rounded-2xl p-8 relative ${tier.featured ? "ring-2 ring-[var(--gold-500)] lg:scale-105" : ""
                                    }`}
                            >
                                {tier.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full">
                                        Popular
                                    </span>
                                )}
                                {tier.featured && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full">
                                        Best Value
                                    </span>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                                    <p className="text-sm text-[var(--gold-400)]">{tier.subtitle}</p>
                                </div>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-[var(--text-muted)] ml-1">{tier.period}</span>
                                </div>

                                <p className="text-sm text-[var(--text-secondary)] mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                            <Check size={16} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={tier.href}
                                    className={`btn w-full ${tier.featured ? "btn-primary" : "btn-ghost"}`}
                                >
                                    {tier.cta}
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">FAQ</span>
                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold mt-4">
                            Common Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <HelpCircle size={18} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                                    <h3 className="font-semibold">{faq.question}</h3>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] pl-7">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Still Have Questions?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free 30-minute strategy call. No pressure—just honest advice about what would work for your business.
                        </p>
                        <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Book a Free Call
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
