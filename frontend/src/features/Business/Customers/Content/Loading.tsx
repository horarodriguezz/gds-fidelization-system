import React from "react";
import { Skeleton } from "../../../../components/ui/skeleton";

function Loading() {
  return (
    <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8 grow overflow-hidden flex flex-col'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:h-[138px]'>
        <Skeleton className='bg-border w-full h-[138px] lg:h-full' />

        <Skeleton className='bg-border w-full h-[138px] lg:h-full' />

        <Skeleton className='bg-border w-full h-[138px] lg:h-full' />

        <Skeleton className='bg-border w-full h-[138px] lg:h-full' />
      </div>

      <Skeleton className='w-full h-[86px] mb-6 bg-border' />

      <div className='w-full grow overflow-hidden'>
        <Skeleton className='bg-border w-full h-[400px]' />
      </div>
    </main>
  );
}

export default React.memo(Loading);
