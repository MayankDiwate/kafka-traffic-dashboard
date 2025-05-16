"use client";

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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Store } from "lucide-react";
import { useState } from "react";

// Mock store data - in a real app, this would come from an API
const stores = [
  { id: 10, name: "Store #10 - Main Street" },
  { id: 11, name: "Store #11 - Downtown" },
  { id: 12, name: "Store #12 - Westside Mall" },
  { id: 13, name: "Store #13 - Eastside Plaza" },
  { id: 14, name: "Store #14 - North Avenue" },
];

export default function StoreSelector({
  selectedStore,
  onStoreChange,
}: {
  selectedStore: number;
  onStoreChange: (storeId: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedStoreName =
    stores.find((store) => store.id === selectedStore)?.name ||
    `Store #${selectedStore}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-[250px]"
        >
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span>{selectedStoreName}</span>
          </div>
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[250px]">
        <Command>
          <CommandInput placeholder="Search stores..." />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup>
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  value={store.name}
                  onSelect={() => {
                    onStoreChange(store.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStore === store.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {store.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
