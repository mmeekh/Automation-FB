import { redirect } from 'next/navigation';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Redirect directly to dashboard (auth modal handles login)
  redirect(`/${params.locale}/dashboard`);
}
