import StartEntering from "./components/home/StartEntering";
import NoServeArea from "./components/home/no-find-area/NoServeArea";
import ComeBackLater from "./components/home/no-find-area/ComeBackLater";
import AddToWaitingListForm from "./components/home/no-find-area/AddToWaitingListForm";

export default function Home() {
  return (
    <div className="min-w-full h-full flex flex-col items-center">
      <div className="flex-1 w-full h-full flex flex-col">
        <StartEntering />
        {/* <NoServeArea /> */}
        {/* <ComeBackLater /> */}
        {/* <AddToWaitingListForm /> */}
      </div>
    </div>
  );
}
