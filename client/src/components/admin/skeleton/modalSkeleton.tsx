import { Skeleton } from "@/components/ui/skeleton"

export function ModalEditSkeleton() {
  return (
    <div className="flex  space-x-3  ">
      <Skeleton className="h-[400px] w-[400px] rounded-xl bg-gray-100" />
      <div className="flex flex-col justify-between ">
        <div className="space-y-5">
          <div className="space-y-2">
            <Skeleton className=" mt-2 h-2.5 w-[60px] rounded-xl bg-gray-100" />
            <Skeleton className="h-[35px] w-[430px] rounded-xl bg-gray-100" />
          </div>
          <div className="space-y-2">
            <Skeleton className=" mt-2 h-2.5 w-[60px] rounded-xl bg-gray-100" />
            <Skeleton className="h-[100px] w-[430px] rounded-xl bg-gray-100" />
          </div>
          <div className="space-y-2">
            <Skeleton className=" mt-2 h-2.5 w-[60px] rounded-xl bg-gray-100" />
             <Skeleton className="h-[35px] w-[430px] rounded-xl bg-gray-100" />
          </div>
        </div>
         <div className="flex gap-2 items-center justify-end">

           <Skeleton className="h-[35px] w-24 rounded-xl bg-gray-100" />
           <Skeleton className="h-[35px] w-40 rounded-xl bg-gray-100" />
        </div>
      </div>
     
    </div>
)
}


