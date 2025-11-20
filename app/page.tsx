import Image from "next/image";

import StartEntering from "./components/home/StartEntering";
import NoServeArea from "./components/home/no-find-area/NoServeArea";
import ComeBackLater from "./components/home/no-find-area/ComeBackLater";
import AddToWaitingListForm from "./components/home/no-find-area/AddToWaitingListForm";

export default function Home() {
  return (
    <div className="min-w-full h-full flex flex-col items-center ">
      <main className="flex items-center flex-1 w-full h-full my-[42px] relative px-4">
        <Image
          className="mx-auto absolute top-0 left-1/2 -translate-x-1/2"
          src="/logo.svg"
          alt="logo"
          width={121}
          height={32}
        />
        {/* <StartEntering /> */}
        {/* <NoServeArea /> */}
        {/* <ComeBackLater /> */}
        <AddToWaitingListForm />
      </main>
    </div>
  );
}
