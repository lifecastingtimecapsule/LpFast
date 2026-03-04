"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "../Icons";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const mergedClassNames = {
    months: "flex flex-col sm:flex-row gap-6",
    month: "flex flex-col gap-5 w-full",
    caption: "flex justify-center pt-1 relative items-center w-full",
    caption_label: "text-base font-semibold text-[#2C2C2C] tracking-wide",
    nav: "flex items-center gap-1",
    nav_button: cn(
      "inline-flex items-center justify-center size-9 rounded-lg border border-[#E5E0D8] bg-white text-[#2C2C2C] hover:bg-[#C4A962]/10 hover:border-[#C4A962]/40 hover:text-[#C4A962] transition-colors",
    ),
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse table-fixed",
    head_row: "w-full",
    head_cell:
      "text-center text-[11px] font-medium text-[#666666] uppercase tracking-wider pb-1",
    row: "w-full",
    cell: cn(
      "relative p-0.5 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:rounded-lg",
      props.mode === "range"
        ? "[&:has(>.day-range-end)]:rounded-r-lg [&:has(>.day-range-start)]:rounded-l-lg first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg"
        : "[&:has([aria-selected])]:rounded-lg",
    ),
    day: cn(
      "inline-flex items-center justify-center size-9 rounded-lg font-medium transition-colors",
      "hover:bg-[#C4A962]/15 hover:text-[#2C2C2C]",
      "aria-selected:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A962]/50 focus-visible:ring-offset-2",
    ),
    day_range_start:
      "day-range-start aria-selected:bg-[#C4A962] aria-selected:text-white",
    day_range_end:
      "day-range-end aria-selected:bg-[#C4A962] aria-selected:text-white",
    day_selected:
      "bg-[#C4A962] text-white hover:bg-[#B39952] hover:text-white focus:bg-[#C4A962] focus:text-white",
    day_today: "bg-[#C4A962]/15 text-[#2C2C2C] font-semibold ring-1 ring-[#C4A962]/30",
    day_outside:
      "day-outside text-[#AAAAAA] aria-selected:text-[#AAAAAA] aria-selected:bg-transparent",
    day_disabled: "text-[#CCCCCC] hover:bg-transparent hover:text-[#CCCCCC] cursor-not-allowed",
    day_range_middle:
      "aria-selected:bg-[#C4A962]/20 aria-selected:text-[#2C2C2C]",
    day_hidden: "invisible",
    ...classNames,
  };
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={mergedClassNames}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
