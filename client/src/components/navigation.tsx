import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';
import logoSecode from '@assets/Logo_Secode_roxo_horiz_400px_1750608624303.png';
import ThemeToggle from '@/components/theme-toggle';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: 'Início', href: 'home', type: 'scroll' },
    { label: 'Nossa Visão IA', href: 'nossa-visao-ia', type: 'scroll' },
    { label: 'Produtos', href: '/produtos', type: 'link' },
    { label: 'Quem Somos', href: '/quem-somos', type: 'link' },
    { label: 'Contato', href: 'contato', type: 'scroll' }
  ];

  const handleNavClick = (href: string, type: string) => {
    if (type === 'scroll') {
      // If we're not on the home page, go to home first
      if (location !== '/') {
        window.location.href = `/#${href}`;
      } else {
        scrollToElement(href);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home', 'scroll')}>
            <img 
              src={logoSecode} 
              alt="Secode Logo" 
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                >
                  {item.label}
                </button>
              )
            ))}
            <ThemeToggle />
          </div>
          

          
          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-3 pb-4 space-y-2 bg-background border-t border-border">
              {navItems.map((item) => (
                item.type === 'link' ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href, item.type)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                )
              ))}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
