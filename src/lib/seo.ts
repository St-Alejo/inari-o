import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex,
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} — Productos Apple Originales · Nariño, Colombia`;
  const desc = description ?? siteConfig.description;
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = image ?? `${siteConfig.url}/opengraph-image`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    keywords: [
      "Apple",
      "iPhone",
      "AirPods",
      "Apple Watch",
      "Pasto",
      "Nariño",
      "Colombia",
      "celulares",
      "refurbished",
      "Inariño",
    ],
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "CO",
        availableLanguage: ["Spanish"],
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: siteConfig.name,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: "Nariño",
      addressCountry: "CO",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: siteConfig.cities,
  };
}
