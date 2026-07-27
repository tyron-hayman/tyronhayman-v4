import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface SanityImageValue {
  _type: "image";
  _key: string;
  imageUrl: string;
  alt?: string;
}

interface CodeValue {
  _type: "code";
  _key: string;
  code: string;
  language?: string;
}

interface LinkMarkValue {
  _type: "link";
  href: string;
}

// --- Components ----------------------------------------------------------

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue }) => (
      <img src={value.imageUrl} alt={value.alt || ""} />
    ),
    code: ({ value }: { value: CodeValue }) => (
      <pre>
        <code>{value.code}</code>
      </pre>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: LinkMarkValue;
    }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold">{children}</h1>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5">{children}</ul>
    ),
  },
};

// --- Root component --------------------------------------------------------

interface MyComponentProps {
  value: PortableTextBlock[];
}

export default function PortableTextEditor({ value }: MyComponentProps) {
  return <PortableText value={value} components={components} />;
}
