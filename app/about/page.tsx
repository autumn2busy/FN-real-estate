import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, Clock, Lightbulb, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "About",
    description: "Meet the founder of FlyNerd Tech. 15+ years in tech, specializing in AI systems that convert and scale.",
};

const values = [
    {
        icon: Lightbulb,
        title: "Lateral Thinking",
        description: "We approach problems differently. The best solutions often come from unexpected connections.",
    },
    {
        icon: Users,
        title: "Radical Creativity",
        description: "We push boundaries while staying practical. Innovation without execution is just ideas.",
    },
    {
        icon: Clock,
        title: "Cross-Domain Expertise",
        description: "Tech, marketing, operations, design—we connect the dots that others miss.",
    },
    {
        icon: Award,
        title: "AI as the Intern",
        description: "AI does the heavy lifting. Humans provide the judgment, creativity, and strategic direction.",
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content */}
                        <div>
                            <span className="section-label">About FlyNerd Tech</span>
                            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-4 mb-6">
                                Where Intelligence <span className="gradient-text">Meets Influence</span>
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                                Brilliance deserves style. Unapologetically melanin. We&apos;re here to help
                                creative intellectuals and ambitious businesses build systems that scale.
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                Based in Atlanta. Serving clients globally. Rooted in the FlyNerd mission of
                                empowering diverse minds in tech and STEM.
                            </p>
                        </div>

                        {/* Visual Placeholder - Founder area */}
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--gold-500)]/20 to-[var(--teal-500)]/20 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] mx-auto mb-6 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-[var(--gold-400)]" viewBox="0 0 120 50" fill="none">
                                            <rect x="5" y="12" width="40" height="25" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                            <rect x="75" y="12" width="40" height="25" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                            <path d="M45 24 Q60 18 75 24" stroke="currentColor" strokeWidth="2.5" fill="none" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Founder photo coming soon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Story */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto">
                        <span className="section-label">The Founder</span>
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mt-4 mb-8">
                            15+ Years Building Systems That Scale
                        </h2>

                        <div className="prose prose-lg prose-invert">
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                                The founder of FlyNerd Tech is a seasoned <strong className="text-white">Solutions Architect</strong> with
                                over 15 years of experience in technology, marketing operations, and business systems design.
                            </p>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                Having worked across enterprise tech, startups, and agency environments, they&apos;ve seen what works
                                and what doesn&apos;t when it comes to implementing technology that actually moves the needle.
                            </p>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                The mission: <strong className="text-[var(--gold-400)]">democratize AI-powered automation</strong> for
                                small and midsize businesses. Too often, these tools are reserved for companies with million-dollar
                                budgets. FlyNerd Tech exists to change that.
                            </p>

                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Beyond client work, there&apos;s a deeper purpose: <strong className="text-white">empowering diverse minds
                                    in tech and STEM</strong>. The FlyNerd brand—from apparel to agency—is about celebrating intellectual
                                style and proving that brilliance comes in all forms.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-10">
                            <Link href="/contact" className="btn btn-primary">
                                Work With Us
                                <ArrowUpRight size={18} />
                            </Link>
                            <a
                                href="https://flynerdofficial.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost"
                            >
                                Explore FlyNerd Official
                                <ArrowUpRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="section-label">Our Values</span>
                        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold mt-4">
                            How We <span className="gradient-text">Think</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mx-auto mb-6">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FlyNerd Ethos */}
            <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight mb-8">
                            <span className="text-[var(--gold-400)] font-semibold">F</span>reethinking{" "}
                            <span className="text-[var(--gold-400)] font-semibold">L</span>ifestyle{" "}
                            <span className="text-[var(--gold-400)] font-semibold">Y</span>earners{" "}
                            <span className="text-[var(--gold-400)] font-semibold">N</span>avigating{" "}
                            <span className="text-[var(--gold-400)] font-semibold">E</span>very{" "}
                            <span className="text-[var(--gold-400)] font-semibold">R</span>elevant{" "}
                            <span className="text-[var(--gold-400)] font-semibold">D</span>omain
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                            At FlyNerd, our mission is to inspire and elevate creative intellectuals. We are
                            dedicated to pushing the boundaries of creativity and innovation, fostering a
                            community that celebrates and nurtures intellectual style and inclusion.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6">
                            Ready to Build Together?
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
