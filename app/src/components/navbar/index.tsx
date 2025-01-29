import { useState } from "react";
import NavLinks from "./nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import H4 from "@/components/typo/H4";
import { Github, Menu, X } from "lucide-react"; // Import Menu and X icons for the hamburger menu
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-4 h-16 z-10 border-b backdrop-blur-md">
      <H4 onClick={() => navigate("/")} className="cursor-pointer">
        CompanyX
      </H4>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center justify-center gap-4">
        <NavLinks />
        <ThemeToggle />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full h-screen bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden">
          <NavLinks />
          <ThemeToggle />
        </div>
      )}
    </header>
  );
};

export default Navbar;