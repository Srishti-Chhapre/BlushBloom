import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pink-200 text-gray-700 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-start gap-8">
        {/* Brand and Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">BlushBloom</h1>
          <p className="text-sm mb-4 text-center md:text-left">Bringing Fresh Blooms to Your Doorstep 🌸</p>

          {/* Social Media Section */}
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
              <Facebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
              <Instagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
              <Twitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-600">Home</a></li>
            <li><a href="/categories" className="hover:text-pink-600">Categories</a></li>
            <li><a href="/products" className="hover:text-pink-600">Products</a></li>
            <li><a href="/sellers" className="hover:text-pink-600">Sellers</a></li>
            <li><a href="/contact" className="hover:text-pink-600">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Contact</h2>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ support@blushbloom.com</p>
          <p className="text-sm">📍 Mumbai, India</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-pink-300 pt-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} BlushBloom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
