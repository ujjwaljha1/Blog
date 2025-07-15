import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Install: npm i lucide-react

const items = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUser, setUser] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        JSON.parse(userStr);
        setUser(true);
      } catch (err) {
        setUser(false);
      }
    }
  }, []);

  const handleAuthAction = () => {
    if (isUser) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      window.location.href = "/login"; 
    }
  };

  return (
    <nav className="text-white  shadow-lg sticky top-4 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">🚀 MyBrand</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative px-3 py-2 text-lg font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-105"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleAuthAction}
              className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-yellow-300 hover:text-black transition-all"
            >
              {isUser ? "Sign Out" : "Sign In"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-700 shadow-md rounded-b-lg">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-3 py-2 rounded text-white text-base hover:bg-blue-500 transition"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={handleAuthAction}
            className="w-full mt-2 bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-yellow-300 hover:text-black transition-all"
          >
            {isUser ? "Sign Out" : "Sign In"}
          </button>
        </div>
      )}
    </nav>
  );
}
