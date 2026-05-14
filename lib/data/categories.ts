import { Category } from "../types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "restraints-bdsm",
    name: "Restraints & BDSM Gear",
    description:
      "Explore our premium collection of restraints, bondage gear, and BDSM accessories crafted for comfort, safety, and pleasure.",
    image: "https://m.media-amazon.com/images/I/718VPRnoUgL._AC_UF1000,1000_QL80_.jpg",
    productCount: 48,
    color: "#e94560",
  },
  {
    id: "2",
    slug: "penetrative-toys",
    name: "Penetrative Toys",
    description:
      "Discover our curated selection of premium penetrative toys designed for ultimate satisfaction and exploration.",
    image: "https://cdn11.bigcommerce.com/s-ag44yndgni/images/stencil/1280x1280/products/129/583/IMG_1541OK__00107.1687086385.jpg?c=1",
    productCount: 62,
    color: "#f5a623",
  },
  {
    id: "3",
    slug: "vibrators",
    name: "Vibrators",
    description:
      "From discreet bullet vibes to powerful wand massagers — find your perfect vibration companion.",
    image: "https://i5.walmartimages.com/asr/0c335360-d7e8-4ffa-9e93-566280faa015.12046dbbeba6d0ac5ca6587384bc3b82.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    productCount: 74,
    color: "#9b59b6",
  },
  {
    id: "4",
    slug: "sensation-play",
    name: "Sensation Play",
    description:
      "Heighten every sense with our collection of sensation play tools — feathers, floggers, temperature toys, and more.",
    image: "https://framerusercontent.com/images/o7rCSBBaFzToCAcSzgO7FLFWISY.jpg?width=1586&height=1004",
    productCount: 35,
    color: "#1abc9c",
  },
  {
    id: "5",
    slug: "enhancement-products",
    name: "Enhancement Products",
    description:
      "Premium lubricants, arousal gels, performance enhancers, and intimate wellness products for elevated experiences.",
    image: "https://www.fda.gov/files/styles/portrait_3_4_450_x_600/public/DYNAMITE%20Male%20Sexual%20Enhancement%20IPN%20Photo.jpg?itok=5RY7dbi2",
    productCount: 41,
    color: "#3498db",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
