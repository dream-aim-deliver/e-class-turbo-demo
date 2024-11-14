import type { Metadata } from "next";
import { Nunito, Raleway, Roboto } from 'next/font/google';
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/Contextprovider/Themecontext";

// Font definitions
const nunito = Nunito({
  weight: ["400", "700"],
  variable: "--font-nunito",
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ["400", "700"],
  variable: "--font-raleway",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }


  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${nunito.variable} ${roboto.variable} ${raleway.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="w-full min-h-screen  bg-surfacecolour">
              <Navbar locale={locale} />
              <main className="flex flex-1 pt-16">{children}</main>
              <footer className="bg-surface/50 backdrop-blur-sm py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center text-secondary">
                    <p>© 2024 Your Project. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}