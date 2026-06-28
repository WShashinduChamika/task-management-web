import { useSignals } from "@preact/signals-react/runtime";
import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  type RegisterFormValues,
} from "../validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "../store/auth.actions";
import { toast } from "sonner";
import { registerErrorStore, registerLoadingStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  useSignals();

  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const ok = await registerAction({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

    if (ok) {
      toast.success(`Account created! Welcome, ${values.firstName ?? ""}!`, {
        description: "Your account has been set up successfully.",
        duration: 3000,
      });
      navigate("/dashboard/tasks");
    } else {
      toast.error("Registration failed", {
        description:
          registerErrorStore.value ?? "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  });

  return {
    form,
    onSubmit,
    isLoading: registerLoadingStore.value,
  };
};
