"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
];

const navLinksRight = [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "py-3 bg-[rgba(24,25,29,0.95)] backdrop-blur-xl"
                    : "py-5 bg-[rgba(24,25,29,0.7)] backdrop-blur-lg"
                    } border-b border-[var(--glass-border)]`}
            >
                <div className="section-container">
                    <nav className="flex items-center justify-between lg:justify-center lg:gap-12">
                        {/* Left Nav - Desktop */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-400)] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Centered Logo */}
                        <Link href="/" className="flex items-center group">
                            <svg
                                className="w-24 h-10 transition-all duration-300 drop-shadow-[0_0_10px_rgba(212,164,24,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(244,196,48,0.6)] group-hover:scale-105"
                                viewBox="0 0 120 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Left Lens */}
                                <rect
                                    x="5"
                                    y="12"
                                    width="40"
                                    height="25"
                                    rx="4"
                                    stroke="url(#glasses-grad)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                {/* Right Lens */}
                                <rect
                                    x="75"
                                    y="12"
                                    width="40"
                                    height="25"
                                    rx="4"
                                    stroke="url(#glasses-grad)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                {/* Bridge */}
                                <path
                                    d="M45 24 Q60 18 75 24"
                                    stroke="url(#glasses-grad)"
                                    strokeWidth="2.5"
                                    fill="none"
                                />
                                {/* Temples */}
                                <path
                                    d="M5 20 L-5 15"
                                    stroke="url(#glasses-grad)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M115 20 L125 15"
                                    stroke="url(#glasses-grad)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="glasses-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#D4A418" />
                                        <stop offset="50%" stopColor="#F4C430" />
                                        <stop offset="100%" stopColor="#D4A418" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </Link>

                        {/* Right Nav - Desktop */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinksRight.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-400)] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="btn btn-primary text-sm ml-4 flex items-center gap-2"
                            >
                                Book a Strategy Call
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-80 bg-[var(--bg-elevated)] border-l border-[var(--glass-border)] p-8 pt-24"
                        >
                            <div className="flex flex-col gap-6">
                                {[...navLinks, ...navLinksRight].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-white hover:text-[var(--gold-400)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <hr className="border-[var(--glass-border)] my-4" />
                                <Link
                                    href="/blog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
                                >
                                    Nerd News
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="btn btn-primary text-center mt-4"
                                >
                                    Book a Strategy Call
                                </Link>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
