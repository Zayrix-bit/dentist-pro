import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Appointment', href: '#appointment' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-primary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent-blue/30 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-heading text-2xl font-bold text-white">D</span>
            </motion.div>
            <div className="hidden md:block">
              <div className="font-heading text-lg font-bold text-foreground group-hover:text-accent-blue transition-colors">Dental Care</div>
              <div className="font-paragraph text-xs text-text-light-gray">Premium Services</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-paragraph text-sm text-foreground font-medium relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-primary group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <a href="#appointment">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-accent-blue to-primary text-white hover:shadow-lg hover:shadow-accent-blue/40 px-8 py-3 rounded-full font-semibold transition-all">
                  Book Now
                </Button>
              </motion.div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors text-foreground hover:text-accent-blue"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden py-6 border-t border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-paragraph text-base text-foreground hover:text-accent-blue transition-colors font-medium py-2 pl-4 border-l-2 border-transparent hover:border-accent-blue"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="#appointment" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-gradient-to-r from-accent-blue to-primary text-white hover:shadow-lg px-6 py-3 rounded-full font-semibold mt-4">
                    Book Appointment
                  </Button>
                </motion.div>
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
