import { CartProvider } from "@/context/CartContext";
import MouseTracker from "@/components/MouseTracker"; // 👈 Add this line
import { AuthProvider } from '@/context/AuthContext';

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
