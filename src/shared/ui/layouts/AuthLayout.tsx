import { cn } from "../../../lib/utils";

type AuthLayoutProps = {
    children: React.ReactNode;
    className?: string;
}

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ocean-blue-1 via-flash-purple-1 to-sage-green-1 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-flash-purple-4/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-ocean-blue-4/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] bg-sage-green-4/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
      
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-ocean-blue-9 to-primary bg-clip-text text-transparent drop-shadow-sm">
          Task Flow
        </h1>
      </div>

      <div className={cn("w-full max-w-md relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};