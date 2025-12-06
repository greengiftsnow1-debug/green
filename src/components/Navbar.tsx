'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
  const [showGifting, setShowGifting] = useState(false);
  const [showCorporate, setShowCorporate] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
   window.location.href = "/login";
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/70 text-green-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Green Gift Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>

         

          <Link href="/customize" className="hover:text-green-700">Customizable</Link>
          <Link href="/plant-care" className="hover:text-green-700">Plant Care</Link>
          <Link href="/about" className="hover:text-green-700">About</Link>
          <Link href="/contact" className="hover:text-green-700">Contact Us</Link>

          {/* Auth / Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-green-100 p-2 rounded-full hover:bg-green-200 transition"
              >
                <User size={20} />
                <span className="hidden md:block">{user.user_metadata?.name || user.email}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-green-50" onClick={() => setProfileOpen(false)}>Profile</Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-green-50" onClick={() => setProfileOpen(false)}>Orders</Link>
                  <Link href="/payments" className="block px-4 py-2 hover:bg-green-50" onClick={() => setProfileOpen(false)}>Payment History</Link>
                   <button
  onClick={handleLogout}
  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
>
  Logout
</button>
                  
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-green-100 rounded hover:bg-green-200 transition">Login</Link>
              <Link href="/login/signup" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Sign Up</Link>
              
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg p-4 space-y-4 animate-slideDown">
          <Link href="/" className="block" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/customize" className="block" onClick={() => setMenuOpen(false)}>Customizable</Link>
          <Link href="/plant-care" className="block" onClick={() => setMenuOpen(false)}>Plant Care</Link>
          <Link href="/about" className="block" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="block" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          {user ? (
            <>
              <Link href="/profile" className="block" onClick={() => setMenuOpen(false)}>Profile</Link>
              <Link href="/orders" className="block" onClick={() => setMenuOpen(false)}>Orders</Link>
              <Link href="/payments" className="block" onClick={() => setMenuOpen(false)}>Payment History</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/login/signup" className="block" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
