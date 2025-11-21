"use client";

import PurchasePage from "@/components/home/purchasePage/PurchasePage";
import StartEntering from "@/components/home/StartEntering";
import { useAvailabilityStore } from "@/store/availability-store";

export default function Home() {
  const isAvailable = useAvailabilityStore((state) => state.isAvailable);

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
