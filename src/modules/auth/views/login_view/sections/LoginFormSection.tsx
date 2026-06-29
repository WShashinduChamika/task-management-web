import type { UseFormReturn } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../../components/ui/card";
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

  const { register, formState: { errors } } = form;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your username and password to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-destructive">{errors.email.message}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password ? (
                <p className="text-destructive"> {errors.password.message}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              className="w-full text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Log In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Body variant="muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </Body>
        </CardFooter>
      </Card>
    );
};
