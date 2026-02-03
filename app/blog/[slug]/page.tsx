import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";

// Sample blog posts data - in production, this would come from a CMS or MDX
const postsData: Record<string, {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
}> = {
    "ai-automation-small-business-2024": {
        title: "AI Automation for Small Business: The 2024 Playbook",
        excerpt: "Forget the hype. Here's what actually works when implementing AI automation in small and midsize businesses.",
        category: "AI Automation",
        date: "2024-01-15",
        readTime: "8 min read",
        author: "FlyNerd Tech",
        content: `
## The Reality Check

Everyone's talking about AI, but most small businesses are still trying to figure out what to actually *do* with it. After implementing AI automation for dozens of SMBs, here's what we've learned.

## Start With These Three Areas

### 1. Customer Communication
The lowest-hanging fruit for most businesses. AI chatbots for FAQ handling, automated email responses, and lead qualification can save 10-20 hours per week.

**Quick win:** Set up a simple AI chatbot that handles your top 10 customer questions. Most queries are repetitive—let AI handle them so your team can focus on complex issues.

### 2. Content Repurposing
Create once, distribute everywhere. AI tools can transform a single blog post into:
- Social media threads
- Email newsletter content
- Video scripts
- Podcast talking points

**Quick win:** Use AI to generate 5 social posts from every blog article you publish.

### 3. Data Entry and Reporting
Manual data entry is expensive and error-prone. AI can:
- Extract data from documents and emails
- Update CRM records automatically
- Generate weekly reports without human intervention

**Quick win:** Automate your weekly reporting with AI-powered dashboards.

## The Tools That Actually Work

After testing dozens of tools, here's our current stack:
- **Make.com** for workflow automation
- **ChatGPT/Claude** for content and analysis
- **ActiveCampaign** for email automation with AI features
- **Zapier** for simple integrations

## Common Mistakes to Avoid

1. **Trying to automate everything at once** - Start small, prove ROI, then expand
2. **Ignoring the human element** - AI should augment your team, not replace judgment
3. **Not measuring results** - Track time saved and revenue impact

## Next Steps

Ready to implement AI automation in your business? [Book a strategy call](/contact) and we'll identify your highest-impact opportunities.
    `,
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return Object.keys(postsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = postsData[slug];
    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = postsData[slug];

    if (!post) {
        notFound();
    }

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-8 lg:pt-40">
                <div className="section-container">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Nerd News
                    </Link>

                    <div className="max-w-3xl">
                        <span className="text-sm text-[var(--gold-400)] font-medium">{post.category}</span>
                        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold mt-2 mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                            <span className="flex items-center gap-2">
                                <Calendar size={14} />
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                            <span>By {post.author}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24">
                <div className="section-container">
                    <article className="max-w-3xl prose prose-lg prose-invert prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)] prose-strong:text-white prose-a:text-[var(--gold-400)] prose-a:no-underline hover:prose-a:underline">
                        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2>').replace(/### /g, '<h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/<\/h2>/g, '</h2><p>').replace(/<\/h3>/g, '</h3><p>') }} />
                    </article>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-semibold mb-6">
                            Need Help Implementing This?
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] mb-8">
                            Book a free strategy call and we&apos;ll help you identify the best automation opportunities for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact" className="btn btn-primary">
                                Book a Strategy Call
                                <ArrowUpRight size={18} />
                            </Link>
                            <Link href="/blog" className="btn btn-ghost">
                                Read More Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
