import type { Metadata } from "next";
import { Inter, Rubik_Moonrocks } from 'next/font/google';
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const rubikMoonrocks = Rubik_Moonrocks({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-moonrocks',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "LookLab - Instagram Transformation Automation",
  description: "Transform your Instagram engagement with AI-powered beauty and style automations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={rubikMoonrocks.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tremor/react@3.18.7/dist/tremor.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


