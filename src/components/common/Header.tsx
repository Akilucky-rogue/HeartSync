
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogOut, User, Book } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-cursive text-heart">
          <Heart className="w-6 h-6 animate-heart-beat" />
          <span>HeartSync</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-foreground/80 hover:text-heart transition-colors">
                Dashboard
              </Link>
              <Link to="/timeline" className="text-foreground/80 hover:text-heart transition-colors">
                Our Story
              </Link>
              <Link to="/mood" className="text-foreground/80 hover:text-heart transition-colors">
                Mood Tracker
              </Link>
              <Link to="/love-language" className="text-foreground/80 hover:text-heart transition-colors">
                <span className="flex items-center gap-1">
                  <Book className="w-4 h-4" />
                  Love Languages
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-foreground/80 hover:text-heart transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-foreground/80 hover:text-heart transition-colors">
                About
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-foreground/80 hover:text-heart transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user?.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-foreground/80 hover:text-heart transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="py-2 px-4 rounded-full border border-heart text-heart hover:bg-heart/10 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="py-2 px-4 rounded-full bg-heart text-white hover:bg-heart-dark transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
