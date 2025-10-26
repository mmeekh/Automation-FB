import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components';

const lastUpdated = 'October 24, 2025';

const steps = [
  {
    id: 'instagram-revoke',
    title: '1. Revoke Instagram Business Account Access (Immediate)',
    body:
      'To immediately disconnect LookLab from your Instagram account: (1) Open Instagram app → Settings → Security → Apps and Websites → Business Integrations → Find "LookLab" → Tap "Remove". This instantly revokes our access to your Instagram Direct Messages and profile data. (2) If you connected via Meta Business Suite, also visit business.facebook.com → Business Settings → Accounts → Instagram Accounts → Remove LookLab integration. Token revocation takes effect within 5 minutes.',
  },
  {
    id: 'submit-request',
    title: '2. Submit a Workspace Deletion Request',
    body:
      'Email privacy@looklab.app from the address associated with your LookLab workspace. Include "Data Deletion Request" in the subject line and provide: (a) Your workspace name/ID, (b) Instagram Business Account username (if applicable), (c) Reason for deletion (optional but helpful). We will acknowledge receipt within 48 hours.',
  },
  {
    id: 'verify-identity',
    title: '3. Verify Workspace Ownership',
    body:
      'To protect against unauthorized deletion requests, we will send a verification checklist within 2 business days. Verification may include: (a) Confirming billing email or payment method, (b) Naming recent automation templates you created, (c) Responding from the workspace owner email address, (d) For business accounts: signed confirmation on company letterhead. This step typically takes 1-3 days.',
  },
  {
    id: 'data-export',
    title: '4. Export Your Data (Optional - Recommended)',
    body:
      'Before deletion, we recommend exporting your data: (a) Log into LookLab dashboard → Settings → Export Data, (b) Download includes: automation templates (JSON), message histories (CSV), analytics reports (PDF), uploaded images (ZIP). Data export is available for 14 days after deletion request. Once deleted, data cannot be recovered.',
  },
  {
    id: 'processing-window',
    title: '5. Deletion Processing (Up to 30 Days)',
    body:
      'Once ownership is verified, we queue your workspace for deletion. Timeline: (a) Primary database records - deleted within 7 days, (b) AI-processed images & cached media - deleted within 48 hours, (c) Analytics snapshots - deleted within 14 days, (d) Encrypted backups - purged within 30 days, (e) Audit logs (compliance) - anonymized within 90 days. You can check deletion status by emailing privacy@looklab.app.',
  },
  {
    id: 'third-party-processors',
    title: '6. Third-Party Data Processors',
    body:
      'We will also request deletion from our service providers: (a) Google Cloud (hosting) - data deleted per our DPA within 30 days, (b) Stripe (billing) - transaction records retained for 7 years per tax law (card details deleted immediately), (c) SendGrid (emails) - contact data purged within 14 days. You may contact these providers directly to verify deletion.',
  },
  {
    id: 'confirmation',
    title: '7. Receive Final Confirmation',
    body:
      'We will email confirmation once deletion is complete. The confirmation includes: (a) List of data categories deleted, (b) Deletion timestamps, (c) Third-party processors notified, (d) Compliance log reference number (retained for legal purposes). If you do not receive confirmation within 35 days, contact privacy@looklab.app.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | LookLab',
  description:
    'Learn how to request deletion of your LookLab workspace data, connected accounts, and related analytics.',
};

export default function DataDeletionPage() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-0">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            Data Deletion
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Data Deletion Instructions</h1>
          <p className="text-sm text-neutral-500">Last updated: {lastUpdated}</p>
          <p className="text-base text-neutral-600 sm:text-lg">
            Follow these steps to revoke Instagram access and permanently delete your LookLab workspace data, including messages, analytics, and uploaded media.
          </p>
          <nav className="flex flex-wrap gap-4 text-sm font-semibold text-primary-600">
            <Link href="/privacy" className="hover:text-primary-500">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-neutral-300">
              /
            </span>
            <Link href="/terms" className="hover:text-primary-500">
              Terms of Service
            </Link>
          </nav>
        </header>

        <div className="space-y-10">
          {steps.map((step) => (
            <section key={step.id} id={step.id} className="space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-900">{step.title}</h2>
              <p className="text-neutral-600 sm:text-base">{step.body}</p>
            </section>
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-8 text-sm text-neutral-500">
          Need assistance with a deletion request? Email{' '}
          <a
            href="mailto:privacy@looklab.app"
            className="font-semibold text-primary-600 hover:text-primary-500"
          >
            privacy@looklab.app
          </a>{' '}
          or contact your LookLab account representative.
        </div>
      </main>

      <Footer />
    </>
  );
}
