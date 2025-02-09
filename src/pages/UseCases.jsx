import React from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  ArrowRight,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Ticket,
  Book,
  Share2,
  MapPin,
  CreditCard,
  Smartphone,
  Megaphone,
} from "lucide-react";
import { Footer } from "../components/Sections";
import SEO from "../components/SEO";

const UseCaseHero = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          QR Code Use Cases & Applications
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Discover innovative ways to use QR codes across different industries
          and scenarios
        </p>
      </div>
    </div>
  </section>
);

const UseCaseCard = ({ title, description, icon: Icon, examples, link }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 ml-4">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2 mb-6">
      {examples.map((example, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 mr-2">•</span>
          <span className="text-gray-600">{example}</span>
        </li>
      ))}
    </ul>
    <Link
      to={link}
      className="inline-flex items-center text-blue-600 hover:text-blue-700"
    >
      Create QR Code
      <ArrowRight className="ml-2 w-4 h-4" />
    </Link>
  </div>
);

const UseCaseContent = () => {
  const useCases = [
    {
      title: "Business & Marketing",
      icon: Building2,
      description:
        "Enhance your business communications and marketing campaigns with QR codes.",
      examples: [
        "Business cards with digital contact information",
        "Product packaging with detailed specifications",
        "Marketing materials with campaign tracking",
        "Digital catalogs and brochures",
        "Customer feedback and review collection",
      ],
      link: "/generate-free-qr-code-for-url",
    },
    {
      title: "Retail & E-commerce",
      icon: ShoppingBag,
      description:
        "Bridge the gap between physical and digital shopping experiences.",
      examples: [
        "Product information and authenticity verification",
        "Mobile payment integration",
        "Digital loyalty programs",
        "In-store navigation",
        "Special offers and discounts",
      ],
      link: "/generate-free-qr-code-for-url",
    },
    {
      title: "Restaurants & Hospitality",
      icon: UtensilsCrossed,
      description: "Modernize your guest experience with digital solutions.",
      examples: [
        "Digital menus with photos and descriptions",
        "Contactless ordering systems",
        "Customer reviews and ratings",
        "Reservation systems",
        "Special dietary information",
      ],
      link: "/generate-free-qr-code-for-url",
    },
    {
      title: "Events & Entertainment",
      icon: Ticket,
      description:
        "Streamline event management and enhance attendee experience.",
      examples: [
        "Digital tickets and passes",
        "Event schedules and maps",
        "Speaker information and presentations",
        "Social media integration",
        "Live polling and feedback",
      ],
      link: "/generate-free-qr-code-for-url",
    },
    {
      title: "Education & Training",
      icon: Book,
      description:
        "Create interactive learning experiences with QR-enhanced materials.",
      examples: [
        "Interactive learning materials",
        "Assignment submissions",
        "Campus navigation",
        "Library resources",
        "Student ID and access control",
      ],
      link: "/generate-free-qr-code-for-text",
    },
    {
      title: "Social Media & Networking",
      icon: Share2,
      description:
        "Connect your physical presence to social platforms seamlessly.",
      examples: [
        "Social media profile links",
        "Follow/Like page prompts",
        "Content sharing",
        "Event check-ins",
        "Social proof and testimonials",
      ],
      link: "/generate-free-qr-code-for-url",
    },
    {
      title: "Tourism & Travel",
      icon: MapPin,
      description: "Enhance tourist experiences with interactive information.",
      examples: [
        "Tourist attraction information",
        "Audio guides and tours",
        "Transportation schedules",
        "Local recommendations",
        "Emergency information",
      ],
      link: "/generate-free-qr-code-for-text",
    },
    {
      title: "Payment & Finance",
      icon: CreditCard,
      description: "Facilitate secure and convenient payment processes.",
      examples: [
        "Contactless payments",
        "Digital invoicing",
        "Donation collection",
        "Cryptocurrency transactions",
        "Payment verification",
      ],
      link: "/generate-free-qr-code-for-text",
    },
    {
      title: "Technology & Apps",
      icon: Smartphone,
      description: "Streamline app distribution and tech support.",
      examples: [
        "App download links",
        "WiFi network sharing",
        "Technical documentation",
        "Support resources",
        "Software activation",
      ],
      link: "/generate-free-qr-code-for-wifi",
    },
    {
      title: "Advertising & Promotions",
      icon: Megaphone,
      description:
        "Create engaging promotional campaigns with trackable results.",
      examples: [
        "Billboard and print ad engagement",
        "Coupon distribution",
        "Contest entries",
        "Product launches",
        "Campaign analytics",
      ],
      link: "/generate-free-qr-code-for-url",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} />
          ))}
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Ready to create your QR code?
          </h2>
          <p className="text-blue-700 mb-6">
            Start generating custom QR codes for your specific use case with our
            easy-to-use tool.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create QR Code Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const UseCasesPage = () => {
  const useCasesSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "QR Code Use Cases & Applications",
    description:
      "Comprehensive guide to QR code applications across different industries including business, retail, education, events, and more.",
    articleSection: "Technology",
    keywords: [
      "QR code use cases",
      "QR code applications",
      "business QR codes",
      "retail QR codes",
      "restaurant QR codes",
      "event QR codes",
      "educational QR codes",
      "marketing QR codes",
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://qr-code-generator.com/use-cases",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="QR Code Use Cases & Applications | Complete Guide with Examples"
        description="Discover innovative ways to use QR codes in business, retail, education, events, and more. Comprehensive guide with practical examples and implementation tips."
        canonicalUrl="/use-cases"
        schema={useCasesSchema}
      />
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <QrCode className="w-8 h-8 text-blue-500 mr-3" />
              <div className="text-xl font-bold text-gray-800">
                QR Code Generator
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <UseCaseHero />
      <UseCaseContent />
      <Footer />
    </div>
  );
};

export default UseCasesPage;
