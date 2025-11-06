import { CartProvider } from "@/context/CartContext";
import MouseTracker from "@/components/MouseTracker";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
<Script src="https://checkout.razorpay.com/v1/checkout.js" />

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
