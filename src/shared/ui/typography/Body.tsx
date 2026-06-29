import { cn } from "../../../lib/utils";

type BodyProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted";
};

export const Body = ({
  children,
  className,
  variant = "default",
}: BodyProps) => (
  <p
    className={cn(
      "text-sm leading-relaxed",
      variant === "muted" && "text-muted-foreground",
      className
    )}
  >
    {children}
  </p>
);
