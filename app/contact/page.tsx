"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const intakeQuestions = [
    {
        id: "business_name",
        label: "What's your business name?",
        type: "text",
        placeholder: "Acme Inc.",
    },
    {
        id: "industry",
        label: "What industry or niche are you in?",
        type: "text",
        placeholder: "E-commerce, SaaS, Services, etc.",
    },
    {
        id: "revenue",
        label: "Current revenue range?",
        type: "select",
        options: [
            "Under $100K",
            "$100K - $500K",
            "$500K - $1M",
            "$1M - $5M",
            "$5M+",
            "Prefer not to say",
        ],
    },
    {
        id: "challenge",
        label: "What's your biggest operational challenge right now?",
        type: "textarea",
        placeholder: "Tell us about the pain points you're looking to solve...",
    },
    {
        id: "tools",
        label: "What tools are you currently using?",
        type: "text",
        placeholder: "CRM, email platform, automation tools, etc.",
    },
    {
        id: "ai_experience",
        label: "How would you describe your AI experience level?",
        type: "select",
        options: [
            "Complete beginner - new to AI tools",
            "Some experience - used ChatGPT or similar",
            "Intermediate - implemented some automations",
            "Advanced - have AI systems in place",
        ],
    },
    {
        id: "timeline",
        label: "How soon are you looking to get started?",
        type: "select",
        options: [
            "Immediately - ready to go",
            "Within 30 days",
            "1-3 months",
            "Just exploring options",
        ],
    },
    {
        id: "budget",
        label: "What's your budget range for this project?",
        type: "select",
        options: [
            "Under $1,000",
            "$1,000 - $2,500",
            "$2,500 - $5,000",
            "$5,000 - $10,000",
            "$10,000+",
            "Need to discuss",
        ],
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would send to an API
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    if (isSubmitted) {
        return (
            <section className="min-h-screen flex items-center justify-center pt-24">
                <div className="section-container">
                    <div className="max-w-lg mx-auto text-center glass-card rounded-3xl p-12">
                        <div className="w-20 h-20 rounded-full bg-[var(--gold-500)]/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-[var(--gold-400)]" />
                        </div>
                        <h1 className="text-2xl font-semibold mb-4">Thanks for reaching out!</h1>
                        <p className="text-[var(--text-secondary)] mb-8">
                            We&apos;ve received your inquiry and will be in touch within 24 hours.
                            Keep an eye on your inbox.
                        </p>
                        <Link href="/" className="btn btn-ghost">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column - Info */}
                        <div>
                            <span className="section-label">Contact</span>
                            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-4 mb-6">
                                Let&apos;s Build <span className="gradient-text">Together</span>
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10">
                                Ready to explore what AI automation can do for your business?
                                Fill out the quick intake form and we&apos;ll set up a strategy call.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Email</h3>
                                        <a href="mailto:hello@flynerdtech.com" className="text-[var(--text-secondary)] hover:text-[var(--gold-400)]">
                                            hello@flynerdtech.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Location</h3>
                                        <p className="text-[var(--text-secondary)]">
                                            Atlanta, GA<br />
                                            <span className="text-sm text-[var(--text-muted)]">Serving clients globally</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Response Time</h3>
                                        <p className="text-[var(--text-secondary)]">
                                            Within 24 hours
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="glass-card rounded-3xl p-8 lg:p-10">
                            <h2 className="text-xl font-semibold mb-6">Quick Intake Form</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {intakeQuestions.map((q) => (
                                    <div key={q.id}>
                                        <label htmlFor={q.id} className="block text-sm font-medium mb-2">
                                            {q.label}
                                        </label>
                                        {q.type === "text" && (
                                            <input
                                                type="text"
                                                id={q.id}
                                                placeholder={q.placeholder}
                                                value={formData[q.id] || ""}
                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--glass-border)] text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-500)]"
                                            />
                                        )}
                                        {q.type === "textarea" && (
                                            <textarea
                                                id={q.id}
                                                placeholder={q.placeholder}
                                                rows={3}
                                                value={formData[q.id] || ""}
                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--glass-border)] text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold-500)] resize-none"
                                            />
                                        )}
                                        {q.type === "select" && (
                                            <select
                                                id={q.id}
                                                value={formData[q.id] || ""}
                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-base)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)]"
                                            >
                                                <option value="">Select an option</option>
                                                {q.options?.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                ))}

                                <button type="submit" className="btn btn-primary w-full text-lg py-4">
                                    Submit & Book a Call
                                    <ArrowUpRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
