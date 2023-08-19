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
import { ScrollArea } from "./ui/scroll-area"

function CommandItems({indicators, category, value, onSelect}: {indicators: Indicator[], category: string, value: string, onSelect: any}) {
    return (
        <>
        {indicators.filter((indicator) => indicator.category == category).map((indicator) => (
            <CommandItem
              key={indicator.value}
              value={indicator.value}
              onSelect={onSelect}
              className="text-left"
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
        </>
    )
}

export function IndicatorSelector({indicator, setIndicator}: {indicator: Indicator, setIndicator: any}) {
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
        <PopoverContent className="w-[200px] h-[500px] p-0 z-[5000]">
          <Command>
            <CommandInput placeholder="Search indicators..." />
            <ScrollArea>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandItems indicators={indicators} category="top" value={indicator.value} onSelect={onSelect} />
            <CommandSeparator />
            <CommandGroup heading="Lab leak">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="lab-leak-risk-burden" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="lab-leak-risk-mitigation" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Zoonotic">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="zoonotic-risk-burden" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="zoonotic-risk-mitigation" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
            <CommandGroup heading="Bioweapons">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="bioweapons-risk-burden" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="bioweapons-risk-mitigation" value={indicator.value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
        
      </Popover>
    )
  }
