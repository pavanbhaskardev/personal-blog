import React from "react";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import Tags from "../components/Tags";
import type { Metadata } from "next";
import { MDXComponents } from "../components/MDXComponents";
import Link from "next/link";
import Views from "../components/Views";

export const generateStaticParams = async () =>
  allBlogs.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.id);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: "Pavan Bhaskar", url: "https://pavanbhaskar.com" }],
    openGraph: {
      title: post.title,
      description: post.summary,
      url: "https://blog.pavanbhaskar.com",
      siteName: "Blog",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          height: 630,
          width: 1200,
          alt: `${post.title} og image`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
};

const BlogIDPage = ({ params }: { params: { id: string } }) => {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.id);
  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  // calculates the read-time
  const readTime = () => {
    const contentLength = post.body.raw.toString().split("").length;
    const time = Math.ceil(contentLength / 200);

    return time;
  };

  return (
    <>
      <article className="prose w-full lg:prose-xl prose-headings:font-secondary prose-gray mx-auto prose-headings:text-text prose-a:after:content-['↗'] prose-blockquote:border-primary prose-blockquote:py-1 prose-blockquote:bg-primary/10">
        <Link href="/" className="after:!content-none">
          {"<-"} All Posts
        </Link>

        <div className="relative not-prose aspect-video rounded-md overflow-hidden my-4 bg-slate-400">
          <Image
            src={post.imageUrl}
            fill
            unoptimized={post.imageUrl.includes("gif")}
            alt={`${post.title} cover pic`}
            className="w-full h-full object-cover"
            sizes="800px"
          />
        </div>

        <h1>{post.title}</h1>

        <div className="flex items-center justify-between">
          <time>{format(new Date(post.date), "dd, LLL uuuu")}</time>

          <div className="flex gap-4 items-center">
            <Views slug={params.id} />
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              {`${readTime()} mins`}
            </span>
          </div>
        </div>

        <Tags list={post.tags} className="my-2" />

        <MDXContent components={MDXComponents} />
      </article>
    </>
  );
};

export default BlogIDPage;
