import React from "react";
import { Link } from "react-router-dom";
import { QrCode, ArrowRight } from "lucide-react";
import { Footer } from "../components/Sections";
import SEO from "../components/SEO";

const FAQHero = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Frequently Asked Questions About QR Codes
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Everything you need to know about creating and using QR codes for your
          business or personal use.
        </p>
      </div>
    </div>
  </section>
);

const FAQContent = () => {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is a QR code?",
          a: "A QR code (Quick Response code) is a two-dimensional barcode that can store data such as website URLs, plain text, contact information, or WiFi credentials. When scanned with a smartphone camera or QR reader, it quickly provides access to the encoded information.",
        },
        {
          q: "Are the QR codes free to use?",
          a: "Yes, all QR codes generated on our platform are completely free to use for both personal and commercial purposes. There are no hidden fees or subscriptions required.",
        },
        {
          q: "How long do the QR codes last?",
          a: "The QR codes generated are permanent and never expire. Once you download your QR code, it will continue to work indefinitely as long as the content it links to (such as websites or files) remains accessible.",
        },
      ],
    },
    {
      category: "Technical Questions",
      questions: [
        {
          q: "What types of QR codes can I create?",
          a: "Our platform supports multiple QR code types including: URLs for websites, plain text messages, email addresses with pre-filled content, phone numbers for direct calling, SMS messages with pre-filled text, and WiFi network credentials for instant connection.",
        },
        {
          q: "What's the best format to download QR codes in?",
          a: "We offer two formats: PNG and SVG. PNG is best for digital use and social media, while SVG is ideal for print materials as it can be scaled to any size without losing quality. For professional printing, we recommend using SVG format.",
        },
        {
          q: "How do I customize my QR code?",
          a: "You can customize your QR code's appearance by changing colors, patterns, adding frames with custom text, and selecting different styles for dots and corners. We offer multiple preset designs and full custom options while maintaining optimal scannability.",
        },
      ],
    },
    {
      category: "Usage & Best Practices",
      questions: [
        {
          q: "How do I ensure my QR code is scannable?",
          a: "To ensure good scannability: maintain sufficient contrast between QR code and background colors, ensure adequate size (minimum 2x2 cm for print), include quiet zone (white space) around the code, and test the code before final deployment.",
        },
        {
          q: "Where can I use these QR codes?",
          a: "QR codes can be used in various scenarios: business cards, product packaging, promotional materials, restaurant menus, event tickets, educational materials, social media profiles, and more. They're versatile for both print and digital applications.",
        },
        {
          q: "Can I track QR code scans?",
          a: "While our basic QR codes don't include built-in tracking, you can use URL shortening services or analytics tools with your destination URL to track scans and gather usage statistics.",
        },
      ],
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqs.map((category, idx) => (
          <div key={idx} className="mb-16 last:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.questions.map((faq, faqIdx) => (
                <div key={faqIdx} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Ready to create your QR code?
          </h2>
          <p className="text-blue-700 mb-6">
            Start generating custom QR codes for your specific needs with our
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

const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of QR codes can I create?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can create QR codes for URLs, plain text, WiFi networks, email addresses, phone numbers, and SMS messages. Each type is optimized for its specific use case.",
        },
      },
      {
        "@type": "Question",
        name: "Is this QR code generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our QR code generator is completely free to use. You can create unlimited QR codes with custom designs and download them in PNG or SVG format without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "What's the best format to download my QR code in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend SVG format for print materials as it's scalable without losing quality. For digital use, PNG format works well and is widely compatible.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Frequently Asked Questions About QR Codes"
        description="Find answers to common questions about QR codes, including types of QR codes, usage tips, and best practices for creating and scanning QR codes."
        canonicalUrl="/faq"
        schema={faqSchema}
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
      <FAQHero />
      <FAQContent />
      <Footer />
    </div>
  );
};

export default FAQPage;
