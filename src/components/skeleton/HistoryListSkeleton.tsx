import { Skeleton } from "../ui/skeleton";

export default function HistoryListSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-[340px]" />

      <div className="flex items-center justify-center mt-3 gap-x-5 md:justify-end">
        <Skeleton className="w-1/3 md:w-1/7 h-[35px]" />
        <Skeleton className="w-10 h-7" />
        <Skeleton className="w-1/3 md:w-1/7 h-[35px]" />
      </div>
    </>
  );
}
