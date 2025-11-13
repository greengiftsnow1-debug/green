import './globals.css';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import MouseTracker from '@/components/MouseTracker';

// Load Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Green Gift',
  description: 'Nature-inspired shopping experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Razorpay Checkout Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className="font-poppins bg-black text-white">
        <AuthProvider>
          <CartProvider>
            <MouseTracker />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
