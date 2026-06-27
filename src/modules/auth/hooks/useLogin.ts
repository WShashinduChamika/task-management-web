import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormValues } from "../validations/auth.schema";
import { loginErrorStore, loginLoadingStore } from "../store/auth.store";
import { loginAction } from "../store/auth.actions";
import { toast } from "sonner";
import { useSignals } from "@preact/signals-react/runtime";

export const useLogin = () => {
  useSignals();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const ok = await loginAction({
      email: values.email,
      password: values.password,
    });

    if (ok) {
      toast.success("Login success", {
        description: "You have been logged in successfully",
        duration: 3000,
      });
    } else {
      toast.error("Login failed", {
        description: loginErrorStore.value,
        duration: 5000,
      });
    }
  });

  return {
    form,
    onSubmit,
    isLoading: loginLoadingStore.value,
  };
};
