import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/request';

export default function TemplatesRedirectPage() {
  redirect(`/${defaultLocale}/templates`);
}
