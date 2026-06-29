import type { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import type { LoginFormValues } from "../../../validations/auth.schema";
import { Link } from "react-router-dom";
import { Body } from "../../../../../shared/indext";

interface LoginFormSectionProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const LoginFormSection = ({
  form,
  onSubmit,
  isLoading,
}: LoginFormSectionProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/60 backdrop-blur-2xl rounded-2xl overflow-hidden">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-4xl font-bold text-primary">
          Sign In
        </CardTitle>
        <CardDescription className="text-base text-secondary-foreground">
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-primary ml-1"
            >
              Username
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="h-12 border-stone-neutral-4 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl transition-all duration-300 bg-white/70 shadow-sm text-base text-primary"
            />
            {errors.email ? (
              <p className="text-destructive text-sm ml-1">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-primary ml-1"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className="h-12 border-stone-neutral-4 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl transition-all duration-300 bg-white/70 shadow-sm text-base text-primary"
            />
            {errors.password ? (
              <p className="text-destructive text-sm ml-1">
                {" "}
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-2 bg-ocean-blue-9 text-white hover:bg-ocean-blue-10 rounded-xl shadow-lg shadow-ocean-blue-9/25 transition-all duration-300 transform hover:-translate-y-0.5 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center pt-2 pb-6">
        <Body variant="muted" className="text-secondary-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
          >
            Sign up
          </Link>
        </Body>
      </CardFooter>
    </Card>
  );
};
