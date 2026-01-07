import NavbarClient from "./navbar-client";
import { fetchWordpressPages } from "@/lib/wordpress";

export default async function Navbar() {
  const menuGroups = await fetchWordpressPages();
  return <NavbarClient menuGroups={menuGroups} />;
}