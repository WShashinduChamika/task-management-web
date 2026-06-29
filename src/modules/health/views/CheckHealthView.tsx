import { useSignalEffect, useSignals } from "@preact/signals-react/runtime";
import { useCheckHealth } from "../hooks/useCheckHealth";
import { checkHealthRequestedStore } from "../store/health.store";

export const CheckHealthView = () => {
   useSignals();
   
   const { checkHealth, isLoading, error } = useCheckHealth();
   
   useSignalEffect(()=> {
    if (checkHealthRequestedStore.value) {
      return;
    }

    checkHealthRequestedStore.value = true;
    checkHealth();
   }); 

   return (
    <>
      <div className="w-full flex items-center justify-center bg-accent">
        <p className="text-2xl font-bold">Check Health View</p>
      </div>
      {
        isLoading && (
            <p>Loading...</p>
        )
      }

      {
        error && (
            <p>{error}</p>
        )
      }
    </>
   );
};