import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-[30px] flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={121}
          height={32}
          className="h-8 w-fit"
        />
      </div>
    </header>
  );
}
