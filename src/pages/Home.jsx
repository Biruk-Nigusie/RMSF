import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.type === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const features = [
    {
      icon: "🏢",
      title: "Condominium Management",
      description: "Complete management solution for Addis Ababa condominiums and apartments"
    },
    {
      icon: "💰",
      title: "Rent & Utility Collection",
      description: "Automated rent collection and utility bill management in ETB for Addis residents"
    },
    {
      icon: "🔧",
      title: "Maintenance Services",
      description: "Efficient handling of maintenance requests and repairs across Addis Ababa"
    },
    {
      icon: "📊",
      title: "Financial Reports",
      description: "Detailed financial insights and reporting tailored for Addis properties"
    }
  ];

  const stats = [
    { number: "25K+", label: "Units Managed in Addis" },
    { number: "100K+", label: "Addis Residents Served" },
    { number: "50+", label: "Addis Subcities Covered" },
    { number: "24/7", label: "Amharic Support" }
  ];

  const testimonials = [
    {
      name: "Alemayehu Bekele",
      role: "Property Manager, Bole",
      text: "This system has transformed how we manage our condominiums in Bole. Perfect for Addis Ababa property managers!",
      location: "Bole, Addis Ababa"
    },
    {
      name: "Sara Mohammed",
      role: "Apartment Owner",
      text: "Managing my apartments in Kirkos and Yeka has never been easier. The local Addis support is excellent!",
      location: "Kirkos, Addis Ababa"
    },
    {
      name: "Teklu Wondimu",
      role: "Housing Association President",
      text: "Perfect for Addis Ababa condominium associations. Makes collective decision-making smooth across our city.",
      location: "Gulele, Addis Ababa"
    }
  ];

  const addisSubcities = ['Bole', 'Kirkos', 'Yeka', 'Gulele', 'Arada', 'Addis Ketema', 'Lideta', 'Nifas Silk', 'Kolfe Keranio', 'Akaki Kality'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Addis Ababa Skyline Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 40 L20 20 L30 40 L40 15 L50 40 L60 25 L70 40 L80 10 L90 40 L100 30 L110 40 L120 20' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3Cpath d='M15 40 L15 80 M25 20 L25 80 M35 40 L35 80 M45 15 L45 80 M55 40 L55 80 M65 25 L65 80 M75 40 L75 80 M85 10 L85 80 M95 40 L95 80 M105 30 L105 80 M115 40 L115 80' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 200px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24">
          <div className="text-center">
            {/* Addis Ababa Badge */}
            <div className="inline-flex items-center bg-yellow-400 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🇪🇹 Addis Ababa • አዲስ አበባ
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">AddisRMS</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Residential Management System - Designed specifically for Addis Ababa condominiums and apartments. 
              Streamline operations with local payment integration and Amharic support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => navigate("/register")}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚀 Start Free Trial
              </button>
              <button 
                onClick={() => navigate("/features")}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                📽️ View Demo
              </button>
            </div>

            {/* Feature Showcase */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-white/20">
              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl mr-4">{features[currentFeature].icon}</div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white">{features[currentFeature].title}</h3>
                  <p className="text-blue-100">{features[currentFeature].description}</p>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-yellow-400 scale-125' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentFeature(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose AddisRMS?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for Addis Ababa residential property management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Addis Residents Say</h2>
            <p className="text-xl text-gray-600">Trusted by property managers across Addis Ababa</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100">
              <div className="text-blue-500 text-4xl mb-4 text-center">❝</div>
              <p className="text-xl text-gray-700 text-center mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                <p className="text-gray-600 mb-2">{testimonials[currentTestimonial].role}</p>
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  📍 {testimonials[currentTestimonial].location}
                </div>
              </div>
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Addis Ababa Subcities Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Serving All Addis Ababa Subcities</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From Bole to Akaki Kality, our platform supports property management across all 10 subcities of Addis Ababa with local expertise and community-focused solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {addisSubcities.map((subcity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-yellow-300 mr-3 text-lg">✓</span>
                    <span className="text-lg font-medium">{subcity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Local Addis Integration</h3>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {['CBE Birr', 'Tele Birr', 'Amharic Support', 'Local Maintenance', 'Addis Utilities', 'City Admin'].map((method, index) => (
                  <span 
                    key={index}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <p className="text-blue-100 text-center text-lg">
                Tailored specifically for Addis Ababa's unique residential management needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Addis Property?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of Addis Ababa property managers who trust AddisRMS with their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/register")}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🏠 Get Started Today
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              📅 Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">AddisRMS</h3>
            <p className="text-blue-200 text-lg">Residential Management System for Addis Ababa 🇪🇹</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#" className="text-blue-200 hover:text-yellow-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-yellow-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-blue-200 hover:text-yellow-300 transition-colors">Contact Us</a>
            <a href="#" className="text-blue-200 hover:text-yellow-300 transition-colors">Amharic Support</a>
          </div>
          <div className="border-t border-blue-700 pt-8 text-center">
            <p className="text-blue-200">
              &copy; 2024 AddisRMS. Designed specifically for Addis Ababa condominiums and apartments.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;