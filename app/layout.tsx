import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LookLab - Instagram Transformation Automation",
  description: "Transform your Instagram engagement with AI-powered beauty and style automations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tremor/react@3.18.7/dist/tremor.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}



