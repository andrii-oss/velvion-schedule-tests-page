"use client";

import PurchasePage from "@/components/home/purchasePage/PurchasePage";
import StartEntering from "@/components/home/StartEntering";
import { toast } from "@/hooks/use-toast";
import { checkCepAvailability, getCepErrorMessage } from "@/lib/cep-api";
import { useAvailabilityStore } from "@/store/availability-store";
import { useEffect } from "react";

export default function Home() {
  const isAvailable = useAvailabilityStore((state) => state.isAvailable);
  const setAvailability = useAvailabilityStore(
    (state) => state.setAvailability
  );

  const checkCep = async () => {
    try {
      const { response: responseData, isAvailable } =
        await checkCepAvailability(sessionStorage.getItem("cepLocation") || "");

      toast({
        status: isAvailable ? "success" : "error",
        title: responseData.message,
      });

      if (isAvailable) {
        setAvailability(true);
      }
    } catch (error) {
      const errorMessage = getCepErrorMessage(error);
      console.log("error", error);
      toast({
        status: "error",
        title: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("cepLocation")
    ) {
      checkCep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-w-full flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col">
        {isAvailable === true ? <PurchasePage /> : <StartEntering />}
        {/* <NoServeArea /> */}
        {/* <ComeBackLater /> */}
        {/* <AddToWaitingListForm /> */}
      </div>
    </div>
  );
}
