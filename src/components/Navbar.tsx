'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [showGifting, setShowGifting] = useState(false);
  const [showCorporate, setShowCorporate] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);

  const { user } = useAuth(); // ✅ get current user

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/20 text-green-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="Green Gift Logo" className="h-10 w-auto" />
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/">Home</Link>

          {/* Gifting Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowGifting(!showGifting)}
              className="flex items-center gap-1"
            >
              Gifting <ChevronDown size={16} />
            </button>

            {showGifting && (
              <div className="absolute left-0 bg-white text-sm rounded-md mt-2 shadow-md w-60 z-50">
                {/* Corporate Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setShowCorporate(true)}
                  onMouseLeave={() => setShowCorporate(false)}
                >
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-green-100 cursor-pointer">
                    Corporate Gifting <ChevronRight size={16} />
                  </div>
                  {showCorporate && (
                    <div className="absolute top-0 left-full bg-white rounded-md shadow-md w-72 z-50">
                      {[
                        "Women's Day Hamper",
                        "New Year & Christmas - Bulk order",
                        "Corporate Diwali Gifts",
                        "Environment Day Gifting",
                        "Bulk Plant Purchase",
                        "Employee Kits",
                        "Work Anniversary kit",
                        "Annual/Foundation day",
                        "Rewards & Recognition",
                        "Employee welcome kit",
                        "Partner & Customers"
                      ].map((item, i) => (
                        <Link
                          key={i}
                          href={`/gifting/corporate/${item.toLowerCase().replace(/ /g, '-').replace(/&/g, '').replace(/'/g, '')}`}
                          className="block px-4 py-2 hover:bg-green-100"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Personalized Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setShowPersonal(true)}
                  onMouseLeave={() => setShowPersonal(false)}
                >
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-green-100 cursor-pointer">
                    Personalized Gifting <ChevronRight size={16} />
                  </div>
                  {showPersonal && (
                    <div className="absolute top-0 left-full bg-white rounded-md shadow-md w-72 z-50">
                      {[
                        "Valentine's Day Gifts",
                        "Women's Day Gifts",
                        "Birthday Gifts",
                        "Mother's Day Gifts",
                        "Anniversary Gifts",
                        "Thank you",
                        "Housewarming Plants",
                        "Congratulations Plant Gift",
                        "Personalised Diwali Gifting",
                        "Christmas & New Year Plant Gifting"
                      ].map((item, i) => (
                        <Link
                          key={i}
                          href={`/gifting/personal/${item.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}`}
                          className="block px-4 py-2 hover:bg-green-100"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href="/customize">Customizable</Link>
          <Link href="/plant-care">Plant Care</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact Us</Link>
          

          {/* ✅ Auth display */}
          {user ? (
            <div className="ml-4 flex items-center gap-3">
              <span className="text-sm text-green-800 font-medium">
                {user.user_metadata?.name || user.email}
              </span>
              <Link
                href="/logout"
                className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-3 py-1 text-sm bg-green-100 hover:bg-green-200 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
