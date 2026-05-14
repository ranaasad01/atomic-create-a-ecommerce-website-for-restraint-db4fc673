"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Shield, Package, Sparkles, ChevronRight, Heart } from 'lucide-react';
import { products, getBestsellerProducts, getFeaturedProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-[#12122a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#e94560]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={"/product/" + product.slug} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#2d1a2e]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-[#e94560] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">New</span>
            )}
            {product.isBestseller && (
              <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Bestseller</span>
            )}
            {discount && (
              <span className="bg-[#f5a623] text-[#1a1a2e] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={() => toggleItem(product)}
        className="absolute top-3 right-3 w-8 h-8 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-[#e94560] border border-white/10"
      >
        <Heart className={inWishlist ? "w-4 h-4 fill-[#e94560] text-[#e94560]" : "w-4 h-4 text-gray-300"} />
      </button>
      <div className="p-4">
        <Link href={"/product/" + product.slug}>
          <p className="text-xs text-[#e94560] font-medium mb-1">{product.category}</p>
          <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-[#e94560] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < Math.floor(product.rating) ? "w-3 h-3 fill-[#f5a623] text-[#f5a623]" : "w-3 h-3 fill-transparent text-gray-600"}
            />
          ))}
          <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-base">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-xs line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="text-xs bg-[#e94560] hover:bg-[#c73652] text-white px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const bestsellers = getBestsellerProducts();
  const featured = getFeaturedProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#1a0a1e] to-[#0d0d1a]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,#e94560,transparent_50%),radial-gradient(circle_at_80%_20%,#f5a623,transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e94560]/10 border border-[#e94560]/30 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#e94560]" />
              <span className="text-[#e94560] text-xs font-semibold tracking-wide uppercase">New Arrivals Just Dropped</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Explore Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#f5a623]">
                Desires
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Premium, body-safe intimate products curated for every journey. From beginner-friendly essentials to luxury BDSM gear — discover pleasure without compromise.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/category/vibrators">
                <Button variant="primary" size="lg">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/category/restraints-bdsm">
                <Button variant="outline" size="lg">
                  Explore BDSM Gear
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#f5a623]" />
                <span className="text-gray-400 text-sm">Discreet Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#f5a623]" />
                <span className="text-gray-400 text-sm">Plain Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#f5a623]" />
                <span className="text-gray-400 text-sm">4.8 Star Rated</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {featured.slice(0, 4).map((product, i) => (
              <Link
                key={product.id}
                href={"/product/" + product.slug}
                className={
                  "relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2d1a2e] to-[#1a1a2e] border border-white/10 hover:border-[#e94560]/40 transition-all group " +
                  (i === 0 ? "col-span-2 aspect-video" : "aspect-square")
                }
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-sm truncate">{product.name}</p>
                  <p className="text-[#e94560] font-bold text-sm">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/10 bg-[#12122a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "🔒", title: "Discreet Billing", desc: "Appears as VL Holdings on statements" },
              { icon: "📦", title: "Plain Packaging", desc: "No branding on outer packaging" },
              { icon: "🚚", title: "Free Shipping $75+", desc: "Fast, tracked delivery nationwide" },
              { icon: "✅", title: "Body-Safe Certified", desc: "All products phthalate and latex-free" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1 py-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Browse by Category</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Shop Your Pleasure</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={"/category/" + cat.slug}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-video relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg mb-1">{cat.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{cat.productCount} products</span>
                    <span className="flex items-center gap-1 text-[#e94560] text-sm font-semibold">
                      Shop Now <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-[#12122a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-2">Most Loved</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Bestsellers</h2>
            </div>
            <Link href="/search" className="hidden sm:flex items-center gap-1 text-[#e94560] text-sm font-semibold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#e94560] via-[#c73652] to-[#9b1a3a] p-10 sm:p-14">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_50%,#f5a623,transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">Limited Time Offer</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">20% Off Your First Order</h2>
              <p className="text-white/80 text-base max-w-md">
                Use code{" "}
                <span className="font-bold bg-white/20 px-2 py-0.5 rounded">VELVET20</span>
                {" "}at checkout. Valid on all products. New customers only.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/category/vibrators">
                <button className="bg-white text-[#e94560] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-base whitespace-nowrap shadow-lg">
                  Claim Offer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Fresh In</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">New Arrivals</h2>
          </div>
          <Link href="/search" className="hidden sm:flex items-center gap-1 text-[#e94560] text-sm font-semibold hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.filter((p) => p.isNew).slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why VelvetLuxe */}
      <section className="bg-[#12122a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">The VelvetLuxe Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Body-Safe Materials Only",
                desc: "Every product is rigorously vetted for safety. We only carry phthalate-free, body-safe silicone, glass, stainless steel, and ABS materials.",
              },
              {
                icon: "🔐",
                title: "Complete Privacy",
                desc: "Your privacy is paramount. Discreet billing under VL Holdings, plain outer packaging, and encrypted checkout on every order.",
              },
              {
                icon: "💬",
                title: "Sex-Positive Community",
                desc: "We believe in pleasure without shame. Our guides, reviews, and customer support are judgment-free and education-focused.",
              },
              {
                icon: "🌟",
                title: "Curated Selection",
                desc: "Every product is hand-selected by our team of intimacy experts. No cheap fillers — only premium products that deliver.",
              },
              {
                icon: "↩️",
                title: "Hassle-Free Returns",
                desc: "Not satisfied? Return unopened products within 30 days for a full refund. No questions asked, no awkward conversations.",
              },
              {
                icon: "🚀",
                title: "Fast, Tracked Shipping",
                desc: "Orders placed before 2pm ship same day. Free tracked shipping on all orders over $75. Express options available.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 hover:border-[#e94560]/30 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-2">Customer Love</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#f5a623] text-[#f5a623]" />
            ))}
            <span className="text-white font-bold ml-2">4.8</span>
            <span className="text-gray-400 text-sm">from 2,400+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah M.",
              rating: 5,
              title: "Absolutely life-changing!",
              body: "I was nervous ordering for the first time but the packaging was completely discreet and the product quality is incredible. Will definitely be a repeat customer.",
              product: "Rose Suction Vibrator",
            },
            {
              name: "James K.",
              rating: 5,
              title: "Premium quality, fast shipping",
              body: "The velvet cuffs are exactly as described — incredibly soft yet sturdy. Arrived in plain packaging as promised. Customer service was also super helpful.",
              product: "Velvet Wrist Cuffs",
            },
            {
              name: "Emma R.",
              rating: 5,
              title: "Best adult store online",
              body: "VelvetLuxe has the best curated selection I have found. Everything is body-safe, the descriptions are honest, and checkout was seamless. 10 out of 10.",
              product: "Rabbit Vibrator",
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-[#12122a] border border-white/10 rounded-2xl p-6 hover:border-[#e94560]/20 transition-all"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f5a623] text-[#f5a623]" />
                ))}
              </div>
              <h4 className="text-white font-bold text-sm mb-2">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{review.body}</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-xs">Verified Purchase</p>
                </div>
                <span className="text-[#e94560] text-xs">{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#12122a] border-t border-white/10 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[#e94560] text-sm font-semibold uppercase tracking-widest mb-3">Stay in the Loop</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join the VelvetLuxe Community</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Get exclusive deals, new arrival alerts, and intimate wellness tips delivered discreetly to your inbox. Unsubscribe anytime.
          </p>
          {subscribed ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <p className="text-emerald-400 font-semibold text-lg">You are in!</p>
              <p className="text-gray-400 text-sm mt-1">Check your inbox for a welcome gift — 10% off your first order.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
              />
              <Button variant="primary" size="lg" type="submit">
                Subscribe
              </Button>
            </form>
          )}
          <p className="text-gray-600 text-xs mt-4">We respect your privacy. No spam, ever. Unsubscribe with one click.</p>
        </div>
      </section>

    </div>
  );
}
