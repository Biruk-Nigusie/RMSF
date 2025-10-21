// pages/About.jsx
import { Link } from "react-router-dom";
import { 
  Users, 
  Shield, 
  Zap, 
  Smartphone, 
  Target,
  Eye,
  Award,
  Heart,
  Building,
  Clock,
  CheckCircle,
  Star,
  MapPin
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Streamlined processes designed for Addis Ababa's growing urban communities"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Trusted",
      description: "Bank-level security trusted by condominiums across Addis Ababa"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Built for Ethiopia's mobile-first generation with low data usage"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Local Expertise",
      description: "Designed specifically for Addis Ababa's unique property management needs"
    }
  ];

  const team = [
    {
      name: "Mikias Haile",
      role: "CEO & Founder",
      description: "Former real estate developer with 8+ years in Addis Ababa property market",
      expertise: "Local Market Expert",
      location: "Addis Ababa"
    },
    {
      name: "Selamawit Bekele",
      role: "CTO",
      description: "Software engineer with focus on scalable solutions for Ethiopian infrastructure",
      expertise: "Technology Lead",
      location: "Addis Ababa"
    },
    {
      name: "Dawit Tesfaye",
      role: "Head of Product",
      description: "Product specialist with deep understanding of Ethiopian user experience",
      expertise: "Product Design",
      location: "Addis Ababa"
    },
    {
      name: "Hana Mohammed",
      role: "Customer Success",
      description: "Dedicated to serving our growing community in Addis Ababa and beyond",
      expertise: "Client Relations",
      location: "Addis Ababa"
    }
  ];

  const stats = [
    { number: "250+", label: "Condominiums in Addis", color: "text-indigo-600", icon: <Building className="w-6 h-6" /> },
    { number: "50K+", label: "Residents Served", color: "text-cyan-600", icon: <Users className="w-6 h-6" /> },
    { number: "15+", label: "Subcities in Addis", color: "text-violet-600", icon: <MapPin className="w-6 h-6" /> },
    { number: "98%", label: "Satisfaction Rate", color: "text-emerald-600", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community First",
      description: "We prioritize the unique needs of Addis Ababa's diverse communities"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Local Innovation",
      description: "Building technology solutions that work for Ethiopia's specific context"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Reliability",
      description: "Your property data is secure with our locally-hosted solutions"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excellence",
      description: "Committed to delivering world-class service to Ethiopian residents"
    }
  ];

  const milestones = [
    { year: "2021", event: "Founded in Addis Ababa", description: "Started with a vision to transform property management in Ethiopia" },
    { year: "2022", event: "First 50 Condominiums", description: "Onboarded our first condominiums in Bole and CMC areas" },
    { year: "2023", event: "Expansion Across Addis", description: "Grew to serve communities in 15+ subcities of Addis Ababa" },
    { year: "2024", event: "Mobile App Launch", description: "Launched our mobile app optimized for Ethiopian networks" },
    { year: "2024", event: "50,000 Residents", description: "Reached milestone of serving 50,000+ residents in Addis" }
  ];

  const areasServed = [
    "Bole", "CMC", "Megenagna", "Gotera", "Merkato", "Piazza",
    "Kazanches", "Sarbet", "Old Airport", "Bole Arabsa", "Summit",
    "Lebu", "Sarris", "Yeka", "Gurd Shola", "Kotebe"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <MapPin className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-semibold">Proudly Based in Addis Ababa, Ethiopia</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">RMS Ethiopia</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing residential management in Addis Ababa through technology built for Ethiopia. 
            Our platform brings together property managers, residents, and service providers in one seamless ecosystem.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To transform residential management in Addis Ababa by providing intelligent tools that enhance communication, 
                streamline operations, and create exceptional living experiences for Ethiopian communities.
              </p>
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-cyan-800 text-sm font-medium">
                  🎯 Focused on solving unique challenges faced by Addis Ababa condominiums and apartments
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become Ethiopia's most trusted residential management platform, setting new standards 
                for innovation and community engagement in Addis Ababa's rapidly growing real estate market.
              </p>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-purple-800 text-sm font-medium">
                  🌍 Expanding to serve major cities across Ethiopia while maintaining our Addis roots
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gradient-to-br from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Addis Ababa</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technology solutions designed specifically for Ethiopia's capital city
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas Served in Addis */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Across Addis Ababa</h2>
            <p className="text-lg text-gray-600">
              We're proud to serve communities in these subcities and neighborhoods
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {areasServed.map((area, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm border border-white group hover:bg-white hover:shadow-md transition-all duration-300">
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Ethiopian Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide our service to Ethiopian communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Ethiopian Journey</h2>
            <p className="text-xl text-gray-600">
              Growing with Addis Ababa's real estate market since 2021
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8 pl-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300">
                      <div className="text-sm font-semibold text-indigo-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.event}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Addis Ababa Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate Ethiopians building technology solutions for our communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                <div className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-2">
                  {member.expertise}
                </div>
                <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{member.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Building className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Addis Ababa Property?</h2>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Join hundreds of condominiums and thousands of residents in Addis Ababa who are already experiencing modern property management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Visit Our Addis Office
              </Link>
            </div>
            <p className="mt-8 text-blue-200 text-sm">
              Based in Bole, Addis Ababa • Local Support • Amharic & English Speaking Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;