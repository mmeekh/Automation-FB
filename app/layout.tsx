import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LookLab - Instagram Transformation Automation",
  description: "Transform your Instagram engagement with AI-powered beauty and style automations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Locale layout handles html/body tags
  return children;
}
