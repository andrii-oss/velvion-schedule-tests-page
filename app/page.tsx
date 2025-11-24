"use client";

import PurchasePage from "@/components/home/purchasePage/PurchasePage";
import StartEntering from "@/components/home/StartEntering";
import { useAvailabilityStore } from "@/store/availability-store";
import { useEffect } from "react";

export default function Home() {
  const isAvailable = useAvailabilityStore((state) => state.isAvailable);
  const setAvailability = useAvailabilityStore(
    (state) => state.setAvailability
  );

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("cepLocation")) {
      setAvailability(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-w-full flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col">
        {isAvailable === true ? (
          <PurchasePage />
        ) : (
          <StartEntering />
        )}
        {/* <NoServeArea /> */}
        {/* <ComeBackLater /> */}
        {/* <AddToWaitingListForm /> */}
      </div>
    </div>
  );
}
