import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonSummary() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[90px] w-[400px] rounded-xl bg-gray-100" />
      <Skeleton className="h-[90px] w-[400px] rounded-xl bg-gray-100" />
     
    </div>
)
}


