export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterNavLinks = {
  title: string;
  links: FooterNavLink[];
};

export const footerNavLinks: FooterNavLinks[] = [
  {
    title: "Como Funciona",
    links: [
      {
        label: "FAQs",
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
        label: "Compartilhe sua história",
        href: "/",
      },
      {
        label: "Preços",
        href: "/",
      },
    ],
  },
  {
    title: "Informaçõ",
    links: [
      {
        label: "Correiras",
        href: "/",
      },
      {
        label: "Contate-nos",
        href: "/",
      },
    ],
  },
];
