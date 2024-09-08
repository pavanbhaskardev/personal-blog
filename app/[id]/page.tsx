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

  return (
    <>
      <article className="prose w-full lg:prose-xl prose-headings:font-secondary prose-gray mx-auto prose-headings:text-text">
        <Link href="/">{"<- "}All Posts</Link>

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

        <time>{`Posted on ${format(
          new Date(post.date),
          "dd, LLL uuuu"
        )}`}</time>

        <Tags list={post.tags} className="my-2" />

        <MDXContent components={MDXComponents} />
      </article>
    </>
  );
};

export default BlogIDPage;
