import PurchasePage from "@/components/home/PurchasePage";
import StartEntering from "@/components/home/StartEntering";


export default function Home() {
  return (
    <div className="min-w-full h-full flex flex-col items-center">
      <div className="flex-1 w-full h-full flex flex-col">
        {/* <StartEntering /> */}
        <PurchasePage />
        {/* <NoServeArea /> */}
        {/* <ComeBackLater /> */}
        {/* <AddToWaitingListForm /> */}
      </div>
    </div>
  );
}
