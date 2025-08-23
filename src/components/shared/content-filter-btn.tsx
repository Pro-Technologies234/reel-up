'use client'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";


export function ContentFilterButtons() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search");
  const currentFilter = searchParams.get("filter");
  const searchPart = currentSearch ? `&search=${currentSearch}` : "";
  return (
    <div className="absolute top-2 left-2 rounded-xl not-md:w-dvw not-b not-md:overflow-x-scroll flex backdrop-blur-xl gap-2 p-1.5 z-2">
      {/* All button */}
      <Button
        variant={'outline'}
        size={'sm'}
        className={`${!currentFilter ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black hover:dark:bg-yellow-400 dark:bg-yellow-400 text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
      >
        <Link href={`/search${currentSearch ? `?search=${currentSearch}` : ""}`}>
            All
        </Link>
      </Button>
      <Button
          variant={'outline'}
          size={'sm'}
          className={`${currentFilter === 'reels' ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black dark:hover:bg-yellow-400 hover:bg-yellow-400  text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
          >
              <Link
                  href={`/search?filter=${'reels'}${searchPart}`}
              >
                  Reels
              </Link>
      </Button>
      <Button
          variant={'outline'}
          size={'sm'}
          className={`${currentFilter === 'products' ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black dark:hover:bg-yellow-400 hover:bg-yellow-400  text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
          >
              <Link
                  href={`/search?filter=${'products'}${searchPart}`}
              >
                  Products
              </Link>
      </Button>
      <Button
          variant={'outline'}
          size={'sm'}
          className={`${currentFilter === 'sellers' ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black dark:hover:bg-yellow-400 hover:bg-yellow-400  text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
          >
              <Link
                  href={`/search?filter=${'sellers'}${searchPart}`}
              >
                  Sellers
              </Link>
      </Button>
    </div>
  );
}
