import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Horizon Group – Study & Document Services in Ankara",
    template: "%s | Horizon Group",
  },
  description:
    "Certified translation, university admissions, and document legalization in Ankara, Turkey. Trusted by 500+ students.",
  keywords: [
    "study in Turkey",
    "certified translation Ankara",
    "university admissions Turkey",
    "document legalization Ankara",
  ],
  metadataBase: new URL("https://www.horizonstudy.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Horizon Group",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
