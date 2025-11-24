export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterNavLinks = {
  title: string;
  links: FooterNavLink[];
};

const baseLink = "https://www.velvion.com.br";

export const footerNavLinks: FooterNavLinks[] = [
  {
    title: "Como Funciona",
    links: [
      {
        label: "FAQs",
        href: `${baseLink}/faq`,
      },
      {
        label: "Sobre",
        href: `${baseLink}/sobre`,
      },
      {
        label: "Ajuda",
        href: `${baseLink}`,
      },
    ],
  },
  {
    title: "Testemunhos",
    links: [
      {
        label: "Compartilhe sua história",
        href: `${baseLink}`,
      },
      {
        label: "Preços",
        href: `${baseLink}`,
      },
    ],
  },
  {
    title: "Informaçõ",
    links: [
      {
        label: "Correiras",
        href: `${baseLink}`,
      },
      {
        label: "Contate-nos",
        href: `${baseLink}`,
      },
    ],
  },
];
