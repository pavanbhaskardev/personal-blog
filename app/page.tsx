import Image from "next/image";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import Tags from "./components/Tags";

export default function Home() {
  // sorting blog is descending order
  const sortedBlogs = allBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="grid sm:grid-cols-2 gap-6">
      {sortedBlogs.map((details) => (
        <div key={details._id}>
          <div className="relative aspect-video w-full rounded-md overflow-hidden bg-gray-400">
            <Image
              fill
              src={details.imageUrl}
              className="h-full w-full object-cover"
              alt={`${details.title} cover-pic`}
              sizes="600px"
            />
          </div>

          <Link
            href={details.url}
            className="font-secondary text-2xl inline-block mt-2 hover:text-primary cursor-pointer transition-colors font-semibold"
          >
            {details.title}
          </Link>

          <p className="text-gray-500">{details.summary}</p>

          <Tags list={details.tags} className="mt-1" />
        </div>
      ))}
    </section>
  );
}
