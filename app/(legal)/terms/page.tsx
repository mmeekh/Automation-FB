import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components';

const lastUpdated = 'October 24, 2025';

const sections = [
  {
    id: 'agreement',
    title: '1. Acceptance of Terms',
    body:
      'By accessing or using LookLab, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the service. These Terms constitute a legally binding agreement between you (workspace owner or authorized team member) and LookLab. You must be at least 18 years old and have the authority to enter into this agreement on behalf of your business.',
  },
  {
    id: 'accounts',
    title: '2. Account Registration & Security',
    body:
      'You must provide accurate, complete, and current information during registration. Workspace owners are responsible for: (a) maintaining the confidentiality of login credentials; (b) all activities under their account; (c) ensuring invited team members have proper authorization to manage connected Instagram Business Accounts; (d) immediately notifying us of any unauthorized access (security@looklab.app). You may not share accounts, transfer access, or allow access by minors under 18.',
  },
  {
    id: 'acceptable-use',
    title: '3. Acceptable Use Policy',
    body:
      'You agree NOT to use LookLab for: (a) Spam - unsolicited messages, mass DMs, or automated follow/unfollow schemes; (b) Illegal Activities - promoting illegal products, services, or violating applicable laws; (c) Copyright Infringement - using copyrighted images, brands, or content without permission; (d) Platform Violations - breaching Meta Platform Terms, Instagram Community Guidelines, or other connected service policies; (e) Harassment - abusive, threatening, or discriminatory messages; (f) Impersonation - pretending to be another person, brand, or entity. Violations may result in immediate account suspension or termination without refund.',
  },
  {
    id: 'instagram-permissions',
    title: '3.1 Instagram Business Account Requirements',
    body:
      'To use LookLab automations, you must: (a) Connect a valid Instagram Business Account (personal accounts are not supported); (b) Comply with Meta Platform Terms and Instagram API Terms at all times; (c) Ensure you have rights to any media, text, or content sent via automations; (d) Not attempt to exceed rate limits or bypass Instagram API restrictions. LookLab may suspend service if Meta flags your account for violations. We are not responsible for Instagram account bans resulting from your content or usage patterns.',
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    body:
      'LookLab retains all rights to: (a) Platform code, design, features, and functionality; (b) Pre-built automation templates and flow logic; (c) LookLab branding, logos, and trademarks. You retain ownership of: (a) Your customized messages, images, and content; (b) Data you upload or generate through automations; (c) Your Instagram account and follower relationships. You grant LookLab a limited license to use your content solely to provide services (e.g., storing messages, processing images via AI).',
  },
  {
    id: 'billing',
    title: '5. Billing & Subscriptions',
    body:
      'Pricing is based on monthly subscription tiers or credit-based usage. Payments are processed via Stripe and billed in advance. You agree to: (a) Provide valid payment information; (b) Pay all charges incurred under your account; (c) Subscription auto-renewal (cancel anytime with 30-day notice). Refunds are provided only for service outages exceeding 72 consecutive hours (prorated credit applied). Cancellations take effect at the end of the current billing cycle.',
  },
  {
    id: 'liability',
    title: '6. Service Availability & Liability',
    body:
      'LookLab is provided on an "as is" basis. We strive for 99.5% uptime but do not guarantee uninterrupted service. We are NOT liable for: (a) Indirect, incidental, or consequential damages (lost revenue, lost customers, reputation harm); (b) Third-party service outages (Instagram API downtime, Meta policy changes); (c) Automation misconfiguration or user error; (d) Data loss (you are responsible for backups); (e) Instagram account suspensions resulting from your content. Our total liability is limited to fees paid in the 3 months preceding the claim.',
  },
  {
    id: 'termination',
    title: '7. Termination',
    body:
      'You may cancel your account anytime via account settings or by emailing support@looklab.app. We may suspend or terminate access immediately if you: (a) Violate these Terms or our Acceptable Use Policy; (b) Engage in fraudulent billing or chargebacks; (c) Pose a security risk to our platform or other users. Upon termination: (a) Your access ends immediately; (b) Data is retained for 30 days (request export before canceling); (c) No refunds for partial billing periods.',
  },
  {
    id: 'changes',
    title: '8. Changes to Terms',
    body:
      'We may update these Terms to reflect new features, legal requirements, or operational changes. Material updates will be communicated via email to workspace owners at least 30 days before taking effect. Continued use after changes go live constitutes acceptance. If you do not agree to updates, you must cancel your account before the effective date. Previous versions are archived at looklab.app/terms/archive.',
  },
  {
    id: 'governing-law',
    title: '9. Governing Law & Disputes',
    body:
      'These Terms are governed by [Your Jurisdiction] law. Any disputes will be resolved through binding arbitration per [Arbitration Rules], except you may bring claims in small claims court. Class action lawsuits are waived. For legal inquiries, contact legal@looklab.app.',
  },
  {
    id: 'contact',
    title: '10. Contact Information',
    body:
      'For questions about these Terms: Email support@looklab.app or legal@looklab.app. Mailing address: LookLab Inc., [Your Company Address]. Support hours: Monday-Friday 9am-6pm EST (emergency support 24/7 for critical outages).',
  },
] as const;

export const metadata: Metadata = {
  title: 'Terms of Service | LookLab',
  description:
    'Understand the baseline rules for using LookLab during the private beta and beyond.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-0">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            Terms of Service
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">LookLab Terms of Service</h1>
          <p className="text-sm text-neutral-500">Last updated: {lastUpdated}</p>
          <p className="text-base text-neutral-600 sm:text-lg">
            These Terms of Service govern your use of LookLab&apos;s Instagram automation platform. Please read them carefully before using our services.
          </p>
          <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary-600">
            <Link href="/privacy" className="hover:text-primary-500">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-neutral-300">
              /
            </span>
            <Link href="/data-deletion" className="hover:text-primary-500">
              Data Deletion Instructions
            </Link>
          </nav>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{section.title}</h2>
              <p className="text-neutral-600 sm:text-base">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-8 text-sm text-neutral-500">
          Questions about these terms? Email{' '}
          <a
            href="mailto:legal@looklab.app"
            className="font-semibold text-primary-600 hover:text-primary-500"
          >
            legal@looklab.app
          </a>
          .
        </div>
      </main>

      <Footer />
    </>
  );
}

