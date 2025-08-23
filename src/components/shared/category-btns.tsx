'use client'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCategory } from "@/lib/prisma";
import { Button } from "../ui/button";


export function CategoryButtons({ categories }: {categories: ProductCategory[]}) {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search");
  const currentCategory = searchParams.get("category");

  return (
    <div className="absolute top-2 left-2 rounded-xl not-md:w-dvw not-b not-md:overflow-x-scroll flex backdrop-blur-xl gap-2 p-1.5 z-2">
      {/* All button */}
      <Button
        variant={'outline'}
        size={'sm'}
        className={`${!currentCategory ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black hover:dark:bg-yellow-400 dark:bg-yellow-400 text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
      >
        <Link href={`/shop${currentSearch ? `?search=${currentSearch}` : ""}`}>
            All
        </Link>
      </Button>
      {categories.map((category) => {
        const searchPart = currentSearch ? `&search=${currentSearch}` : "";
        return (
            <Button
                key={category.id}
                variant={'outline'}
                size={'sm'}
                className={`${category.name === currentCategory ? 'bg-yellow-300 dark:bg-yellow-300 hover:text-black dark:hover:text-black dark:hover:bg-yellow-400 hover:bg-yellow-400  text-black' :'bg-white dark:bg-black dark:hover:bg-black hover:bg-white text-black dark:text-white'} tracking-wider rounded-lg`}
                >
                    <Link
                        key={category.id}
                        href={`/shop?category=${category.name}${searchPart}`}
                    >
                        {category.name}
                    </Link>
            </Button>
        );
      })}
    </div>
  );
}
