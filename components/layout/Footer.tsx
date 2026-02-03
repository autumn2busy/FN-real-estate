import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
    services: [
        { href: "/services/ai-automation", label: "AI Automation" },
        { href: "/services/marketing-operations", label: "Marketing Operations" },
        { href: "/services/email-campaigns", label: "Email Campaigns" },
        { href: "/services/ai-agents", label: "AI Agents" },
        { href: "/services/website-design", label: "Website Design" },
        { href: "/services/content-systems", label: "Content Systems" },
    ],
    company: [
        { href: "/work", label: "Case Studies" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Nerd News" },
        { href: "/contact", label: "Contact" },
    ],
    connect: [
        { href: "https://linkedin.com/company/flynerdtech", label: "LinkedIn", external: true },
        { href: "https://twitter.com/flynerdtech", label: "X (Twitter)", external: true },
        { href: "https://instagram.com/flynerdofficial", label: "Instagram", external: true },
        { href: "https://flynerdofficial.com", label: "FlyNerd Official", external: true },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-base)]">
            {/* Main Footer */}
            <div className="section-container py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <svg
                                className="w-20 h-8"
                                viewBox="0 0 120 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="5"
                                    y="12"
                                    width="40"
                                    height="25"
                                    rx="4"
                                    stroke="url(#footer-glasses)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                <rect
                                    x="75"
                                    y="12"
                                    width="40"
                                    height="25"
                                    rx="4"
                                    stroke="url(#footer-glasses)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                <path
                                    d="M45 24 Q60 18 75 24"
                                    stroke="url(#footer-glasses)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                <defs>
                                    <linearGradient id="footer-glasses" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#D4A418" />
                                        <stop offset="50%" stopColor="#F4C430" />
                                        <stop offset="100%" stopColor="#D4A418" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="text-xl font-bold tracking-wider">
                                FLYNERD<span className="gradient-text">TECH</span>
                            </span>
                        </Link>

                        {/* Mini Manifesto */}
                        <div className="max-w-md">
                            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                                <span className="text-[var(--gold-400)] font-semibold">F</span>reethinking{" "}
                                <span className="text-[var(--gold-400)] font-semibold">L</span>ifestyle{" "}
                                <span className="text-[var(--gold-400)] font-semibold">Y</span>earners{" "}
                                <span className="text-[var(--gold-400)] font-semibold">N</span>avigating{" "}
                                <span className="text-[var(--gold-400)] font-semibold">E</span>very{" "}
                                <span className="text-[var(--gold-400)] font-semibold">R</span>elevant{" "}
                                <span className="text-[var(--gold-400)] font-semibold">D</span>omain
                            </p>
                            <p className="text-sm text-[var(--text-tertiary)] italic">
                                &ldquo;Where intelligence meets influence. Brilliance deserves style.
                                Unapologetically melanin.&rdquo;
                            </p>
                            <p className="text-sm text-[var(--text-muted)] mt-4">
                                Atlanta-based. Global energy.
                            </p>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
                                Services
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.services.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-400)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
                                Company
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-400)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
                                Connect
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.connect.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-400)] transition-colors inline-flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={12} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--glass-border)]">
                <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[var(--text-muted)]">
                        © {new Date().getFullYear()} FlyNerd Tech. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
