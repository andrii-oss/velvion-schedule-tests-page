import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    {
      title: "Como Funciona",
      links: [
        {
          pageName: "FAQs",
          href: "/",
        },
        {
          label: "Sobre",
          href: "/",
        },
        {
          label: "Ajuda",
          href: "/",
        },
      ],
    },
    {
      title: "Testemunhos",
      links: [
          {
            pageName: "Compartilhe sua história",
            href: "/",
          },
          {
            pageName: "Preços",
            href: "/",
          },
      ],
    },
    {
      title: "Informaçõ",
      links: [
          {
            pageName: "Correiras",
            href: "/",
          },
          {
            pageName: "Contate-nos",
            href: "/",
          },
      ],
    },
  ];
  return (
    <footer className=" w-full bg-dark ">
      <div className="container mx-auto px-6 py-10 sm:p-[80px]">
        <div className="w-full flex border-b border-cream pb-8 sm:pb-14 ">
          <Image
            src="/logo-footer.svg"
            alt="logo"
            width={195}
            height={32}
            className="w-[105px] h-[17px] sm:w-[195px] sm:h-[32px]"
          />
        </div>
        <div className="w-full flex border-b border-cream py-8 sm:py-14 "></div>
        <p className="text-center text-sm text-white pt-8 sm:pt-14">
          © {new Date().getFullYear()} Velvion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
