import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Productized pricing for a lean AI automation agency. Clear scopes, fixed outcomes, and scalable monthly support.",
};

const pricingTiers = [
    {
        name: "Starter",
        subtitle: "Automation Audit",
        price: "$495",
        period: "one-time",
        description: "A focused systems audit and 30-day roadmap to identify your highest-impact automation opportunities.",
        features: [
            "60-minute strategy call",
            "Current stack and workflow audit",
            "Bottleneck and ROI prioritization",
            "Custom 30-day implementation roadmap",
            "Tool recommendations (AI + automation)",
            "Async follow-up Q&A for 7 days",
            "Audit fee credited toward Build package",
        ],
        cta: "Book Audit",
        href: "/contact?package=starter",
        popular: true,
    },
    {
        name: "Build",
        subtitle: "Quickstart Workflow Build",
        price: "$1,250",
        period: "one-time",
        description: "One high-impact automation built end-to-end with documentation and team handoff.",
        features: [
            "Everything in Starter applied to implementation",
            "1 production-ready workflow (fixed scope)",
            "Core tool integrations (CRM, email, forms, sheets)",
            "QA + launch checklist",
            "Loom walkthrough + SOP documentation",
            "14 days post-launch support",
            "Option to upgrade into monthly optimization",
        ],
        cta: "Start Build",
        href: "/contact?package=build",
    },
    {
        name: "Optimize",
        subtitle: "Monthly Care Plan",
        price: "$750",
        period: "/month",
        description: "Ongoing maintenance, monitoring, and iterative improvements to keep your systems performing.",
        features: [
            "System monitoring and health checks",
            "2 improvement tickets per month",
            "Bug fixes and reliability tuning",
            "Monthly performance summary",
            "Priority async support",
            "Quarterly roadmap refresh",
            "Best for 1-3 core automations",
        ],
        cta: "Choose Optimize",
        href: "/contact?package=optimize",
        featured: true,
    },
    {
        name: "Scale",
        subtitle: "Growth Partner Retainer",
        price: "$1,800",
        period: "/month",
        description: "For teams ready for multi-workflow execution, agent rollouts, and proactive growth operations.",
        features: [
            "Everything in Optimize",
            "Up to 6 active workflow initiatives",
            "AI lead qualification or support agent rollout",
            "Advanced CRM automation and lifecycle journeys",
            "Biweekly strategy calls",
            "Faster turnaround SLAs",
            "Ideal for growing teams with active campaigns",
        ],
        cta: "Apply for Scale",
        href: "/contact?package=scale",
    },
];

const faqs = [
    {
        question: "Why is the Starter package paid?",
        answer: "The audit includes strategy, technical diagnostics, and a tailored roadmap you can execute with or without us. It prevents guesswork and keeps implementation focused.",
    },
    {
        question: "Can the audit fee be applied to implementation?",
        answer: "Yes. If you move forward within 30 days, your Starter fee is credited toward the Build package.",
    },
    {
        question: "Do you offer custom scopes?",
        answer: "Yes, for clients with complex requirements. We still start with a paid audit so custom work is grounded in a clear implementation plan.",
    },
    {
        question: "How fast can we launch?",
        answer: "Most Build projects launch within 1-2 weeks after kickoff. Timeline depends on integrations, access readiness, and review speed.",
    },
    {
        question: "Who is this best for?",
        answer: "Small and midsize teams that want meaningful automation outcomes without hiring a full in-house operations team.",
    },
    {
        question: "Do monthly plans require long-term contracts?",
        answer: "No. Optimize and Scale are month-to-month with 30 days notice.",
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
                            Productized <span className="gradient-text">Pricing</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Lean, clear packages designed for fast implementation and measurable outcomes.
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
                            Start with a paid audit so we can map exactly what to automate first, why it matters, and how to implement it.
                        </p>
                        <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Book the Starter Audit
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
