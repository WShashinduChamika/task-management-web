import { HardHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ProfileView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 animate-in fade-in zoom-in-95 duration-700">
      <Card className="max-w-lg w-full rounded-3xl border-stone-neutral-4 bg-white/70 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ocean-blue-9 to-primary"></div>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center gap-8">
          <div className="relative mt-4">
            <div className="absolute inset-0 bg-ocean-blue-6 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-ocean-blue-9 to-primary p-6 rounded-full shadow-xl text-white transform hover:scale-105 transition-transform duration-300">
              <HardHat className="size-16" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">
              User Profile
            </h1>
            <p className="text-lg text-secondary-foreground font-medium max-w-sm mx-auto leading-relaxed">
              We're actively building this section. Soon you'll be able to customize your experience, manage preferences, and update your personal details!
            </p>
          </div>
          
          <div className="mt-2 px-6 py-2.5 bg-ocean-blue-2 text-ocean-blue-11 rounded-full text-sm font-bold border border-ocean-blue-4 shadow-inner inline-flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean-blue-9 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-ocean-blue-9"></span>
            </span>
            Coming Soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
