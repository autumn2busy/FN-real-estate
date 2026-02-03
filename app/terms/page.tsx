import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "FlyNerd Tech terms of service. Terms and conditions for using our services.",
};

export default function TermsPage() {
    return (
        <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
            <div className="section-container">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold mb-8">Terms of Service</h1>
                    <p className="text-[var(--text-muted)] mb-12">Last updated: January 2024</p>

                    <div className="prose prose-lg prose-invert max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    By accessing or using FlyNerd Tech&apos;s website and services, you agree to be bound by these
                                    Terms of Service. If you do not agree to these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Services</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    FlyNerd Tech provides AI automation, marketing operations, and technology consulting services.
                                    The specific scope, deliverables, and timelines for each engagement will be outlined in a
                                    separate statement of work or service agreement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Payment Terms</h2>
                                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                                    <li>Project-based work requires a 50% deposit before work begins</li>
                                    <li>Monthly retainers are billed at the beginning of each month</li>
                                    <li>Payment is due within 14 days of invoice date</li>
                                    <li>Late payments may incur a 1.5% monthly fee</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Client Responsibilities</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                    To ensure successful project delivery, clients agree to:
                                </p>
                                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2">
                                    <li>Provide timely access to necessary systems, credentials, and information</li>
                                    <li>Respond to requests and approve deliverables within agreed timeframes</li>
                                    <li>Designate a primary point of contact for the project</li>
                                    <li>Ensure all provided content and materials are owned or properly licensed</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Upon full payment, clients own all custom work product created specifically for their project.
                                    FlyNerd Tech retains ownership of pre-existing tools, frameworks, and methodologies,
                                    which may be licensed for client use as part of the deliverables.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Confidentiality</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Both parties agree to keep confidential any proprietary information shared during the
                                    engagement. This includes business strategies, technical implementations, and customer data.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    FlyNerd Tech&apos;s liability is limited to the amount paid for services in the 12 months
                                    preceding any claim. We are not liable for indirect, incidental, or consequential damages.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Termination</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Either party may terminate a service agreement with 30 days written notice.
                                    In the event of termination, client is responsible for payment of all work completed
                                    to date. Deposits are non-refundable unless otherwise agreed in writing.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    These terms are governed by the laws of the State of Georgia. Any disputes shall be
                                    resolved in the courts of Fulton County, Georgia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    We reserve the right to modify these terms at any time. Continued use of our services
                                    after changes constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Questions about these Terms of Service? Contact us at:<br />
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
