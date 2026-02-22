import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/common.css";
import HeaderComponent from "@/components/layout/Header";
import FooterComponent from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://xai-tau-two.vercel.app/"),

  title: {
    default: "Xai - Intelligence Workspace",
    template: "%s — Xai Intelligence Workspace",
  },

  description:
    "Xai transforms raw data into structured intelligence, actionable insights, and AI-powered automations — all in one calm, high-performance workspace.",

  keywords: [
    "Xai",
    "AI workspace",
    "data intelligence",
    "AI insights",
    "automation platform",
    "machine learning UI",
    "data analytics dashboard",
  ],

  authors: [{ name: "Md. Salman Ezaz" }],
  creator: "Md. Salman Ezaz",
  publisher: "Xai",

  openGraph: {
    title: "Xai - Intelligence Workspace",
    description:
      "From raw data → structured intelligence → actionable insight → AI automations.",
    url: "https://xai-tau-two.vercel.app/",
    siteName: "Xai",
    images: [
      {
        url: "https://images2.imgbox.com/d5/54/9ej6eWfw_o.jpg",
        width: 1200,
        height: 630,
        alt: "Xai Intelligence Workspace",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Xai - Intelligence Workspace",
    description: "Turn raw data into intelligence and automation with Xai.",
    images: ["https://images2.imgbox.com/d5/54/9ej6eWfw_o.jpg"],
    creator: "@salman_ezaz",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
  themeColor: "#05070c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh w-full flex justify-between flex-col`}
      >
        <HeaderComponent />
        <div className="flex-1">{children}</div>
        <FooterComponent />
      </body>
    </html>
  );
}
