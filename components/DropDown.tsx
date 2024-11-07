"use client";

import * as React from "react";
import { ChevronsUpDown, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define the type for an option which can be either a string or an object with value and label
type OptionType = { value: string; label: string } | string;

interface DropdownProps {
  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  options: OptionType[];
}

export default function DropDown({
  options,
  selected,
  setSelected,
  placeholder = "Select an option...",
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);

  // Helper function to extract label from either a string or an object option
  const getLabel = (option: OptionType): string => {
    return typeof option === "string" ? option : option.label;
  };

  // Helper function to extract value from either a string or an object option
  const getValue = (option: OptionType): string => {
    return typeof option === "string" ? option : option.value;
  };

  // Deduplicate options based on value
  const uniqueOptions = Array.from(
    new Set(options.map((option) => getValue(option)))
  ).map((value) => options.find((option) => getValue(option) === value)!);

  // Find the label for the currently selected value
  const selectedLabel = uniqueOptions.find(
    (option) => getValue(option) === selected
  );
  const displayLabel = selectedLabel ? getLabel(selectedLabel) : placeholder;

  // Ref for scrolling to the selected item
  const selectedItemRef = React.useRef<HTMLDivElement | null>(null);

  // Handler for opening the dropdown and scrolling to the selected item
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    const timeout = setTimeout(() => {
      if (isOpen && selectedItemRef.current) {
        // Ensure scroll happens after rendering with requestAnimationFrame
        requestAnimationFrame(() => {
          selectedItemRef.current?.scrollIntoView({
            block: "center",
            inline: "nearest",
          });
        });
      }
      clearTimeout(timeout);
    }, 100);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          <span className="truncate" title={displayLabel}>
            {displayLabel}
          </span>
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
          <CommandList className="overflow-y-auto max-h-60">
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {uniqueOptions.map((option) => {
                const optionValue = getValue(option);
                const optionLabel = getLabel(option);

                return (
                  <CommandItem
                    key={optionValue}
                    value={optionValue}
                    onSelect={(currentValue: string) => {
                      setSelected(
                        currentValue === selected ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                    ref={optionValue === selected ? selectedItemRef : null}
                  >
                    <span className="w-full truncate" title={optionLabel}>
                      {optionLabel}
                    </span>
                    <CheckCheck
                      className={`ml-2 h-4 w-4 text-emerald-500 ${
                        selected === optionValue ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
