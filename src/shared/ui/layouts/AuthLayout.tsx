import { cn } from "../../../lib/utils";

type AuthLayoutProps = {
    children: React.ReactNode;
    className?: string;
}

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-accent p-4">
      <div className={cn("w-full max-w-md", className)}>{children}</div>
    </div>
  );
};