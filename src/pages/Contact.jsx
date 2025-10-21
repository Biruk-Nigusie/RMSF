// pages/Contact.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building,
  User,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Our Office",
      details: [
        "Bole Road, Friendship Building",
        "6th Floor, Suite 601",
        "Addis Ababa, Ethiopia",
      ],
      description: "Located in the heart of Bole, Addis Ababa",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+251 91 234 5678", "+251 92 345 6789"],
      description: "Available Monday-Saturday, 8:30AM-6:30PM EAT",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "sales", label: "Sales Question" },
    { value: "billing", label: "Billing Issue" },
    { value: "feature", label: "Feature Request" },
    { value: "partnership", label: "Partnership" },
    { value: "condominium", label: "Condominium Setup" },
    { value: "training", label: "Training Request" },
  ];

  const faqs = [
    {
      question:
        "How quickly do you respond to support requests in Addis Ababa?",
      answer:
        "We typically respond to all support requests within 2-4 hours during business hours in Addis Ababa time. Emergency issues are prioritized and addressed immediately.",
    },
    {
      question: "Do you offer custom solutions for Addis Ababa condominiums?",
      answer:
        "Yes, we provide customized solutions specifically designed for Addis Ababa's condominium complexes and property management needs. Contact our local team for a tailored demo.",
    },
    {
      question: "What local payment methods do you support?",
      answer:
        "We support all major Ethiopian payment methods including CBE Birr, Tele Birr, M-Birr, HelloCash, and bank transfers for Addis Ababa residents.",
    },
    {
      question: "Do you provide Amharic language support?",
      answer:
        "Absolutely! All our support services are available in both Amharic and English. Our local team in Addis Ababa provides comprehensive assistance in your preferred language.",
    },
  ];

  const addisSubcities = [
    "Bole",
    "Kirkos",
    "Yeka",
    "Gulele",
    "Arada",
    "Addis Ketema",
    "Lideta",
    "Nifas Silk",
    "Kolfe Keranio",
    "Akaki Kality",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}

      <section className="relative py-16 bg-blue-900">
        <div className="absolute inset-0 opacity-5 ">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 40 L20 20 L30 40 L40 15 L50 40 L60 25 L70 40 L80 10 L90 40 L100 30 L110 40 L120 20' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3Cpath d='M15 40 L15 80 M25 20 L25 80 M35 40 L35 80 M45 15 L45 80 M55 40 L55 80 M65 25 L65 80 M75 40 L75 80 M85 10 L85 80 M95 40 L95 80 M105 30 L105 80 M115 40 L115 80' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "300px 200px",
            }}
          ></div>
        </div>
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center "
          style={{ color: "white" }}
        >
          <div className="inline-flex items-center bg-blue-800  px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🇪🇹 Addis Ababa • አዲስ አበባ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact AddisRMS
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get in touch with our Addis Ababa team. We're here to help you
            manage your properties better in the capital.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2" style={{ color: "#1C398E" }}>
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-blue-100">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="text-blue-900" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting AddisRMS. We'll get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-3 top-3.5 text-gray-400"
                        />
                        <div className="absolute left-10 top-3.5 text-gray-500">
                          +251
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="9XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-900 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    style={{ color: "white" }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div className="mt-12" style={{ color: "#1C398E" }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-blue-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8" style={{ color: "#1C398E" }}>
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-blue-50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12  rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 mb-1">
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-gray-500 mt-2">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section
        className="bg-white py-16 border-t border-gray-200"
        style={{ color: "#1C398E" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Addis Ababa Office
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Bole, our headquarters is easily
              accessible and equipped with modern facilities to serve you better
              across Addis Ababa.
            </p>
          </div>

          {/* Placeholder for Map */}
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl h-96 flex items-center justify-center border border-blue-200">
            <div className="text-center">
              <MapPin size={48} className="text-blue-500 mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-semibold">
                Addis Ababa Office Location
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Bole Road, Friendship Building, 6th Floor, Suite 601
              </p>
              <p className="text-gray-500 text-sm">Addis Ababa, Ethiopia</p>
              <div
                className="mt-4 inline-flex items-center bg-blue-900 text-blue-800 px-6 py-2 rounded-full text-sm font-medium"
                style={{ color: "white" }}
              >
                🇪🇹 Located in Bole, Addis Ababa
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
