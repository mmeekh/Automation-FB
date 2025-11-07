import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function DataDeletionRedirectPage() {
  redirect(`/${defaultLocale}/legal/data-deletion`);
}
