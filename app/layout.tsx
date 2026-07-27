import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Grain from "@/components/Grain";
import { client } from "@/sanity/lib/client";
import { cn } from "@/lib/utils";
import { GLOBAL_AND_HOMEPAGE_QUERY } from "@/sanity/queries/queries";
import { SettingsProvider } from "@/providers/sanityProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(
    GLOBAL_AND_HOMEPAGE_QUERY,
    {},
    {
      next: { tags: ["settings", "homepage"] },
    },
  );

  return {
    title: `${settings?.settings?.siteTitle ?? "Default Title"} - ${settings?.settings.siteSubTitle ?? ""}`,
    description: settings?.settings?.siteDescription ?? "Default description",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await client.fetch(
    GLOBAL_AND_HOMEPAGE_QUERY,
    {},
    {
      next: { tags: ["settings", "homepage"] },
    },
  );

  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          DMSans.variable,
          geistMono.variable,
          "font-sans",
          geist.variable,
        )}
      >
        <Grain />
        <CustomCursor />
        <SettingsProvider data={data}>{children}</SettingsProvider>
      </body>
    </html>
  );
}
