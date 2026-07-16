import { Skeleton } from "@/components/ui/skeleton";

export function HomeLoadingSkeleton() {
  return (
    <div
      aria-label="Загружаем страницу"
      className="min-h-screen bg-[#fafaf7]"
      role="status"
    >
      <span className="sr-only">Загружаем страницу</span>

      <div
        aria-hidden="true"
        data-testid="loading-skeleton-content"
      >
        <div className="h-16 border-b border-neutral-200/70 md:h-20">
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
            <Skeleton className="h-5 w-40 sm:w-56" />
            <div className="flex items-center gap-3">
              <Skeleton className="hidden size-10 rounded-full md:block" />
              <Skeleton className="h-11 w-28" />
            </div>
          </div>
        </div>

        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-[1440px] items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 xl:gap-16 xl:px-16">
          <div className="lg:col-span-5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="mt-7 h-16 w-full max-w-md sm:h-24" />
            <Skeleton className="mt-4 h-16 w-[88%] max-w-sm sm:h-24" />
            <Skeleton className="mt-8 h-7 w-52" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-[3.75rem] w-full sm:w-56" />
              <Skeleton className="h-[3.75rem] w-full sm:w-48" />
            </div>
          </div>

          <Skeleton
            className="min-h-[32rem] rounded-[1.75rem] sm:min-h-[38rem] lg:col-span-7 lg:h-[calc(100svh-8rem)] lg:max-h-[760px] lg:min-h-[620px]"
            data-testid="hero-media-skeleton"
          />
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-12 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28 xl:px-16">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="mt-5 h-12 w-full max-w-xl" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                className="h-56 rounded-[1.5rem]"
                data-testid="benefit-skeleton"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
