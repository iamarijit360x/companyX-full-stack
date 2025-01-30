import { Link } from "lucide-react";

 const NavLinkItem = ({ title, icon, redirect }) => {
  const Icon = icon;

  return (
    <Link
      to={redirect}
      className="flex items-center justify-center gap-2 p-2 hover:bg-accent/50 rounded-md transition-colors"
      onClick={() => setIsMenuOpen(false)} // Close menu on link click
    >
      <Icon size={20} />
      <span>{title}</span>
    </Link>
  );
};
export default NavLinkItem;