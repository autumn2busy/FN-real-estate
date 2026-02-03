import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "Nerd News | Blog",
    description: "Insights on AI automation, marketing operations, and building systems that scale. The FlyNerd Tech blog.",
};

// Sample blog posts - in a real implementation, these would come from a CMS or MDX files
const posts = [
    {
        slug: "ai-automation-small-business-2024",
        title: "AI Automation for Small Business: The 2024 Playbook",
        excerpt: "Forget the hype. Here's what actually works when implementing AI automation in small and midsize businesses.",
        category: "AI Automation",
        date: "2024-01-15",
        readTime: "8 min read",
        featured: true,
    },
    {
        slug: "email-automation-that-converts",
        title: "Email Automation That Actually Converts: A Step-by-Step Guide",
        excerpt: "Most email automations fail because they ignore one critical element. Here's how to build sequences that drive revenue.",
        category: "Email Marketing",
        date: "2024-01-10",
        readTime: "6 min read",
    },
    {
        slug: "crm-cleanup-checklist",
        title: "The CRM Cleanup Checklist Every Growing Business Needs",
        excerpt: "Dirty data is costing you deals. Use this systematic approach to clean up your CRM and unlock better marketing performance.",
        category: "Marketing Operations",
        date: "2024-01-05",
        readTime: "5 min read",
    },
    {
        slug: "ai-chatbots-customer-service",
        title: "AI Chatbots for Customer Service: Implementation Guide",
        excerpt: "How to deploy AI agents that actually help customers instead of frustrating them. Lessons from real implementations.",
        category: "AI Agents",
        date: "2024-01-02",
        readTime: "10 min read",
    },
    {
        slug: "marketing-attribution-simplified",
        title: "Marketing Attribution Simplified: What Small Businesses Actually Need",
        excerpt: "Skip the expensive enterprise tools. Here's a practical attribution setup that gives you the insights you need.",
        category: "Analytics",
        date: "2023-12-28",
        readTime: "7 min read",
    },
    {
        slug: "workflow-automation-roi",
        title: "Calculating the ROI of Workflow Automation",
        excerpt: "How to build a business case for automation investments with real numbers and honest expectations.",
        category: "AI Automation",
        date: "2023-12-20",
        readTime: "6 min read",
    },
];

const categories = ["All", "AI Automation", "Email Marketing", "Marketing Operations", "AI Agents", "Analytics"];

export default function BlogPage() {
    const featuredPost = posts.find((p) => p.featured);
    const regularPosts = posts.filter((p) => !p.featured);

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="section-label">Nerd News</span>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold mt-4 mb-6">
                            Insights for <span className="gradient-text">Smart Growth</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Practical strategies for AI automation, marketing operations, and building systems that scale.
                            No fluff. Just what works.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="pb-8">
                <div className="section-container">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0
                                        ? "bg-[var(--gold-500)] text-[var(--bg-base)]"
                                        : "bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="pb-12">
                    <div className="section-container">
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="glass-card rounded-3xl p-8 lg:p-12 block group"
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="lg:w-2/3">
                                    <span className="text-sm text-[var(--gold-400)] font-medium">{featuredPost.category}</span>
                                    <h2 className="text-2xl lg:text-3xl font-semibold mt-2 mb-4 group-hover:text-[var(--gold-400)] transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] mb-6">{featuredPost.excerpt}</p>
                                    <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(featuredPost.date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock size={14} />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:w-1/3 flex items-center justify-end">
                                    <span className="text-[var(--gold-400)] flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Read article <ArrowUpRight size={20} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="pb-24 lg:pb-32">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="glass-card rounded-2xl p-6 group"
                            >
                                <span className="text-xs text-[var(--gold-400)] font-medium">{post.category}</span>
                                <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-[var(--gold-400)] transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">{post.excerpt}</p>
                                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Get the Weekly Nerd Brief
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            One email per week with actionable AI and automation insights. No spam, unsubscribe anytime.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-500)]"
                            />
                            <button type="submit" className="btn btn-primary px-8">
                                Subscribe
                                <ArrowUpRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
