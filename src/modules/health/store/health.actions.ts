import { healthCheckApi } from "../api/health.api";
import { checkHealthErrorStore, checkHealthLoadingStore, checkHealthStore } from "./health.store"

/** GET /health */
export const checkHealthAction = async (): Promise<boolean> => {
    checkHealthLoadingStore.value = true;
    checkHealthErrorStore.value = null;

    try {
        const { data } = await healthCheckApi();
        checkHealthStore.value = data.status;
        return true;

    } catch (err: unknown) {
        const msg =
            (err as { response?: { data?: { message?: string } } })?.response?.data
                ?.message ?? "Something went to wrong. Please try again.";
        checkHealthErrorStore.value = msg;
        return false;
        
    } finally {
        checkHealthLoadingStore.value = false;
    }
} 
