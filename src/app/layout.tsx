import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/session-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Café del Roble — Café de especialidad colombiano",
    template: "%s | Café del Roble",
  },
  description:
    "Descubre nuestro café de especialidad cultivado en las montañas colombianas. Variedad de granos seleccionados, tuestes artesanales y envío a todo el país.",
  keywords: ["café", "café de especialidad", "café colombiano", "café del roble", "café molido", "café en grano"],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Café del Roble",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <QueryProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "white",
                  border: "1px solid #e7e5e4",
                  color: "#1c1917",
                },
              }}
            />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
