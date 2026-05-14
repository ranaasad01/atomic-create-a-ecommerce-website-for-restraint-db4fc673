"use client";
import React, { useState, useEffect } from "react";
import { Star, X, ShoppingCart, Heart, Search, Menu, User, Package, LogOut, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { categories } from "@/lib/data/categories";
import { Button } from "@/components/ui/Button";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, max = 5, size = "md", showValue = false, className }: StarRatingProps) {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizes[size],
            i < Math.floor(rating) ? "fill-[#f5a623] text-[#f5a623]" : "fill-transparent text-gray-600"
          )}
        />
      ))}
      {showValue && <span className="text-sm text-gray-400 ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
}

export function Header() {
  const { totalItems, openCart, items, removeItem, updateQuantity, subtotal, isOpen, closeCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
        )}
      >
        <div className="bg-[#e94560] text-white text-xs text-center py-1.5 px-4">
          Discreet billing and packaging on all orders · Free shipping over $75
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e94560] to-[#c73652] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
                Velvet<span className="text-[#e94560]">Luxe</span>
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={"/category/" + cat.slug}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/wishlist" className="p-2 text-gray-300 hover:text-white transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="relative group">
                  <button className="p-2 text-gray-300 hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#2d2d2d] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                        <User className="w-4 h-4" />
                        <span>Account</span>
                      </Link>
                      <Link href="/account/orders" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                        <Package className="w-4 h-4" />
                        <span>Orders</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth" className="p-2 text-gray-300 hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
              <button
                onClick={openCart}
                className="p-2 text-gray-300 hover:text-white transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
          {searchOpen && (
            <div className="pb-3">
              <form action="/search" className="flex gap-2">
                <input
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#e94560]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#e94560] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c73652] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-[#1a1a2e] border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={"/category/" + cat.slug}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 text-gray-300 hover:text-white border-b border-white/5 text-sm"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
              <div className="pt-2 flex gap-3">
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 border border-white/20 rounded-lg text-gray-300 text-sm hover:border-[#e94560] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 bg-[#e94560] rounded-lg text-white text-sm font-semibold hover:bg-[#c73652] transition-colors"
                >
                  Cart ({totalItems})
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a2e] border-l border-white/10 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Shopping Cart ({totalItems})</h2>
              <button onClick={closeCart} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <button onClick={closeCart} className="mt-4 text-[#e94560] text-sm hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 bg-white/5 rounded-xl p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-[#e94560] text-sm font-bold">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="text-gray-500 text-xs">Shipping calculated at checkout. Discreet billing available.</p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="primary" size="lg" fullWidth>Checkout</Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" size="md" fullWidth>View Cart</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const shopLinks: [string, string][] = [
    ["Sign In / Register", "/auth"],
    ["My Account", "/account"],
    ["Order History", "/account/orders"],
    ["Wishlist", "/wishlist"],
    ["Cart", "/cart"],
  ];
  const helpLinks: [string, string][] = [
    ["About Us", "/about"],
    ["FAQ", "/faq"],
    ["Shipping & Returns", "/shipping"],
    ["Privacy Policy", "/privacy"],
  ];

  return (
    <footer className="bg-[#0d0d1a] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e94560] to-[#c73652] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-white">
                Velvet<span className="text-[#e94560]">Luxe</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Premium adult boutique offering curated, body-safe intimate products for every desire. Discreet shipping guaranteed.
            </p>
            <div className="flex gap-3">
              {["T", "I", "F"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e94560] transition-all text-xs font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={"/category/" + cat.slug}
                    className="text-gray-400 hover:text-[#e94560] text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              {shopLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#e94560] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-2 mb-6">
              {helpLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#e94560] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#e94560]"
              />
              <button
                type="submit"
                className="bg-[#e94560] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#c73652] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            2024 VelvetLuxe. All rights reserved. For adults 18+ only.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">SSL Secured</span>
            <span className="text-gray-500 text-xs">Discreet Packaging</span>
            <span className="text-gray-500 text-xs">Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
