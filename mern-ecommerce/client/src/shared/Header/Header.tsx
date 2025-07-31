import { Link } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../assets/searchicon.svg';
import cartIcon from '../../assets/carticon.svg';
import profileIcon from '../../assets/profileicon.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-500">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        {/* Main header row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Shop.Co
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-base font-medium">
            <Link
              to="/"
              className="transition px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="transition px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="transition px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              Categories
            </Link>
            <Link
              to="/brands"
              className="transition px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              Brands
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex border rounded-[60px] items-center gap-2 bg-[#EFEFEF] dark:bg-gray-600 py-2 px-4 min-w-[200px] lg:min-w-[300px]">
            <img className="w-4 h-4 flex-shrink-0" src={searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Search for products..."
              className="outline-none bg-transparent flex-1 text-sm placeholder-gray-500 dark:placeholder-gray-300 dark:text-white"
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden transition px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <img className="w-5 h-5" src={searchIcon} alt="search" />
            </button>

            {/* Cart and Profile Icons */}
            <Link
              to="/cart"
              className="transition px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <img className="w-5 h-5" src={cartIcon} alt="cart" />
            </Link>
            <Link
              to="/profile"
              className="transition px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <img className="w-5 h-5" src={profileIcon} alt="profile" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col gap-1 p-2 transition hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
            >
              <span
                className={`w-5 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-gray-700 dark:bg-gray-200 transition-opacity ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 border rounded-[60px] flex items-center gap-2 bg-[#EFEFEF] dark:bg-gray-600 py-2 px-4">
            <img className="w-4 h-4 flex-shrink-0" src={searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Search for products..."
              className="outline-none bg-transparent flex-1 text-sm placeholder-gray-500 dark:placeholder-gray-300 dark:text-white"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="transition px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="transition px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="transition px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/brands"
                className="transition px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
