import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filterPart = currentFilter ? `filter=${currentFilter}&` : "";
    router.push(`/search?${filterPart}search=${encodeURIComponent(query)}`);
    setIsOpen(false); // close modal after search on mobile
  };

  return (
    <>
      {/* Overlay for mobile modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 w-full h-full bg-black/30 z-20 md:hidden"
        />
      )}
      {/* Desktop search bar */}
      <div className="hidden md:flex items-center w-full">
        <form
          onSubmit={handleSearch}
          className="w-full md:w-80 flex items-center dark:bg-zinc-950 bg-zinc-50 dark:text-white  rounded-2xl border dark:border-zinc-800 border-zinc-200 z-10"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="p-2 px-4 focus:outline-none border-none outline-none w-full"
          />
          <Button
            type="submit"
            size={"icon"}
            className="rounded-xl scale-80 bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer"
          >
            <Search />
          </Button>
        </form>
      </div>
      {/* Mobile search button */}
      <div className="flex md:hidden items-center w-full">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-xl w-full bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer"
          >
            <Search />
            Search
          </Button>
        )}
      </div>
      {/* Mobile modal search bar */}
      {isOpen && (
        <div className="fixed left-0 right-0 top-0 z-30 px-4 gap-4 dark:bg-black bg-white py-2 md:hidden flex items-center w-full">
          <Button
            onClick={() => setIsOpen(false)}
            variant={"ghost"}
            size={"icon"}
            className="z-30"
          >
            <ArrowLeft />
          </Button>
          <form
            onSubmit={handleSearch}
            className="w-full flex items-center dark:bg-zinc-950 bg-zinc-50 dark:text-white p-1 rounded-2xl border dark:border-zinc-800 border-zinc-200 z-10"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="p-2 focus:outline-none border-none outline-none w-full"
            />
            <Button
              type="submit"
              size={"icon"}
              className="rounded-xl bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer"
            >
              <Search />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
