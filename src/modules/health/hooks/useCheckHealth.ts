import { checkHealthAction } from "../store/health.actions";
import { toast } from "sonner";
import { checkHealthErrorStore, checkHealthLoadingStore } from "../store/health.store";

export const useCheckHealth = () => {
    
    const checkHealth = async () => {
        const ok = await checkHealthAction();
        if (ok) {
           toast.success("Task created successfully!");
           return;
        }
        toast.error("Something went wrong!");
    };

    return {
        checkHealth,
        isLoading: checkHealthLoadingStore.value,
        error: checkHealthErrorStore.value
    };
};