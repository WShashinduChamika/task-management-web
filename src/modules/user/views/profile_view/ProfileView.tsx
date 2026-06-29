import { User, Construction } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";

export const ProfileView = () => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full min-h-[60vh] justify-center">
      <Card className="rounded-2xl border-stone-neutral-4 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden text-center py-12">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="p-4 bg-ocean-blue-2 rounded-full text-ocean-blue-9 shadow-sm">
            <User className="size-12" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-primary">
            User Profile
          </CardTitle>
          <CardDescription className="text-base text-secondary-foreground font-medium max-w-md mx-auto">
            We are working hard to bring you a comprehensive profile management experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-ocean-blue-9 bg-ocean-blue-1/50 px-4 py-2 rounded-lg border border-ocean-blue-3">
            <Construction className="size-5" />
            <span className="font-semibold">Coming Soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
