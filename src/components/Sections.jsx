import React from "react";
import { QrCode, Palette, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Palette className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Customizable Design</h3>
          <p className="text-gray-600">
            Choose from various styles, colors, and patterns to match your
            brand.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
          <p className="text-gray-600">
            Download your QR codes in PNG or SVG format for any use case.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
          <p className="text-gray-600">
            Share your QR codes directly or download them for later use.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="relative">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <span className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <h3 className="text-xl font-semibold mb-2">Choose Content Type</h3>
            <p className="text-gray-600">
              Select the type of content you want to encode in your QR code.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <span className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <h3 className="text-xl font-semibold mb-2">Customize Design</h3>
            <p className="text-gray-600">
              Personalize your QR code with colors, patterns, and frames.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <span className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <h3 className="text-xl font-semibold mb-2">Download & Share</h3>
            <p className="text-gray-600">
              Get your QR code in your preferred format and start sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const FAQ = () => (
  <section id="faq" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            What types of QR codes can I create?
          </h3>
          <p className="text-gray-600">
            You can create QR codes for URLs, plain text, email addresses, phone
            numbers, SMS messages, and WiFi networks.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Are the QR codes free to use?
          </h3>
          <p className="text-gray-600">
            Yes, all QR codes generated are completely free to use for both
            personal and commercial purposes.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            What's the best format to download?
          </h3>
          <p className="text-gray-600">
            PNG is best for digital use, while SVG is ideal for print materials
            as it can be scaled without losing quality.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center mb-4">
            <QrCode className="w-8 h-8 text-blue-400 mr-3" />
            <span className="text-xl font-bold">QR Code Generator</span>
          </div>
          <p className="text-gray-400 mb-4">
            Create beautiful, customizable QR codes for your business or
            personal use. Free, fast, and no sign-up required.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#features" className="text-gray-400 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-gray-400 hover:text-white"
              >
                How It Works
              </a>
            </li>
            <li>
              <Link to="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
            Legal
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} QR Code Generator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
