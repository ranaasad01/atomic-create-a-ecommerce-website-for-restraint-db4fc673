import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { AgeGate } from "@/components/ui/Badge";
import { Header, Footer } from "@/components/ui/StarRating";

export const metadata: Metadata = {
  title: "VelvetLuxe — Premium Adult Boutique",
  description: "Curated, body-safe intimate products. Discreet billing and packaging on every order. For adults 18+ only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a2e] text-white antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AgeGate>
                <Header />
                <main className="pt-[88px]">{children}</main>
                <Footer />
              </AgeGate>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
