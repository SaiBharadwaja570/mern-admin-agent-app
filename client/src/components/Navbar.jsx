import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = ({
  brand = "MyApp",
  brandIcon: BrandIcon,
  links = [],
  variant = "default", // "default", "dark", "light"
  position = "static", // "static", "fixed", "sticky"
  className = "",
  onLinkClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (link, event) => {
    if (link.onClick) {
      event.preventDefault();
      link.onClick();
    }
    if (onLinkClick) {
      onLinkClick(link);
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (linkLabel) => {
    setOpenDropdown(openDropdown === linkLabel ? null : linkLabel);
  };

  // Variant styles
  const variants = {
    default: {
      bg: "bg-white border-b border-gray-200",
      text: "text-gray-900",
      linkText: "text-gray-600 hover:text-gray-900",
      activeLinkText: "text-blue-600",
      mobileMenuBg: "bg-white",
      dropdownBg: "bg-white"
    },
    dark: {
      bg: "bg-gray-900 border-b border-gray-700",
      text: "text-white",
      linkText: "text-gray-300 hover:text-white",
      activeLinkText: "text-blue-400",
      mobileMenuBg: "bg-gray-900",
      dropdownBg: "bg-gray-800"
    },
    light: {
      bg: "bg-gray-50 border-b border-gray-200",
      text: "text-gray-900",
      linkText: "text-gray-700 hover:text-gray-900",
      activeLinkText: "text-blue-600",
      mobileMenuBg: "bg-gray-50",
      dropdownBg: "bg-white"
    }
  };

  const currentVariant = variants[variant];

  const positionClasses = {
    static: "",
    fixed: "fixed top-0 left-0 right-0 z-50",
    sticky: "sticky top-0 z-50"
  };

  const renderNavLink = (link, isMobile = false) => {
    const hasDropdown = link.dropdown && link.dropdown.length > 0;
    const isActive = link.active;
    
    const linkClasses = `
      ${isMobile ? 'block px-3 py-2 text-base' : 'px-3 py-2 text-sm'} 
      font-medium rounded-md transition-colors duration-200
      ${isActive ? currentVariant.activeLinkText : currentVariant.linkText}
      ${hasDropdown ? 'flex items-center gap-1' : ''}
    `;

    if (hasDropdown) {
      return (
        <div key={link.label} className={isMobile ? "" : "relative"}>
          <button
            onClick={() => toggleDropdown(link.label)}
            className={linkClasses}
          >
            {link.icon && <link.icon className="w-4 h-4" />}
            {link.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
          </button>
          
          {openDropdown === link.label && (
            <div className={`
              ${isMobile ? 'ml-4 mt-2' : 'absolute left-0 mt-2 w-48'} 
              ${currentVariant.dropdownBg} 
              rounded-md shadow-lg border border-gray-200 py-1
            `}>
              {link.dropdown.map((dropdownItem) => (
                <a
                  key={dropdownItem.label}
                  href={dropdownItem.href}
                  onClick={(e) => handleLinkClick(dropdownItem, e)}
                  className={`
                    block px-4 py-2 text-sm ${currentVariant.linkText} 
                    hover:bg-gray-100 ${variant === 'dark' ? 'hover:bg-gray-700' : ''}
                  `}
                >
                  {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4 inline mr-2" />}
                  {dropdownItem.label}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        onClick={(e) => handleLinkClick(link, e)}
        className={linkClasses}
      >
        {link.icon && <link.icon className="w-4 h-4 mr-1" />}
        {link.label}
      </a>
    );
  };

  return (
    <nav className={`${currentVariant.bg} ${positionClasses[position]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <div className={`flex-shrink-0 flex items-center gap-2 ${currentVariant.text}`}>
              {BrandIcon && <BrandIcon className="w-8 h-8" />}
              <span className="font-bold text-xl">{brand}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => renderNavLink(link))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`${currentVariant.text} hover:bg-gray-200 ${variant === 'dark' ? 'hover:bg-gray-700' : ''} p-2 rounded-md`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${currentVariant.mobileMenuBg} border-t border-gray-200`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => renderNavLink(link, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;