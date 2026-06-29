import { AuthLayout } from "../../../../shared/indext";
import { useLogin } from "../../hooks/useLogin";
import { LoginFormSection } from "./sections/LoginFormSection";

export const LoginView = () => {

    const { form, onSubmit, isLoading } = useLogin();
    
    return (
      <AuthLayout>
        <LoginFormSection
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthLayout>
    );
};
