import Image from "next/image";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import Link from "next/link";

// this will generate a ID
function generateId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const MDXComponents: MDXComponentsType = {
  img: ({ src, alt }) => {
    return (
      <div className="relative aspect-video not-prose rounded-md overflow-hidden mb-4 bg-slate-400">
        <Image
          src={`${src}`}
          fill
          alt={`${alt} cover pic`}
          className="w-full h-full object-contain"
        />
      </div>
    );
  },
  H2: ({ children }) => {
    const id = generateId(`${children?.toString()}`);

    return (
      <h2 id={id} className="hover:!text-text/80 group">
        <Link href={`#${id}`} className="not-prose flex gap-2 items-center">
          {children}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 invisible group-hover:visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </Link>
      </h2>
    );
  },
  a: ({ children, href }) => {
    const target =
      href?.includes("http") || href?.includes("https") ? "_blank" : "";

    return (
      <Link href={href as string} target={target}>
        {children}
      </Link>
    );
  },
};
