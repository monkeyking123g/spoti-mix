export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful spoti-mix app.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tracks",
      href: "/tracks",
    },
    {
      label: "Genere",
      href: "/genre",
    },
    {
      label: "Playlist",
      href: "/playlist",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tracks",
      href: "/tracks",
    },
    {
      label: "Genere",
      href: "/genre",
    },
    {
      label: "Playlist",
      href: "/playlist",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
