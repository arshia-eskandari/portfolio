"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Checkbox } from "./Checkbox";
import { Label } from "./Label";

interface IDatePickerWithRange extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}
export function DatePickerWithRange({
  className,
  date,
  setDate,
}: IDatePickerWithRange) {
  return (
    <div className={cn("my-3 grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild className="focus:ring-2">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal ring-1 focus:ring-2",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {date?.to ? format(date.to, "LLL dd, y") : "Present"}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            className="inline-block ring-1"
          />
        </PopoverContent>
      </Popover>
      <Label
        htmlFor="present"
        className="mb-3 mt-1 flex w-1/2 items-center justify-start"
      >
        <Checkbox
          id="present"
          className="mr-3 inline-block bg-white"
          checked={!date?.to}
          onCheckedChange={(checked) => {
            if (checked) {
              setDate(
                date
                  ? { ...date, to: undefined }
                  : {
                      from: new Date(2024, 0, 20),
                      to: addDays(new Date(2024, 0, 20), 20),
                    },
              );
            }
          }}
        />
        Currenly working in this role?
      </Label>
    </div>
  );
}
