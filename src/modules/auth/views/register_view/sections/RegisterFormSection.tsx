import type { UseFormReturn } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import type { RegisterFormValues } from "../../../validations/auth.schema";
import { Link } from "react-router-dom";
import { Body } from "../../../../../shared/indext";

interface RegisterFormSectionProps {
  form: UseFormReturn<RegisterFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RegisterFormSection = ({
  form,
  onSubmit,
  isLoading,
}: RegisterFormSectionProps) => {

  const { register, formState: { errors } } = form;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="given-name"
                placeholder="John"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
              {errors.firstName ? (
                <p className="text-destructive">{errors.firstName.message}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
              {errors.lastName ? (
                <p className="text-destructive">{errors.lastName?.message}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
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
                autoComplete="new-password"
                placeholder="Enter password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password ? (
                <p className="text-destructive"> {errors.password.message}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter password"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              className="w-full text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Body variant="muted">
            <Link to="/" className="text-primary hover:underline">
              Log in
            </Link>
          </Body>
        </CardFooter>
      </Card>
    );
};

