import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Group, Briefcase, FileText, Phone, BookOpen,UserCircle2 } from "lucide-react";

type NavLinkItemProps = { title: string; icon: LucideIcon; redirect: string };

const NavLinkItem = ({ title, icon, redirect }: NavLinkItemProps) => {
  const Icon = icon;

  return (
    <Link
      to={redirect}
      className="flex items-center justify-center gap-2 p-2 hover:bg-accent/50 rounded-md transition-colors"
    >
      <Icon size={20} />
      <span>{title}</span>
    </Link>
  );
};

const itemsArray = [
  {
    title: "Services",
    icon: Briefcase,
    redirect: "/services",
  },
  {
    title: "Portfolio",
    icon: FileText,
    redirect: "/portfolio",
  },
  {
    title: "Careers",
    icon: Group,
    redirect: "/career",
  },
  {
    title: "Contact Us",
    icon: Phone,
    redirect: "/contact-us",
  },
  {
    title: "Blogs",
    icon: BookOpen,
    redirect: "/blogs",
  },
  {
    title: "Admin",
    icon: UserCircle2,
    redirect: "/admin",
  },
];

const NavLinks = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center justify-between gap-4">
      {itemsArray.map((item, index) => {
        return <NavLinkItem key={index} {...item} />;
      })}
    </ul>
  );
};

export default NavLinks;