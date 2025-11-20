import { FooterNavLinks, footerNavLinks } from "@/constants/FooterNavLinks";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" w-full bg-dark ">
      <div className="lmobile:max-w-[95vw] w-full mx-auto px-6 py-10 2xl:p-[80px]">
        <div className="w-full flex items-center  flex-col lmobile:flex-row flex-wrap lmobile:flex-nowrap gap-10 border-b border-cream pb-8 sm:pb-14 ">
          <div className="w-full flex justify-center lmobile:justify-start lmobile:flex-1 lmobile:min-w-0 lmobile:max-w-[374px]">
            <Image
              src="/logo-footer.svg"
              alt="logo"
              width={195}
              height={32}
              className="w-[195px] h-[32px]"
            />
          </div>
          {footerNavLinks.map((nav: FooterNavLinks) => (
            <div
              key={nav.title}
              className="flex flex-1 min-w-0 flex-col gap-4 text-center lmobile:text-left"
            >
              <h3 className="text-white text-[18px] font-bold">{nav.title}</h3>
              <ul className="flex flex-col gap-4">
                {nav.links.map((link) => (
                  <li key={link.label} className="w-full">
                    <a
                      href={link.href}
                      className="block w-full text-white text-[14px] lmobile:text-[16px] hover:text-cyan transition-all duration-300 ease-out"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-full flex border-b border-cream py-8 sm:py-14 "></div>
        <p className="text-center text-sm text-white pt-8 sm:pt-14">
          © {new Date().getFullYear()} Velvion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
