import { Link, useNavigate } from "react-router-dom";
import { LogOut, LucideIcon } from "lucide-react";
import { Group, Briefcase, FileText, Phone, BookOpen, UserCircle2 } from "lucide-react";
import { useAuth } from "@/middleware/authContext";

type NavLinkItemProps = {
  title: string;
  icon: LucideIcon;
  redirect: string;
  onClick?: () => void;
  show?: boolean;
  closeMenu?: () => void;
};

const NavLinkItem = ({ title, icon: Icon, redirect, onClick, closeMenu }: NavLinkItemProps) => {
  const handleClick = () => {
    closeMenu?.();
    onClick?.();
  };

  if (title === "Logout") {
    return (
      <li>
        <button
          onClick={handleClick}
          className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-md transition-colors w-full text-left"
        >
          <Icon size={20} />
          <span>{title}</span>
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={redirect}
        onClick={closeMenu}
        className="flex items-center gap-2 p-2 hover:bg-accent/50 rounded-md transition-colors"
      >
        <Icon size={20} />
        <span>{title}</span>
      </Link>
    </li>
  );
};

const NavLinks = ({ closeMenu }: { closeMenu?: () => void }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const itemsArray: NavLinkItemProps[] = [
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
      title: "ContactUs",
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
      redirect: isAuthenticated ? "/admin/" : "/admin/login",
    },
    {
      title: "Logout",
      icon: LogOut,
      redirect: "#",
      show: isAuthenticated,
      onClick: handleLogout,
    },
  ];

  return (
    <ul className="flex flex-col md:flex-row items-center gap-4">
      {itemsArray
        .filter(item => item.show !== false)
        .map((item, index) => (
          <NavLinkItem 
            key={`${item.title}-${index}`} 
            {...item} 
            closeMenu={closeMenu}
          />
        ))}
    </ul>
  );
};

export default NavLinks;