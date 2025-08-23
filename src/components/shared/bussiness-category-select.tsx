import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BussinessCategorySelect() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item) // remove
        : [...prev, item] // add
    )
  }

  const categories = ["Fashion", "Technology", "Digital Art", "Food", "Music"]

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full" >
            {selected.length > 0
              ? `Selected (${selected.length})`
              : "Select Categories"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {categories.map((cat) => (
            <DropdownMenuCheckboxItem
              key={cat}
              checked={selected.includes(cat)}
              onCheckedChange={() => toggleItem(cat)}
            >
              {cat}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Show selected list */}
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-yellow-300 text-yellow-300 bg-primary/10 text-primary px-3 py-1 text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
