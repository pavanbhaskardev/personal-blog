import Image from "next/image";
import { allBlogs, type Blog } from "contentlayer/generated";
import Link from "next/link";
import Tags from "./components/Tags";

export default function Home() {
  console.log({ allBlogs });

  return (
    <section className="grid sm:grid-cols-2">
      {allBlogs.map((details) => (
        <div key={details._id}>
          <div className="relative h-80 w-full rounded-md overflow-hidden bg-gray-400">
            <Image
              fill
              src={details.imageUrl}
              className="h-full w-full object-cover"
              alt="cover-pic"
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
