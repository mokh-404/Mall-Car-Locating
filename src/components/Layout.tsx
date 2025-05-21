import React from 'react';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <main className="container-custom py-6">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <div className="container-custom">
          &copy; {new Date().getFullYear()} Mall Car Locator | All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default Layout;