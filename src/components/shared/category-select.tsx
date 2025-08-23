'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { ProductCategory } from "@/lib/prisma"

interface CategorySelectProps {
  categories: ProductCategory[]
  onValueChange?: (newValue:string) => void
}

export function CategorySelect({ categories, onValueChange }: CategorySelectProps) {
  const [value, setValue] = useState('')

  useEffect(()=>{
    if (onValueChange)
      onValueChange(value)
  },[value,onValueChange])


  
  return (
    <Select onValueChange={(newValue)=>(setValue(newValue))} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select this product category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Product Categories</SelectLabel>
          {
            categories.map((category,indx)=>(
              <SelectItem key={indx} value={category.name} className="capitalize" >{category.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
