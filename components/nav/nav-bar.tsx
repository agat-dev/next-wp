import CardNav from './card-nav';
import { fetchWordpressPages } from '../../lib/wordpress';

const NavBar = async () => {
  const wpPages = await fetchWordpressPages();

  return (
    <CardNav
      logo="/logo-blanc-carre.png"
      logoAlt="Company Logo"
      items={wpPages}
      baseColor="#000"
      menuColor="#FFF"
      buttonBgColor="#FFF"
      buttonTextColor="#000"
      ease="power3.out"
    />
  );
};

export default NavBar;