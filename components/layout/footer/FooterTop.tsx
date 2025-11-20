import { FooterNavLinks, footerNavLinks } from "@/constants/FooterNavLinks";
import Image from "next/image";
import Link from "next/link";

export default function FooterTop() {
  return (
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
                <Link
                  href={link.href}
                  rel="noopener noreferrer"
                  className="block w-full text-center lmobile:text-left text-white text-[14px] lmobile:text-[16px] hover:text-cyan transition-all duration-300 ease-out"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
