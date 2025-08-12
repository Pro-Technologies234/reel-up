import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CreateProductDialog, CreateReelDialog } from "./forms"

export function CreatePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button size={'sm'} className={`cursor-pointer tracking-wider not-md:hidden rounded-lg bg-yellow-300 text-black hover:bg-yellow-400 px-6`}>
            CREATE
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-2xl p-1.5 ">
        <div className="space-y-2 rounded-lg p-2" >
            <h2 className="text-sm" >Create a product for your brand, bussiness, or something you want to sell.</h2>
            <div className="flex justify-end" > 
                <CreateProductDialog/>
            </div>
        </div>
        <div className="space-y-2 rounded-lg p-2" >
            <h2 className="text-sm" >Create and showcase reel for your brand, bussiness, or something you want to sell.</h2>
            <div className="flex justify-end" > 
                <CreateReelDialog/>
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
