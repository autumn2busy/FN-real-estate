"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MoveRight, ExternalLink, Clock } from "lucide-react";

interface DelayedCTAProps {
  businessName: string;
  demoSiteUrl?: string | null;
  /** Milliseconds to wait before revealing the button. Default: 15000 */
  delayMs?: number;
  /** Brand accent color from intel agent (hex). Default: #fbbf24 */
  accentColor?: string;
  /** Brand primary color from intel agent (hex). Default: #1a1a2e */
  primaryColor?: string;
}

export default function DelayedCTA({
  businessName,
  demoSiteUrl,
  delayMs = 15000,
  accentColor = "#fbbf24",
  primaryColor = "#1a1a2e",
}: DelayedCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(delayMs / 1000));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Countdown ticker
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    // Reveal trigger
    const revealTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      clearTimeout(revealTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [delayMs]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ── Live Preview Button (revealed after delay) ─────────────────── */}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {demoSiteUrl ? (
          <Link
            href={demoSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-extrabold px-12 py-5 rounded-full text-lg transition-all duration-300"
            style={{
              background: accentColor,
              color: primaryColor,
              boxShadow: `0 0 30px ${accentColor}55`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                `0 0 50px ${accentColor}99`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                `0 0 30px ${accentColor}55`;
            }}
          >
            ENTER LIVE PREVIEW <ExternalLink size={20} />
          </Link>
        ) : (
          <Link
            href={`mailto:hello@flynerd.tech?subject=Launch ${businessName} Website`}
            className="inline-flex items-center gap-3 font-extrabold px-12 py-5 rounded-full text-lg transition-all duration-300"
            style={{
              background: accentColor,
              color: primaryColor,
              boxShadow: `0 0 30px ${accentColor}55`,
            }}
          >
            LAUNCH THIS SITE <MoveRight size={20} />
          </Link>
        )}
      </div>

      {/* ── Countdown hint (visible while waiting) ─────────────────────── */}
      {!isVisible && (
        <div
          className="flex items-center gap-2 text-sm font-medium tracking-wide"
          style={{ color: `${accentColor}99` }}
        >
          <Clock size={14} />
          <span>Live preview unlocks in {secondsLeft}s…</span>
        </div>
      )}

      {/* ── Secondary CTA — always visible ─────────────────────────────── */}
      <Link
        href="https://calendly.com/flynerd"
        className="border-2 border-white/10 hover:border-white/30 transition-all px-12 py-5 rounded-full text-lg font-bold text-white"
      >
        BOOK STRATEGY CALL
      </Link>
    </div>
  );
}