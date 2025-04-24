import  { useEffect, useRef, useState } from 'react'
import { navigation } from '../data'
import { IoIosSearch } from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';
import Logo from '../assets/Logo.gif'

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen])

  return (
    <div className='w-full h-[80px] flex justify-between items-center sticky top-0 z-50 bg-gradient-background 
    backdrop-blur-md border-b border-[var(--color-border)] shadow-lg'>
      {/* Logo */}
      <div className='flex items-center'>
        <img
          src={Logo}
          width={80}
          alt="Logo"
          className='p-2 hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-8 items-center'>
        {navigation.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className='text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 relative group'
          >
            {item.title}
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 group-hover:w-full'></span>
          </a>
        ))}
      </div>

      {/* Search and Sign Up */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={searchRef}>
          <button
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
            onClick={toggleSearch}
          >
            <IoIosSearch className="text-2xl mt-1" />
          </button>
          <div className={`absolute -mt-8 right-8 top-full transition-all duration-300 ${searchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'}`}>
            <input
              type="text"
              className="w-[200px] h-[35px] rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] pl-4 pr-4 border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-border-hover)] transition-colors duration-300"
              placeholder="Search..."
            />
          </div>
        </div>

        <button className="hidden md:block bg-gradient-primary text-[var(--color-text-primary)] px-6 py-2 rounded-full font-semibold transition-all duration-300  hover:shadow-[var(--color-primary)]/25">
          Sign Up
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[var(--color-bg-primary)] z-40 md:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-xl transition-colors duration-300'
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
          <button className="bg-gradient-primary text-[var(--color-text-primary)] px-8 py-3 rounded-full font-semibold transition-all duration-300  hover:shadow-[var(--color-primary)]/25">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
