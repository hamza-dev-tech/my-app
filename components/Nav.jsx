"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "resume",
    href: "/resume",
  },
  {
    name: "work",
    href: "/work",
  },
  {
    name: "articles",
    href: "/article",
  },
  {
    name: "contact",
    href: "/contact",
  },
];
export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            link.href === pathname &&
            "text-primary-accent border-b-2 border-primary-accent"
          } capitalize font-medium hover:text-primary-accent transition-all`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
