'use client'

import * as React from "react"
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

function CommandItems({indicators, category, value, onSelect}: {indicators: Indicator[], category: string, value: string, onSelect: any}) {
    return (
        <>
        {indicators.filter((indicator) => indicator.category == category).map((indicator) => (
            <CommandItem
              key={indicator.value}
              value={indicator.value}
              onSelect={onSelect}
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

export function IndicatorSelector() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("gcbr-index")

    const onSelect = (currentValue: string) => {
        setValue(currentValue)
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
            {value
              ? indicators.find((indicator) => indicator.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 z-[5000]">
          <Command>
            <CommandInput placeholder="Search indicator..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandItems indicators={indicators} category="top" value={value} onSelect={onSelect} />
            <CommandGroup heading="Lab leak">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="lab-leak-risk-burden" value={value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="lab-leak-risk-mitigation" value={value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
            <CommandGroup heading="Zoonotic">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="zoonotic-risk-burden" value={value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="zoonotic-risk-mitigation" value={value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
            <CommandGroup heading="Bioweapons">
                <CommandGroup heading="Risk burden">
                    <CommandItems indicators={indicators} category="bioweapons-risk-burden" value={value} onSelect={onSelect} />
                </CommandGroup>
                <CommandGroup heading="Risk mitigation efforts">
                    <CommandItems indicators={indicators} category="bioweapons-risk-mitigation" value={value} onSelect={onSelect} />
                </CommandGroup>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
