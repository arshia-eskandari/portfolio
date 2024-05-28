import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends ButtonProps {
  showSpinner: boolean;
  loading: boolean;
  onTransitionEnd: () => void;
}
export function SubmitButton({
  className,
  showSpinner,
  loading,
  children,
  onTransitionEnd,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" className={className} disabled={loading} {...props}>
      {showSpinner && (
        // EXPLANATION: We need a div here since duration-300 affects animate-spin
        <div
          className={cn(
            "transition-opacity duration-300 ease-in-out",
            loading ? "opacity-100" : "opacity-0",
          )}
          onTransitionEnd={onTransitionEnd}
        >
          <Loader2 className={cn("right-0 mr-2 h-4 w-4 animate-spin")} />
        </div>
      )}
      {children}
    </Button>
  );
}
