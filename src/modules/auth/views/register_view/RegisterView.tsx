import { AuthLayout } from "../../../../shared/indext";
import { useRegister } from "../../hooks/useRegister";
import { RegisterFormSection } from "./sections/RegisterFormSection";

export const RegisterView = () => {

    const { form, onSubmit, isLoading } = useRegister();
    
    return (
      <AuthLayout>
        <RegisterFormSection
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </AuthLayout>
    );
};