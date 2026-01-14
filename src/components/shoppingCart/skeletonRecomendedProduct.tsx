import { Skeleton } from "../ui/skeleton";

export function SkeletonRecomendedProducts() {
  return (
    <div className="w-full flex flex-col gap-4 mt-10">
      <div className="flex gap-2">
        <Skeleton className="h-24 w-[60px] bg-gray-200" />
        <div className="flex-1">
          <Skeleton className="h-3 w-24 bg-gray-200 mt-1" />
          <Skeleton className="h-3 w-10 bg-gray-200 mt-4" />
          <Skeleton className="h-5 w-full bg-gray-200 mt-8" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-24 w-[60px] bg-gray-200" />
       <div className="flex-1">
          <Skeleton className="h-3 w-24 bg-gray-200 mt-1" />
          <Skeleton className="h-3 w-10 bg-gray-200 mt-4" />
          <Skeleton className="h-5 w-full bg-gray-200 mt-8" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-24 w-[60px] bg-gray-200" />
       <div className="flex-1">
          <Skeleton className="h-3 w-24 bg-gray-200 mt-1" />
          <Skeleton className="h-3 w-10 bg-gray-200 mt-4" />
          <Skeleton className="h-5 w-full bg-gray-200 mt-8" />
        </div>
      </div>
    </div>
  );
}
