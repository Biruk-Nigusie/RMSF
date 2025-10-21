// components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RMS</span>
              </div>
              <span className="text-xl font-bold">Residential Management</span>
            </Link>
            <p className="text-blue-200 mb-4 max-w-md">
              Streamlining residential management with modern technology. 
              Making property management easier for everyone involved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-teal transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-blue-200 hover:text-teal transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-blue-200 hover:text-teal transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-teal transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-200 hover:text-teal transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-blue-200 hover:text-teal transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-blue-200">
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ support@rms.com</li>
              <li>🏢 123 Management St, City</li>
              <li>🕒 Mon-Fri: 9AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 Residential Management System. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-blue-200 hover:text-teal text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-200 hover:text-teal text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-blue-200 hover:text-teal text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;