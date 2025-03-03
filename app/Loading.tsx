import { Skeleton } from "@/components/ui/skeleton";



export default function Loading() {
    return(

        <div className="flex flex-col space-y-3 justify-center items-center h-full">
        <Skeleton className="h-[325px] w-[450px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
    )
  
  }