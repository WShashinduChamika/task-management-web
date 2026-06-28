import { z } from "zod/v3";

export const TaskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be at most 150 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must be at most 1000 characters")
    .optional(),

  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Priority is required",
  }),

  status: z.enum(["Open", "In Progress", "Testing", "Done"], {
    required_error: "Status is required",
  }),

  dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
