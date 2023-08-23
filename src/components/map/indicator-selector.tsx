'use client'

import { useState, useContext } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Indicator, indicators } from "@/lib/indicators"
import { ScrollArea } from "../ui/scroll-area"

function CommandItems({ indicators, category, value, onSelect }: { indicators: Indicator[], category: string, value: string, onSelect: any }) {

  // Get top item
  const heading_item = indicators.find((indicator) => indicator.value == category)

  return (
    <>
    {heading_item &&
      <CommandItem
        key={heading_item.value}
        value={heading_item.value}
        onSelect={onSelect}
        className="text-left font-bold">
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === heading_item.value ? "opacity-100" : "opacity-0"
          )}
        />
        {heading_item.label}
      </CommandItem>
    }
    <CommandGroup>

      {indicators.filter((indicator) => indicator.category == category).map((indicator) => (
        <CommandItem
          key={indicator.value}
          value={indicator.value}
          onSelect={onSelect}
          className="text-left text-xs"
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              value === indicator.value ? "opacity-100" : "opacity-0"
            )}
          />
          {indicator.label}
        </CommandItem>
      ))}
    </CommandGroup>
    </>
  )
}

export function IndicatorSelector({ indicator, setIndicator }: { indicator: Indicator, setIndicator: any }) {
  const [open, setOpen] = useState(false)

  const onSelect = (currentValue: string) => {
    setIndicator(indicators.find((indicator) => indicator.value == currentValue))
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {indicator.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] h-[500px] p-0 z-[5000]">
        <Command>
          <CommandInput placeholder="Search indicators..." />
          <ScrollArea>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandItems indicators={indicators} category="gcbr-index" value={indicator.value} onSelect={onSelect} />
            <CommandSeparator />
            <CommandGroup heading="Lab leak">
              <CommandItems indicators={indicators} category="lab-leak-risk-burden" value={indicator.value} onSelect={onSelect} />
              <CommandItems indicators={indicators} category="lab-leak-mitigating-countermeasures" value={indicator.value} onSelect={onSelect} />
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Zoonotic">
              <CommandItems indicators={indicators} category="zoonotic-risk-burden" value={indicator.value} onSelect={onSelect} />
              <CommandItems indicators={indicators} category="zoonotic-mitigating-countermeasures" value={indicator.value} onSelect={onSelect} />
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>

    </Popover>
  )
}
