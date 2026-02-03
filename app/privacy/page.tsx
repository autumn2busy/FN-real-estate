import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "FlyNerd Tech privacy policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
    return (
        <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
            <div className="section-container">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold mb-8">Privacy Policy</h1>
                    <p className="text-[var(--text-muted)] mb-12">Last updated: January 2024</p>

                    <div className="prose prose-lg prose-invert max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    FlyNerd Tech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                                    when you visit our website flynerdtech.com or engage with our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                    We may collect information about you in a variety of ways:
                                </p>
                                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                                    <li><strong className="text-white">Personal Data:</strong> Name, email address, phone number, and business information you provide through forms.</li>
                                    <li><strong className="text-white">Usage Data:</strong> Information about how you use our website, including pages visited and time spent.</li>
                                    <li><strong className="text-white">Device Data:</strong> Browser type, operating system, and IP address.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                                    <li>Provide, operate, and maintain our services</li>
                                    <li>Respond to your inquiries and provide customer support</li>
                                    <li>Send you marketing and promotional communications (with your consent)</li>
                                    <li>Improve our website and services</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Information Sharing</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties.
                                    We may share information with trusted service providers who assist us in operating
                                    our website and conducting our business, subject to confidentiality agreements.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    We implement appropriate technical and organizational measures to protect your
                                    personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    You have the right to access, correct, or delete your personal information.
                                    You may also opt out of marketing communications at any time. To exercise these
                                    rights, contact us at hello@flynerdtech.com.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Cookies</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    We use cookies and similar tracking technologies to enhance your experience on our
                                    website. You can control cookie preferences through your browser settings.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    If you have questions about this Privacy Policy, please contact us at:<br />
                                    <strong className="text-white">Email:</strong> hello@flynerdtech.com<br />
                                    <strong className="text-white">Location:</strong> Atlanta, GA
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
