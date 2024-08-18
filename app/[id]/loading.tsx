import Skeleton from "../components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-[65ch] mx-auto space-y-4">
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-8 w-1/2" />

      <div className="flex gap-4">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
      </div>
    </div>
  );
}
