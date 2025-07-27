
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationDropdownProps {
  onLocationSelect: (location: string) => void;
  selectedLocation: string;
}

const tamilNaduLocations = [
  "All of Tamil Nadu",
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Tiruppur",
  "Vellore",
  "Erode",
  "Thoothukkudi",
  "Dindigul",
  "Thanjavur",
  "Tirunelveli",
  "Hosur",
  "Nagercoil",
  "Kanchipuram",
  "Kumarapalayam",
  "Karaikkudi",
  "Neyveli",
  "Cuddalore"
];

export default function LocationDropdown({ onLocationSelect, selectedLocation }: LocationDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[250px] justify-between bg-white"
        >
          <span className="truncate">{selectedLocation}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[250px] p-0">
        <div className="max-h-[300px] overflow-y-auto">
          {tamilNaduLocations.map((location) => (
            <Button
              key={location}
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-start px-4 py-2 hover:bg-gray-100",
                selectedLocation === location && "bg-gray-100"
              )}
              onClick={() => {
                onLocationSelect(location);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedLocation === location ? "opacity-100" : "opacity-0"
                )}
              />
              {location}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
