import { Link, useNavigate } from "react-router-dom";
import { LogOut, LucideIcon } from "lucide-react";
import { Group, Briefcase, FileText, Phone, BookOpen, UserCircle2 } from "lucide-react";
import { useAuth } from "@/middleware/authContext";
import { useState } from "react";

type NavLinkItemProps = { title: string; icon: LucideIcon; redirect: string; onClick?: () => void };


const NavLinkItem = ({ title, icon, redirect, onClick }: NavLinkItemProps) => {
  const Icon = icon;

  if (title === "Logout") {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 p-2 hover:bg-accent/50 rounded-md transition-colors w-full text-left"
      >
        <Icon size={20} />
        <span>{title}</span>
      </button>
    );
  }

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

const NavLinks = () => {
  const {isAuthenticated,logout} = useAuth()
  const navigate=useNavigate()
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
      redirect: isAuthenticated?"/admin/":"/admin/login",
    },
    {
      title: "Logout",
      icon: LogOut,
      redirect: "#", // Placeholder, since we're using onClick
      show: isAuthenticated, // Only show if authenticated
      onClick: () => {
       logout()
        navigate('/')
       
      }
    },
  ];

  return (
    <ul className="flex flex-col md:flex-row items-center justify-between gap-4">
      {itemsArray.map((item, index) => {
        if (item.show === false) return null; // Skip rendering if show is false
        return <NavLinkItem key={index} {...item} />;
      })}
    </ul>
  );
};

export default NavLinks;