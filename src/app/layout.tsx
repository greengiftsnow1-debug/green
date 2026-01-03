import "./globals.css";
import Script from "next/script";
import { Poppins } from "next/font/google";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseTracker from "@/components/MouseTracker";
import VisitCounter from '@/components/VisitCounter';
import StickyInfoBar from "@/components/StickyInfoBar";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Green Gift",
  description: "Nature-inspired shopping experience",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className="font-poppins bg-black text-white min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>

            <MouseTracker />

            {/* 🌿 GLOBAL NAVBAR */}
            <Navbar />
            <StickyInfoBar/>

            {/* ✅ SINGLE MAIN */}
            <main className="flex-grow pt-20">
              {children}
            </main>


<VisitCounter />
            {/* 🌱 GLOBAL FOOTER */}
            <Footer />

          </CartProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
