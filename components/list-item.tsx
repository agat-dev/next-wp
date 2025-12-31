import Link from "next/link";
import { NavigationMenuLink } from "./ui/navigation-menu";
import React from "react";

interface ListItemProps {
  href: string;
  title: string;
  children: React.ReactNode;
}

export function ListItem({ href, title, children }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] whitespace-nowrap min-w-max"
          style={{ maxWidth: '100%' }}
        >
          <div className="text-base font-semibold whitespace-nowrap min-w-max text-[var(--color-text)]" style={{ maxWidth: '100%' }}>{title}</div>
          <p className="text-xs text-[var(--color-info)] leading-tight whitespace-nowrap min-w-max" style={{ maxWidth: '100%' }}>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
