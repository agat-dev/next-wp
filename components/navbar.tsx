
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { fetchWordpressPages } from "@/lib/wordpress";
import { ListItem } from "./list-item";

export default async function Navbar() {
  // Récupère la structure des pages WordPress (parents + enfants)
  const menuGroups = await fetchWordpressPages();
  // Calcule la largeur et la hauteur max nécessaires pour tous les sous-menus
  function getMaxTextLength(arr) {
    return arr.reduce((max, l) => l.label.length > max ? l.label.length : max, 0);
  }
  let globalMaxColWidth = 14; // min 14rem
  let globalMaxRows = 1;
  menuGroups.forEach(group => {
    const links = group.links || [];
    const mainLabelLen = (group.label || '').length;
    const mainDescLen = (links[0]?.label || '').length;
    const childMaxLen = getMaxTextLength(links);
    const mainColWidth = Math.max(mainLabelLen, mainDescLen) * 0.6 + 4;
    const childColWidth = childMaxLen * 0.6 + 4;
    const colWidth = Math.max(mainColWidth, childColWidth, 14);
    if (colWidth > globalMaxColWidth) globalMaxColWidth = colWidth;
    if (links.length > globalMaxRows) globalMaxRows = links.length;
  });

  return (
    <NavigationMenu className="w-full bg-(--color-header) z-50">
      <Link href="/">
        <Image
          src="/logo-blanc-carre.png"
          alt="Logo blanc"
          width={42}
          height={42}
          className="ml-4 mt-2 mb-2"
        />
      </Link>
      <NavigationMenuList>
        {menuGroups.map((group) => {
          const links = group.links || [];
          return (
            <div key={group.label} className="flex flex-col items-center">
              <NavigationMenuItem>
                {links.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className="text-white/80 text-base font-title font-light hover:text-white">
                      {group.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-(--color-text-secondary) text-white/80 mt-0 left-1/2 -translate-x-1/2 absolute">
                      {(() => {
                        return (
                          <ul
                            className={`grid grid-cols-2 gap-4 p-2 justify-center items-start`}
                            style={{ minWidth: `${globalMaxColWidth * 2}rem`, maxWidth: `${globalMaxColWidth * 2}rem`, minHeight: `${globalMaxRows * 3}rem` }}
                          >
                            {/* Colonne principale à gauche */}
                            <li
                              key="main"
                              className={`row-span-${Math.max(3, links.length)} h-full w-full`}
                              style={{ minWidth: `${globalMaxColWidth}rem`, maxWidth: `${globalMaxColWidth}rem` }}
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  className={`flex h-full w-full flex-col justify-end p-4 bg-(--color-header) no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md`}
                                  href={group.slug ? `/${group.slug}` : '#'}
                                >
                                  <div className="mb-2 text-lg font-medium sm:mt-4 text-white/80">
                                    {group.label}
                                  </div>
                                  <p className="text-white/80 text-sm leading-tight">
                                    {links[0]?.label || ''}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            {/* Liens enfants sur une colonne à droite */}
                            <ul
                              className={`grid grid-rows-${globalMaxRows} items-start justify-items-start`}
                              style={{ minWidth: `${globalMaxColWidth}rem`, maxWidth: `${globalMaxColWidth}rem` }}
                            >
                              {links.map((link) => (
                                <li key={link.slug} className="w-full justify-self-start self-start">
                                  <ListItem href={`/${link.slug}`} title={link.label}>
                                    {link.ariaLabel}
                                  </ListItem>
                                </li>
                              ))}
                              {/* Ajoute des lignes vides pour harmoniser la hauteur */}
                              {Array.from({ length: globalMaxRows - links.length }).map((_, idx) => (
                                <li key={`empty-${idx}`} className="invisible">-</li>
                              ))}
                            </ul>
                          </ul>
                        );
                      })()}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={group.slug ? `/${group.slug}` : '#'}
                      className="px-4 py-2 text-white/80"
                    >
                      {group.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            </div>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}