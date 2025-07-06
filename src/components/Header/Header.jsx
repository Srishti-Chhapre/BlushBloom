import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 shadow-lg h-16 relative">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <Logo />
        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden lg:block flex-1 max-w-lg mx-4">
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <CartIcon />
        <UserMenu />
        {/* Hamburger Icon - Mobile */}
        <div className="lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
          <div className="mb-4">
            <SearchBar />
          </div>
          <NavLinks />
        </div>
      )}
    </header>
  );
};

export default Header;
