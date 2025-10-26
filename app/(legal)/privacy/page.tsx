import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components';

const lastUpdated = 'October 24, 2025';

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    body:
      'LookLab provides automation tools for Instagram Business Accounts, enabling AI-powered interactions through Instagram Direct Messages. We collect and process data necessary to deliver these services while maintaining strict privacy and security standards in compliance with GDPR, CCPA, and Meta Platform Terms.',
  },
  {
    id: 'collection',
    title: '2. Data We Collect',
    body:
      'We collect the following categories of data: (a) Account Information - workspace owner email, billing details, team member invitations; (b) Instagram Business Account Data - username, profile picture, follower count, business category; (c) Message Content - Direct Messages sent and received for automation purposes; (d) User-Generated Media - images uploaded by end-users for AI processing (hair transformations, aesthetic previews); (e) Analytics & Engagement - message open rates, response times, automation performance metrics; (f) Technical Data - IP addresses, device information, browser type for security and diagnostics.',
  },
  {
    id: 'instagram-data',
    title: '2.1 Instagram-Specific Data',
    body:
      'When you connect your Instagram Business Account via OAuth 2.0, we access: (1) Basic profile information (username, profile picture, follower count, biography), (2) Instagram Direct Messages for automation triggers and responses, (3) Media uploaded by users interacting with your automation (photos for AI transformation), (4) Message delivery and read receipts. We only access data necessary for automation functionality and never post to your feed without explicit permission.',
  },
  {
    id: 'retention',
    title: '2.2 Data Retention Periods',
    body:
      'We retain data as follows: (a) Account Information - until workspace deletion + 30 days for billing reconciliation; (b) Instagram Messages - 90 days from automation trigger for analytics purposes; (c) AI-Processed Images - 48 hours after processing (automatically deleted unless workspace owner saves to gallery, then retained for 1 year); (d) Analytics & Metrics - 2 years for performance tracking; (e) Audit Logs - 3 years for compliance and security investigations. You may request earlier deletion at any time via privacy@looklab.app.',
  },
  {
    id: 'usage',
    title: '3. How We Use Information',
    body:
      'We use collected data to: (a) Deliver automation services (process DM triggers, send automated responses, generate AI transformations); (b) Personalize your experience (suggest templates, optimize message timing); (c) Monitor performance (track engagement rates, identify errors); (d) Maintain security (detect spam, prevent unauthorized access); (e) Provide customer support (troubleshoot issues, respond to inquiries); (f) Comply with legal obligations (tax reporting, law enforcement requests). We never sell personal data to third parties or use it for advertising purposes.',
  },
  {
    id: 'ai-processing',
    title: '3.1 Third-Party AI Processing',
    body:
      'User-uploaded images are processed using Google Gemini 2.0 Flash API to generate AI transformations (hair restoration previews, aesthetic simulations). Images are transmitted to Google Cloud via encrypted HTTPS connections. Google may temporarily cache images for processing (typically under 60 seconds) but does not use them for AI model training per our Data Processing Agreement. Processed images are returned to our servers, encrypted at rest using AES-256, and automatically deleted after 48 hours unless explicitly saved by the workspace owner.',
  },
  {
    id: 'sharing',
    title: '3.2 Data Sharing & Third Parties',
    body:
      'We share data only with: (a) Service Providers - Google Cloud (hosting), Stripe (payments), SendGrid (transactional emails), who are contractually bound to protect your data; (b) Meta Platforms - when you connect Instagram, we exchange tokens and webhooks per Meta Business Platform Terms; (c) Legal Authorities - if required by law, court order, or to protect our rights and safety. We do not sell data to advertisers, data brokers, or marketing companies.',
  },
  {
    id: 'cookies',
    title: '3.3 Cookies & Tracking',
    body:
      'We use: (a) Essential Cookies - httpOnly JWT tokens for authentication (cannot be disabled); (b) Analytics Cookies - Google Analytics to track page views, session duration, and feature usage (you can opt-out via browser settings); (c) Preference Cookies - language selection, theme preferences (stored locally). We do not use third-party advertising cookies or cross-site tracking pixels. You can manage cookie preferences in your browser settings.',
  },
  {
    id: 'rights',
    title: '4. Your Rights (GDPR/CCPA)',
    body:
      'You have the following rights: (a) Right to Access - request a copy of all data we hold about you (provided as JSON export within 7 days); (b) Right to Rectification - correct inaccurate account or profile information; (c) Right to Deletion - delete your workspace and all associated data (completed within 30 days); (d) Right to Object - disable specific automations or withdraw Instagram access without deleting your account; (e) Right to Data Portability - export automation templates, message histories, and analytics in machine-readable format; (f) Right to Withdraw Consent - revoke Instagram Business Account access anytime (takes effect immediately). To exercise these rights, email privacy@looklab.app with your workspace ID. We respond within 48 hours and complete requests within 30 days.',
  },
  {
    id: 'security',
    title: '4.1 Data Security',
    body:
      'We implement industry-standard security measures: (a) Encryption - TLS 1.3 for data in transit, AES-256 for data at rest; (b) Access Controls - role-based permissions, multi-factor authentication for team accounts; (c) Regular Audits - quarterly security reviews, annual penetration testing; (d) Incident Response - 24-hour breach notification protocol. While we strive to protect your data, no system is 100% secure. Report security concerns to security@looklab.app.',
  },
  {
    id: 'international',
    title: '4.2 International Transfers',
    body:
      'LookLab operates globally with servers in EU (Frankfurt) and US (Virginia) regions. If you are in the EU/EEA, we process data under GDPR Standard Contractual Clauses. Data transferred to the US is protected by adequate safeguards per GDPR Article 46. You can request data residency preferences by contacting privacy@looklab.app.',
  },
  {
    id: 'children',
    title: '4.3 Children\'s Privacy',
    body:
      'LookLab is not intended for users under 18 years old (or under 16 in the EU). We do not knowingly collect data from children. If you believe a child has provided data to us, contact privacy@looklab.app and we will delete it within 72 hours.',
  },
  {
    id: 'changes',
    title: '5. Policy Updates',
    body:
      'We may update this Privacy Policy to reflect new features, legal requirements, or business practices. Material changes will be communicated via email to workspace owners at least 30 days before taking effect. Continued use of LookLab after updates go live constitutes acceptance. Previous versions are archived at looklab.app/privacy/archive.',
  },
  {
    id: 'contact',
    title: '6. Contact & Data Protection Officer',
    body:
      'For privacy requests, questions, or complaints: Email privacy@looklab.app (monitored 24/7, response within 48 hours) or write to LookLab Data Protection Officer, [Your Company Address]. EU users may also lodge complaints with their local supervisory authority.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Privacy Policy | LookLab',
  description:
    'Learn how LookLab plans to collect, use, and safeguard personal data across its automation platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-0">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">LookLab Privacy Policy</h1>
          <p className="text-sm text-neutral-500">Last updated: {lastUpdated}</p>
          <p className="text-base text-neutral-600 sm:text-lg">
            This Privacy Policy explains how LookLab collects, uses, and protects your personal information when you use our Instagram automation platform.
          </p>
          <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary-600">
            <Link href="/terms" className="hover:text-primary-500">
              Terms of Service
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
          Need something clarified? Email{' '}
          <a
            href="mailto:privacy@looklab.app"
            className="font-semibold text-primary-600 hover:text-primary-500"
          >
            privacy@looklab.app
          </a>
          .
        </div>
      </main>

      <Footer />
    </>
  );
}
