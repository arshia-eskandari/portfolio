import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./Alert";
import { cn } from "@/lib/utils";

export function SuccessAlert({ successMssg }: { successMssg: string }) {
  return (
    <>
      {successMssg !== "" && (
        <Alert
          variant="default"
          className={cn(
            "bg-[#5cb85c] fixed text-white",
            "left-1/2 top-[3rem] w-11/12 -translate-x-1/2 -translate-y-1/2",
            "z-[1001] md:bottom-5 md:left-5 md:top-auto md:w-1/2 md:-translate-x-0 md:-translate-y-0",
          )}
        >
          <CheckCircle className="h-4 w-4" color="white" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMssg}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
