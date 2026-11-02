"use client";

import { createContext, useContext, ReactNode } from "react";
import { type PortableTextBlock } from "sanity";

interface SanityImageDimensions {
  aspectRatio: number;
  height: number;
  width: number;
}

interface SanityImageMetadata {
  dimensions: SanityImageDimensions;
  lqip: string;
}

interface SanityImageAsset {
  _id: string;
  url: string;
  metadata: SanityImageMetadata;
}

interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface WorkItemImage {
  asset: SanityImageAsset;
  hotspot: SanityImageHotspot | null;
  crop: SanityImageCrop | null;
  alt: string | null;
}

export type Settings = {
  siteTitle?: string;
  siteSubTitle?: string;
  siteDescription?: string;
  siteEmail?: string;
  socials?: { title?: string; url?: string }[];
  copyrightText?: string;
  footerText?: string;
  availabilityText?: string;
  contactText?: string;
  contactTextEyebrow?: string;
};

export type WorkItems = {
  title?: string;
  client?: string;
  content?: string;
  year?: number;
  url?: string;
  tech?: { title: string }[];
};

export type WorkPageItems = {
  title?: string;
  content?: string;
  client?: string;
  image?: WorkItemImage;
  year?: number;
  url?: string;
  tech?: { title: string }[];
};

export type HomePage = {
  heroEyebrow?: string;
  heroText?: string;
  heroContent?: PortableTextBlock;
  techUsed?: { title: string }[];
  workHeading?: string;
  workContent?: PortableTextBlock;
  workItems?: WorkItems[];
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutContent?: PortableTextBlock;
  aboutStats?: { value?: number; content?: string; valuePlus?: boolean }[];
  footerEyebrow?: string;
  footerLinkText?: string;
};

export type WorkPage = {
  heading?: string;
  content?: PortableTextBlock;
  workItems?: WorkPageItems[];
};

type SanityData = {
  settings: Settings | null;
  homepage: HomePage | null;
  workpage: WorkPage | null;
};

const SanityDataContext = createContext<SanityData | null>(null);

export function SettingsProvider({
  data,
  children,
}: {
  data: SanityData;
  children: ReactNode;
}) {
  return (
    <SanityDataContext.Provider value={data}>
      {children}
    </SanityDataContext.Provider>
  );
}

export function useSanityData() {
  const context = useContext(SanityDataContext);
  if (!context) {
    throw new Error(
      "useSanityData must be used within a GlobalSettingsProvider",
    );
  }
  return context;
}

// Convenience hooks
export function useSettings() {
  return useSanityData().settings;
}

export function useHomepage() {
  return useSanityData().homepage;
}

export function useWorkpage() {
  return useSanityData().workpage;
}
