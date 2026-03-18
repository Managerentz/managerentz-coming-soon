import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MANAGERENTZ | The Future of Rental Operations",
  description: "MANAGERENTZ is the ultimate workspace for rental operations. Streamline your workflow, manage inventory, and grow your business with ease.",
  keywords: ["rentals", "rental operations", "inventory management", "rental software", "managerentz"],
  authors: [{ name: "MANAGERENTZ INC" }],
  openGraph: {
    title: "MANAGERENTZ | The Future of Rental Operations",
    description: "The ultimate workspace for rental operations.",
    url: "https://managerentz-coming-soon.vercel.app/",
    siteName: "MANAGERENTZ",
    images: [
      {
        url: "/og-image.png", // They might want to add this later, but I'll set it up
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MANAGERENTZ | The Future of Rental Operations",
    description: "The ultimate workspace for rental operations.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
