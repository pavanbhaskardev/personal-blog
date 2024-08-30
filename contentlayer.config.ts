import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  contentType: "mdx",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "date", required: true },
    imageUrl: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => `/${blog._raw.flattenedPath}`,
    },
  },
}));

const rehypePrettyCodeOptions: Partial<Options> = {
  // use a prepackaged theme
  theme: "slack-dark",
};

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions] as unknown as any,
    ],
  },
});

export default contentLayerConfig;
