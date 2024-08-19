import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="font-secondary text-2xl">🥺 Not Found</h1>
      <Link href="/" className="underline text-primary hover:text-primary/80">
        Return Home
      </Link>
    </section>
  );
}
