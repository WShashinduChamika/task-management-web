import { z } from "zod/v3";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,128}$/;

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be at most 50 characters long"),
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Email must be a valid address")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long")
    .regex(
      PASSWORD_REGEX,
      "Password must include uppercase, lowercase, number, and special character",
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Email must be a valid address")
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;