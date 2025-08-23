'use client'
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

export const FilterBtn = ({filter}:{filter:{name: string, label: string}})=> {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search");
  const currentFilter = searchParams.get("filter");
  const searchPart = currentSearch ? `&search=${currentSearch}` : "";
    return(
      <Button
          variant={'outline'}
          size={'sm'}
          className={`${currentFilter === 'reels' ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black dark:hover:bg-yellow-400 hover:bg-yellow-400  text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
          >
              <Link
                  href={`/${'search'}?filter=${filter.name}${searchPart}`}
              >
                  {filter.label}
              </Link>
      </Button>
    )
}