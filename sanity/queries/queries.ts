import { groq } from "next-sanity";

export const GLOBAL_AND_HOMEPAGE_QUERY = groq`{
  "homepage": *[_type == "homepage"][0]{
    heroEyebrow,
    heroText,
    heroContent,
    "techUsed": techUsed[]{
      title
    },
    workHeading,
    workContent,
    "workItems": workItems[]{
      title,
      content,
      year,
      url,
      "tech": tech[]{
        title
      }
    },
    aboutEyebrow,
    aboutTitle,
    aboutContent,
    "aboutStats": aboutStats[]{
      value,
      content,
      valuePlus
    },
    footerEyebrow,
    footerLinkText
  },
  "settings": *[_type == "settings"][0]{
    siteTitle,
    siteSubTitle,
    siteDescription,
    availabilityText,
    siteEmail,
    "socials": socials[]{
      title,
      url
    },
    contactText,
    contactTextEyebrow,
    copyrightText,
    footerText
  }
}`;
