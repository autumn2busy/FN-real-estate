import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle, Zap, Sparkles, Mail, Cpu, Globe, FileText } from "lucide-react";

const servicesData: Record<string, {
    icon: React.ElementType;
    title: string;
    tagline: string;
    heroDescription: string;
    features: { title: string; description: string }[];
    process: string[];
    pricing: { label: string; price: string; description: string };
    faqs: { question: string; answer: string }[];
    tools?: string[];
}> = {
    "ai-automation": {
        icon: Zap,
        title: "AI Automation & Workflow Design",
        tagline: "Work smarter, not harder",
        heroDescription: "Custom automation systems that eliminate repetitive tasks, reduce errors, and free your team to focus on high-value work. Built specifically for your business processes.",
        features: [
            { title: "Process Audit & Mapping", description: "We analyze your current workflows to identify automation opportunities with the highest ROI." },
            { title: "Custom Workflow Design", description: "Tailored automations that fit your exact needs—no cookie-cutter solutions." },
            { title: "Tool Integration", description: "Connect your existing tools (Make.com, Zapier, n8n) into a unified, intelligent system." },
            { title: "AI Decision Logic", description: "Smart automations that adapt based on data, context, and business rules." },
            { title: "Monitoring & Optimization", description: "Real-time dashboards to track performance and continuously improve." },
        ],
        process: ["Discovery call to understand your workflows", "Process mapping and opportunity identification", "Custom automation design and development", "Testing, deployment, and team training", "Ongoing monitoring and optimization"],
        pricing: { label: "Custom", price: "Starting at $2,000", description: "Project-based pricing depending on scope and complexity" },
        faqs: [
            { question: "What tools do you work with?", answer: "We work with Make.com, Zapier, n8n, and can build custom integrations with any API-enabled tool." },
            { question: "How long does a typical automation project take?", answer: "Simple automations can be done in 1-2 weeks. Complex multi-system integrations typically take 4-8 weeks." },
            { question: "Do you provide training?", answer: "Yes, we include training for your team and provide documentation for all automations we build." },
        ],
        tools: ["Make.com", "Zapier", "n8n", "Custom APIs"],
    },
    "marketing-operations": {
        icon: Sparkles,
        title: "Marketing Operations & CRM",
        tagline: "The foundation that scales",
        heroDescription: "Clean data, smart segmentation, and automated journeys. We build the marketing infrastructure that turns leads into customers and customers into advocates.",
        features: [
            { title: "CRM Data Cleanup", description: "Deduplicate, enrich, and organize your customer data for better targeting." },
            { title: "Lifecycle Journey Mapping", description: "Design automated journeys that nurture leads at every stage." },
            { title: "Lead Scoring Automation", description: "AI-powered scoring to prioritize your hottest prospects." },
            { title: "Attribution Modeling", description: "Understand which channels drive real results." },
            { title: "Analytics & Reporting", description: "Custom dashboards that show what matters." },
        ],
        process: ["CRM and MarTech audit", "Data cleanup and migration strategy", "Journey design and automation build", "Integration and testing", "Training and ongoing support"],
        pricing: { label: "Monthly Retainer", price: "Starting at $2,500/mo", description: "Or project-based for specific implementations" },
        faqs: [
            { question: "Which CRMs do you work with?", answer: "HubSpot, Salesforce, ActiveCampaign, Pipedrive, and most major CRM platforms." },
            { question: "Can you migrate data from our old system?", answer: "Yes, we handle full data migrations including cleanup and enrichment." },
            { question: "How do you measure attribution?", answer: "We implement multi-touch attribution models that track both first and last touch, with weighted scoring in between." },
        ],
        tools: ["HubSpot", "Salesforce", "ActiveCampaign", "Segment"],
    },
    "email-campaigns": {
        icon: Mail,
        title: "Personalized Email Campaign Automations",
        tagline: "Campaigns that convert",
        heroDescription: "Done-for-you email campaigns that combine strategy, segmentation, and AI-powered copy. From consultation to performance tracking—we handle everything.",
        features: [
            { title: "Strategy Consultation", description: "We start by understanding your audience, goals, and what makes your offer unique." },
            { title: "Audience Segmentation", description: "Smart segments that ensure the right message reaches the right people." },
            { title: "AI-Assisted Copywriting", description: "Compelling copy that sounds like you, optimized for engagement." },
            { title: "Design & Development", description: "Beautiful emails that render perfectly on every device." },
            { title: "Performance Tracking", description: "A/B testing, analytics, and optimization recommendations." },
        ],
        process: ["Strategy consultation (30 min)", "Audience segmentation setup", "Draft creation and client approval", "Campaign launch", "Performance tracking and optimization"],
        pricing: { label: "Per Campaign", price: "$499", description: "Complete done-for-you email campaign automation" },
        faqs: [
            { question: "What's included in the $499 package?", answer: "Strategy consultation, audience segmentation, 3-5 email sequence, ActiveCampaign setup, A/B testing, and 30-day performance report." },
            { question: "How long until the campaign is live?", answer: "Typically 5-7 business days from consultation to launch." },
            { question: "Do you write the email copy?", answer: "Yes, we handle all copywriting with AI assistance, with client approval before launch." },
        ],
        tools: ["ActiveCampaign", "Mailchimp", "Klaviyo", "ConvertKit"],
    },
    "ai-agents": {
        icon: Cpu,
        title: "AI Agents & Integrations",
        tagline: "24/7 intelligent assistants",
        heroDescription: "Custom AI agents that handle customer support, qualify leads, generate content, and integrate seamlessly with your existing tools. Always on, always learning.",
        features: [
            { title: "Custom Chatbots", description: "Conversational AI trained on your brand voice and knowledge base." },
            { title: "Support Automation", description: "Handle common inquiries, route complex issues, reduce ticket volume." },
            { title: "Lead Qualification", description: "AI that asks the right questions and identifies hot prospects." },
            { title: "Content Assistants", description: "Generate drafts, repurpose content, maintain consistency." },
            { title: "Multi-Platform Integration", description: "Shopify, Wix, Slack, Google Workspace, and more." },
        ],
        process: ["Requirements gathering and use case definition", "AI agent design and training", "Integration with your platforms", "Testing and refinement", "Deployment and monitoring"],
        pricing: { label: "Custom", price: "Starting at $1,500", description: "Depends on complexity and integration requirements" },
        faqs: [
            { question: "What platforms can you integrate with?", answer: "Shopify, Wix, WordPress, Slack, Google Workspace, most CRMs, and any platform with an API." },
            { question: "Can the AI learn from our existing content?", answer: "Yes, we train agents on your knowledge base, FAQs, and brand guidelines." },
            { question: "How do you handle escalation to humans?", answer: "We build seamless handoff workflows that route complex issues to your team with full context." },
        ],
        tools: ["OpenAI", "Anthropic", "Shopify", "Slack", "Make.com"],
    },
    "website-design": {
        icon: Globe,
        title: "Website Design for Conversion",
        tagline: "Beautiful sites that perform",
        heroDescription: "Conversion-focused websites with SEO foundations built in from day one. Fast, accessible, and designed to turn visitors into customers.",
        features: [
            { title: "Custom Design", description: "Unique designs that reflect your brand—no templates." },
            { title: "SEO Architecture", description: "Built for search from the ground up: speed, structure, schema." },
            { title: "Conversion Optimization", description: "Strategic CTAs, user flows, and landing pages that convert." },
            { title: "Performance", description: "Lightning-fast load times on every device." },
            { title: "Analytics Integration", description: "Full tracking setup to measure what matters." },
        ],
        process: ["Discovery and strategy", "Wireframing and design", "Development and content integration", "SEO optimization and testing", "Launch and training"],
        pricing: { label: "Project", price: "Starting at $3,000", description: "Landing pages start at $1,500" },
        faqs: [
            { question: "What platform do you build on?", answer: "Primarily Next.js for performance and flexibility, but we also work with Webflow, WordPress, and Shopify." },
            { question: "Is hosting included?", answer: "We can recommend and help set up hosting (Vercel, Netlify, etc.), but hosting costs are separate." },
            { question: "Do you handle the content?", answer: "We can write content with AI assistance, or work with your existing copy." },
        ],
        tools: ["Next.js", "Tailwind", "Vercel", "Webflow"],
    },
    "content-systems": {
        icon: FileText,
        title: "Content Systems & Repurposing",
        tagline: "Create once, distribute everywhere",
        heroDescription: "Newsletter automation, blog workflows, and AI-powered repurposing. Maximize your content impact with systems that multiply your reach.",
        features: [
            { title: "Content Strategy", description: "A clear plan aligned with your business goals and audience needs." },
            { title: "Newsletter Automation", description: "Consistent delivery with smart segmentation and personalization." },
            { title: "Blog Workflow Setup", description: "From idea to published—streamlined and efficient." },
            { title: "Repurposing Pipelines", description: "Turn one piece of content into ten across multiple channels." },
            { title: "AI Content Assistance", description: "Tools and prompts that accelerate creation while maintaining quality." },
        ],
        process: ["Content audit and strategy session", "System design and tool selection", "Workflow automation setup", "AI assistant configuration", "Training and documentation"],
        pricing: { label: "Custom", price: "Starting at $1,000", description: "Based on scope and number of channels" },
        faqs: [
            { question: "Can you help with content ideas?", answer: "Yes, we help develop content calendars and topic clusters based on your SEO and audience strategy." },
            { question: "Which tools do you use for repurposing?", answer: "Various AI tools plus custom workflows in Make.com to automate distribution across platforms." },
            { question: "Do you write the content?", answer: "We can, or we can set up systems for you or your team to create content more efficiently." },
        ],
        tools: ["Notion", "Beehiiv", "Ghost", "Make.com"],
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData[slug];
    if (!service) return { title: "Service Not Found" };

    return {
        title: service.title,
        description: service.heroDescription,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)]">
                                <Icon size={28} />
                            </div>
                            <span className="text-sm text-[var(--gold-400)] font-medium">{service.tagline}</span>
                        </div>
                        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mb-6">
                            {service.title}
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                            {service.heroDescription}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="btn btn-primary">
                                Get Started
                                <ArrowUpRight size={18} />
                            </Link>
                            <a href="#pricing" className="btn btn-ghost">
                                View Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <h2 className="text-2xl font-semibold mb-12">What&apos;s Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features.map((feature, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <div className="w-8 h-8 rounded-lg bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-4">
                                    <CheckCircle size={18} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24">
                <div className="section-container">
                    <h2 className="text-2xl font-semibold mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {service.process.map((step, i) => (
                            <div key={i} className="relative">
                                <div className="text-4xl font-bold text-[var(--gold-500)]/20 mb-2">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="text-sm text-[var(--text-secondary)]">{step}</p>
                                {i < service.process.length - 1 && (
                                    <div className="hidden md:block absolute top-4 right-0 translate-x-1/2 w-8 h-px bg-[var(--glass-border)]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools */}
            {service.tools && (
                <section className="py-12 border-y border-[var(--glass-border)]">
                    <div className="section-container">
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <span className="text-sm text-[var(--text-muted)]">Tools we use:</span>
                            {service.tools.map((tool, i) => (
                                <span key={i} className="text-sm font-medium text-[var(--text-secondary)]">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
                        <div className="glass-card rounded-2xl p-8">
                            <span className="text-sm text-[var(--text-muted)]">{service.pricing.label}</span>
                            <div className="text-4xl font-bold gradient-text my-4">{service.pricing.price}</div>
                            <p className="text-[var(--text-secondary)] mb-6">{service.pricing.description}</p>
                            <Link href="/contact" className="btn btn-primary w-full">
                                Get Started
                                <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24">
                <div className="section-container">
                    <h2 className="text-2xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        {service.faqs.map((faq, i) => (
                            <div key={i} className="glass-card rounded-xl p-6">
                                <h3 className="font-semibold mb-2">{faq.question}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free strategy call and let&apos;s discuss how we can help.
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
