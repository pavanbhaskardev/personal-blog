import Image from "next/image";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

export const MDXComponents: MDXComponentsType = {
  img: ({ src, alt }) => {
    return (
      <div className="relative h-96 not-prose rounded-md overflow-hidden mb-4 bg-slate-400">
        <Image
          src={`${src}`}
          fill
          alt={`${alt} cover pic`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  },
};
