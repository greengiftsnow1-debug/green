'use client'

import Link from 'next/link';


export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-green-600">Green Gift</Link>
      <nav className="space-x-6 font-medium text-gray-700">
        <Link href="/">Home</Link>
        <Link href="#categories">Categories</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
      </nav>
    </header>
  );
}
