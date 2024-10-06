import Image from "next/image";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import Tags from "./components/Tags";
import { format } from "date-fns";

export default function Home() {
  // sorting blog is descending order
  const sortedBlogs = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
      {sortedBlogs.map(({ _id, imageUrl, title, tags, url, summary, date }) => (
        <div key={_id}>
          <Link
            href={url}
            tabIndex={-1}
            className="block relative aspect-video w-full rounded-md overflow-hidden bg-gray-400"
          >
            <Image
              fill
              src={imageUrl}
              className="h-full w-full object-cover"
              alt={`${title} cover-pic`}
              sizes="600px"
            />
          </Link>

          <div className="mt-2 flex items-center justify-between">
            <Tags list={tags} />

            <time className="shrink-0 text-sm text-gray-500">
              {format(new Date(date), "dd, LLL uuuu")}
            </time>
          </div>

          <Link
            href={url}
            className="font-secondary text-2xl inline-block mt-2 hover:text-primary cursor-pointer transition-colors font-semibold"
          >
            {title}
          </Link>

          <p className="text-gray-500">{summary}</p>
        </div>
      ))}
    </section>
  );
}
