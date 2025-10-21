// components/Footer.jsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  Building,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12" style={{color:"white"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div
                className="w-10 h-10 
               rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">RMS</span>
              </div>
              <span className="text-xl font-bold">Residential Management</span>
            </Link>
            <p className="text-white mb-4 max-w-md">
              Streamlining residential management with modern technology. Making
              property management easier for everyone involved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-900 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-900 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-900 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-blue-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-blue-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-900 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-900 transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@rms.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Building size={16} />
                <span>123 Management St, City</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © 2024 Residential Management System. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white hover:text-blue-900 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-900 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-900 text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
