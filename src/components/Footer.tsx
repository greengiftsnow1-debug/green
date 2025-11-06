'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1F3B29] text-white px-8 py-16 mt-[-1px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {/* Logo + Description */}
        <div>
          <img
            src="/logo white.png"
            alt="Green Gift Logo"
            className="h-16 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Green Gift 🌱</h3>
          <p className="text-sm text-green-200">
            Made with love for the planet and your loved ones. Gifting made greener.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-green-100 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/customize" className="hover:underline">Customize</a></li>
           <li><a href="/faq" className="hover:underline">FAQs</a></li>

            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact / FAQs */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <p className="text-sm text-green-100 mb-2">
            Have questions? Visit our <a href="/faq" className="underline">FAQs</a> or contact us directly.
          </p>
          <p className="text-sm">📞 +919243837364</p>
          <p className="text-sm">📧 greengiftsnoww@gmail.com</p>
        </div>
      </div>

      {/* Bottom - Social */}
      <div className="mt-12 border-t border-green-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-green-300">
        <div className="flex gap-4 mb-4 md:mb-0">
          <a
            href="https://www.instagram.com/greengiftsnow?igsh=bmc0a3B4amJ6Nndk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://wa.me/9243837364"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaFacebookF size={20} />

          </a>
           <a
            href="https://youtube.com/@greengiftsnow?si=Q1JzhspSpC7wtFrT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaYoutube size={20} />
            
          </a>
        </div>
        <p>© {new Date().getFullYear()} Green Gift. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
