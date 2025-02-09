import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  Share2,
  Download,
  QrCode,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  Globe,
  Type,
  Lock,
  User,
  MessageCircle,
  Palette,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Printer,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeStyling from "qr-code-styling";
import html2canvas from "html2canvas";
import { Features, HowItWorks, FAQ, Footer } from "./components/Sections";
import SEO from "./components/SEO";
import FAQPage from "./pages/FAQ";

// Form Components for each QR type
const TextForm = ({ value, onChange }) => (
  <div className="space-y-4">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your text message..."
      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
    />
  </div>
);

const URLForm = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (url) => {
    setIsValid(url === "" || validateURL(url));
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <input
        type="url"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="https://example.com"
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          !isValid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {!isValid && (
        <p className="text-sm text-red-500">Please enter a valid URL</p>
      )}
    </div>
  );
};

const EmailForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `mailto:${newData.email}${
        newData.subject ? "?subject=" + encodeURIComponent(newData.subject) : ""
      }${newData.body ? "&body=" + encodeURIComponent(newData.body) : ""}`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="recipient@example.com"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject (optional)
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Email subject"
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optional)
        </label>
        <textarea
          value={formData.body}
          onChange={(e) => handleChange("body", e.target.value)}
          placeholder="Email body"
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
        />
      </div>
    </div>
  );
};

const PhoneForm = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (phone) => {
    setIsValid(phone === "" || validatePhone(phone));
    onChange(phone);
  };

  return (
    <div className="space-y-2">
      <input
        type="tel"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="+1 (234) 567-8900"
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          !isValid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {!isValid && (
        <p className="text-sm text-red-500">
          Please enter a valid phone number
        </p>
      )}
    </div>
  );
};

const SMSForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `sms:${newData.phone}${
        newData.message ? "?body=" + encodeURIComponent(newData.message) : ""
      }`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (234) 567-8900"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optional)
        </label>
        <div className="relative">
          <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Enter your message"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

const WiFiForm = ({ value, onChange }) => {
  const [formData, setFormData] = useState({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(
      `WIFI:T:${newData.encryption};S:${newData.ssid};P:${newData.password};H:${
        newData.hidden ? "true" : "false"
      };;`
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Network Name (SSID)
        </label>
        <div className="relative">
          <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.ssid}
            onChange={(e) => handleChange("ssid", e.target.value)}
            placeholder="WiFi network name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="WiFi password"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Encryption Type
        </label>
        <select
          value={formData.encryption}
          onChange={(e) => handleChange("encryption", e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hidden-network"
          checked={formData.hidden}
          onChange={(e) => handleChange("hidden", e.target.checked)}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="hidden-network"
          className="ml-2 block text-sm text-gray-700"
        >
          Hidden Network
        </label>
      </div>
    </div>
  );
};

const QRStyleOptions = {
  dots: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
    { value: "rounded", label: "Rounded", icon: Square },
    { value: "classy", label: "Classy", icon: Triangle },
    { value: "classy-rounded", label: "Classy Rounded", icon: Hexagon },
  ],
  cornerSquares: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
    { value: "extra-rounded", label: "Extra Rounded", icon: Circle },
  ],
  cornerDots: [
    { value: "square", label: "Square", icon: Square },
    { value: "dots", label: "Dots", icon: Circle },
  ],
};

const ColorPicker = ({ label, color, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 rounded cursor-pointer"
      />
      <input
        type="text"
        value={color.toUpperCase()}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md"
        placeholder="#000000"
      />
    </div>
  </div>
);

const QRPresets = [
  {
    id: "classic",
    name: "Classic",
    style: {
      type: "square",
      dotsOptions: { type: "square", color: "#000000" },
      cornerSquareOptions: { type: "square", color: "#000000" },
      cornerDotOptions: { type: "square", color: "#000000" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: false,
        text: "Scan me",
        color: "#000000",
        textColor: "#FFFFFF",
        font: "Inter",
        pattern: "solid",
      },
    },
  },
  {
    id: "double-frame",
    name: "Double Frame",
    style: {
      type: "square",
      dotsOptions: { type: "dots", color: "#1F2937" },
      cornerSquareOptions: { type: "extra-rounded", color: "#1F2937" },
      cornerDotOptions: { type: "dot", color: "#1F2937" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: false,
        text: "Scan to explore",
        color: "#1F2937",
        textColor: "#FFFFFF",
        font: "Poppins",
        pattern: "double",
      },
    },
  },
  {
    id: "dashed-elegant",
    name: "Dashed Elegant",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#4F46E5" },
      cornerSquareOptions: { type: "extra-rounded", color: "#4F46E5" },
      cornerDotOptions: { type: "dot", color: "#4F46E5" },
      backgroundColor: "#F3F4F6",
      frame: {
        enabled: false,
        text: "Scan for more",
        color: "#4F46E5",
        textColor: "#FFFFFF",
        font: "Inter",
        pattern: "dashed",
      },
    },
  },
  {
    id: "dotted-modern",
    name: "Dotted Modern",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#059669" },
      cornerSquareOptions: { type: "extra-rounded", color: "#059669" },
      cornerDotOptions: { type: "dot", color: "#059669" },
      backgroundColor: "#ECFDF5",
      frame: {
        enabled: false,
        text: "Scan to begin",
        color: "#059669",
        textColor: "#FFFFFF",
        font: "system-ui",
        pattern: "dotted",
      },
    },
  },
  {
    id: "gradient-frame",
    name: "Gradient Frame",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#8B5CF6" },
      cornerSquareOptions: { type: "extra-rounded", color: "#8B5CF6" },
      cornerDotOptions: { type: "dot", color: "#8B5CF6" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: false,
        text: "Scan to discover",
        color: "#8B5CF6",
        textColor: "#FFFFFF",
        font: "Poppins",
        pattern: "gradient",
      },
    },
  },
  {
    id: "colorful",
    name: "Colorful",
    style: {
      type: "square",
      dotsOptions: { type: "dots", color: "#FF3B30" },
      cornerSquareOptions: { type: "extra-rounded", color: "#5856D6" },
      cornerDotOptions: { type: "dot", color: "#007AFF" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: false,
        text: "Scan to explore",
        color: "#5856D6",
        textColor: "#FFFFFF",
        font: "Poppins",
      },
    },
  },
  {
    id: "modern",
    name: "Modern",
    style: {
      type: "rounded",
      dotsOptions: { type: "dots", color: "#4F46E5" },
      cornerSquareOptions: { type: "extra-rounded", color: "#4F46E5" },
      cornerDotOptions: { type: "dot", color: "#4F46E5" },
      backgroundColor: "#F3F4F6",
      frame: {
        enabled: false,
        text: "Scan for more",
        color: "#4F46E5",
        textColor: "#FFFFFF",
        font: "Inter",
      },
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#1F2937" },
      cornerSquareOptions: { type: "extra-rounded", color: "#1F2937" },
      cornerDotOptions: { type: "dot", color: "#1F2937" },
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#6B7280" },
      cornerSquareOptions: { type: "dot", color: "#6B7280" },
      cornerDotOptions: { type: "dot", color: "#6B7280" },
      backgroundColor: "#F9FAFB",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    style: {
      type: "classy",
      dotsOptions: { type: "classy", color: "#0369A1" },
      cornerSquareOptions: { type: "extra-rounded", color: "#0284C7" },
      cornerDotOptions: { type: "dot", color: "#0EA5E9" },
      backgroundColor: "#F0F9FF",
    },
  },
  {
    id: "gradient",
    name: "Gradient",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#6366F1" },
      cornerSquareOptions: { type: "extra-rounded", color: "#8B5CF6" },
      cornerDotOptions: { type: "dot", color: "#EC4899" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: false,
        text: "Scan to discover",
        color: "#8B5CF6",
        textColor: "#FFFFFF",
        font: "Poppins",
      },
    },
  },
  {
    id: "nature",
    name: "Nature",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#059669" },
      cornerSquareOptions: { type: "extra-rounded", color: "#047857" },
      cornerDotOptions: { type: "dot", color: "#065F46" },
      backgroundColor: "#ECFDF5",
      frame: {
        enabled: true,
        text: "Scan me",
        color: "#047857",
        textColor: "#FFFFFF",
        font: "system-ui",
      },
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#F59E0B" },
      cornerSquareOptions: { type: "extra-rounded", color: "#D97706" },
      cornerDotOptions: { type: "dot", color: "#B45309" },
      backgroundColor: "#FFFBEB",
      frame: {
        enabled: true,
        text: "Scan to begin",
        color: "#D97706",
        textColor: "#FFFFFF",
        font: "Roboto",
      },
    },
  },
  {
    id: "dark",
    name: "Dark Mode",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#E5E7EB" },
      cornerSquareOptions: { type: "extra-rounded", color: "#F3F4F6" },
      cornerDotOptions: { type: "dot", color: "#F9FAFB" },
      backgroundColor: "#111827",
      frame: {
        enabled: true,
        text: "Scan QR Code",
        color: "#F3F4F6",
        textColor: "#111827",
        font: "Inter",
      },
    },
  },
  {
    id: "bordered-classic",
    name: "Bordered Classic",
    style: {
      type: "square",
      dotsOptions: { type: "square", color: "#000000" },
      cornerSquareOptions: { type: "square", color: "#000000" },
      cornerDotOptions: { type: "square", color: "#000000" },
      backgroundColor: "#FFFFFF",
      markerBorderOptions: { color: "#000000", width: 4, style: "double" },
      markerCenterOptions: { color: "#000000", type: "extra-rounded" },
    },
  },
  {
    id: "dotted-elegant",
    name: "Dotted Elegant",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#4A5568" },
      cornerSquareOptions: { type: "extra-rounded", color: "#2D3748" },
      cornerDotOptions: { type: "dot", color: "#1A202C" },
      backgroundColor: "#FFFFFF",
      markerBorderOptions: { color: "#2D3748", width: 2, style: "dotted" },
      markerCenterOptions: { color: "#4A5568", type: "circle" },
    },
  },
  {
    id: "dashed-modern",
    name: "Dashed Modern",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#3B82F6" },
      cornerSquareOptions: { type: "extra-rounded", color: "#2563EB" },
      cornerDotOptions: { type: "dot", color: "#1D4ED8" },
      backgroundColor: "#EFF6FF",
      markerBorderOptions: { color: "#2563EB", width: 3, style: "dashed" },
      markerCenterOptions: { color: "#3B82F6", type: "diamond" },
    },
  },
  {
    id: "fancy-borders",
    name: "Fancy Borders",
    style: {
      type: "classy-rounded",
      dotsOptions: { type: "classy-rounded", color: "#8B5CF6" },
      cornerSquareOptions: { type: "extra-rounded", color: "#7C3AED" },
      cornerDotOptions: { type: "dot", color: "#6D28D9" },
      backgroundColor: "#F5F3FF",
      markerBorderOptions: { color: "#7C3AED", width: 3, style: "double" },
      markerCenterOptions: { color: "#8B5CF6", type: "circle" },
    },
  },
  {
    id: "frame-classic",
    name: "Classic Frame",
    style: {
      type: "square",
      dotsOptions: { type: "square", color: "#000000" },
      cornerSquareOptions: { type: "square", color: "#000000" },
      cornerDotOptions: { type: "square", color: "#000000" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: true,
        text: "Scan me",
        color: "#000000",
        textColor: "#000000",
        font: "Inter",
      },
    },
  },
  {
    id: "frame-modern",
    name: "Modern Frame",
    style: {
      type: "dots",
      dotsOptions: { type: "dots", color: "#4F46E5" },
      cornerSquareOptions: { type: "extra-rounded", color: "#4F46E5" },
      cornerDotOptions: { type: "dot", color: "#4F46E5" },
      backgroundColor: "#F3F4F6",
      frame: {
        enabled: true,
        text: "Scan to learn more",
        color: "#4F46E5",
        textColor: "#FFFFFF",
        font: "Poppins",
      },
    },
  },
  {
    id: "frame-minimal",
    name: "Minimal Frame",
    style: {
      type: "rounded",
      dotsOptions: { type: "rounded", color: "#374151" },
      cornerSquareOptions: { type: "extra-rounded", color: "#374151" },
      cornerDotOptions: { type: "dot", color: "#374151" },
      backgroundColor: "#FFFFFF",
      frame: {
        enabled: true,
        text: "Scan QR Code",
        color: "#F3F4F6",
        textColor: "#374151",
        font: "system-ui",
      },
    },
  },
];

const StyleOption = ({ selected, onClick, children, style }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg border-2 transition-all ${
      selected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:border-gray-300"
    }`}
    style={style}
  >
    {children}
  </button>
);

const StyleGrid = ({ options, value, onChange, color }) => (
  <div className="grid grid-cols-4 gap-2">
    {options.map((option) => {
      const Icon = option.icon;
      const isSelected = value === option.value;

      return (
        <StyleOption
          key={option.value}
          selected={isSelected}
          onClick={() => onChange(option.value)}
          style={{ backgroundColor: isSelected ? "#EBF5FF" : undefined }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 flex items-center justify-center mb-1"
              style={{ color: color }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {option.label}
            </span>
          </div>
        </StyleOption>
      );
    })}
  </div>
);

const PatternPreview = ({ type, color, size = 32 }) => (
  <div
    className="border rounded"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius:
        type === "dots"
          ? "50%"
          : type === "rounded"
          ? "25%"
          : type === "classy"
          ? "15%"
          : type === "classy-rounded"
          ? "40%"
          : "0",
    }}
  />
);

const FramePatternPreview = ({ pattern, color, selected, onClick }) => {
  const previewStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    position: "relative",
  };

  const frameStyle = {
    position: "absolute",
    inset: "4px",
    backgroundColor: "#FFFFFF",
  };

  switch (pattern) {
    case "double":
      frameStyle.border = `2px double ${color}`;
      frameStyle.boxShadow = `0 0 0 4px ${color}`;
      break;
    case "dashed":
      frameStyle.border = `2px dashed ${color}`;
      frameStyle.boxShadow = `0 0 0 4px ${color}`;
      break;
    case "dotted":
      frameStyle.border = `2px dotted ${color}`;
      frameStyle.boxShadow = `0 0 0 4px ${color}`;
      break;
    case "gradient":
      frameStyle.border = `4px solid ${color}`;
      frameStyle.background = `linear-gradient(45deg, ${color}22, transparent)`;
      break;
    default:
      frameStyle.border = `4px solid ${color}`;
  }

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 relative mb-1">
          <div style={previewStyle}>
            <div style={frameStyle} className="rounded-lg" />
          </div>
        </div>
        <span className="text-xs font-medium text-gray-700 capitalize">
          {pattern}
        </span>
      </div>
    </button>
  );
};

const CustomStyleForm = ({ style, onChange }) => {
  const [sectionsOpen, setSectionsOpen] = useState({
    colors: true,
    patterns: true,
    frame: true,
  });

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNestedChange = (section, key, value) => {
    const newStyle = { ...style };

    // Handle special cases for corner options
    if (section === "cornerSquareOptions") {
      newStyle.cornersSquareOptions = {
        ...newStyle.cornersSquareOptions,
        [key]: value,
      };
      // Also update the cornerSquareOptions for backward compatibility
      newStyle.cornerSquareOptions = {
        ...newStyle.cornerSquareOptions,
        [key]: value,
      };
    } else if (section === "cornerDotOptions") {
      newStyle.cornersDotOptions = {
        ...newStyle.cornersDotOptions,
        [key]: value,
      };
      // Also update the cornerDotOptions for backward compatibility
      newStyle.cornerDotOptions = {
        ...newStyle.cornerDotOptions,
        [key]: value,
      };
    } else if (section === "backgroundColor") {
      newStyle.backgroundOptions = {
        ...newStyle.backgroundOptions,
        color: value,
      };
      newStyle.backgroundColor = value;
    } else {
      newStyle[section] = {
        ...newStyle[section],
        [key]: value,
      };
    }

    onChange(newStyle);
  };

  const handleFrameChange = (key, value) => {
    const newStyle = { ...style };
    newStyle.frame = {
      ...newStyle.frame,
      [key]: value,
    };
    onChange(newStyle);
  };

  return (
    <div className="space-y-6">
      {/* Colors Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("colors")}
          className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        >
          <h3 className="text-sm font-medium text-gray-700">Colors</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              sectionsOpen.colors ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {sectionsOpen.colors && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                label="Background"
                color={style.backgroundColor}
                onChange={(color) =>
                  handleNestedChange("backgroundColor", "color", color)
                }
              />
              <ColorPicker
                label="Dots"
                color={style.dotsOptions.color}
                onChange={(color) =>
                  handleNestedChange("dotsOptions", "color", color)
                }
              />
              <ColorPicker
                label="Corner Squares"
                color={style.cornerSquareOptions.color}
                onChange={(color) =>
                  handleNestedChange("cornerSquareOptions", "color", color)
                }
              />
              <ColorPicker
                label="Corner Dots"
                color={style.cornerDotOptions.color}
                onChange={(color) =>
                  handleNestedChange("cornerDotOptions", "color", color)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Patterns Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("patterns")}
          className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        >
          <h3 className="text-sm font-medium text-gray-700">Patterns</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              sectionsOpen.patterns ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {sectionsOpen.patterns && (
          <div className="p-4 space-y-6">
            {/* Dots Style */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Dots Style
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { type: "square", label: "Square" },
                  { type: "dots", label: "Dots" },
                  { type: "rounded", label: "Rounded" },
                  { type: "classy", label: "Classy" },
                  { type: "classy-rounded", label: "Classy Rounded" },
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() =>
                      handleNestedChange("dotsOptions", "type", option.type)
                    }
                    className={`p-2 rounded-lg border-2 transition-all ${
                      style.dotsOptions.type === option.type
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <PatternPreview
                        type={option.type}
                        color={style.dotsOptions.color}
                      />
                      <span className="text-xs font-medium text-gray-700 mt-1">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Squares Style */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Corner Squares Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: "square", label: "Square" },
                  { type: "dot", label: "Dots" },
                  { type: "extra-rounded", label: "Extra Rounded" },
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() =>
                      handleNestedChange(
                        "cornerSquareOptions",
                        "type",
                        option.type
                      )
                    }
                    className={`p-2 rounded-lg border-2 transition-all ${
                      style.cornerSquareOptions.type === option.type
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <PatternPreview
                        type={option.type}
                        color={style.cornerSquareOptions.color}
                        size={40}
                      />
                      <span className="text-xs font-medium text-gray-700 mt-1">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Frame Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection("frame")}
          className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        >
          <h3 className="text-sm font-medium text-gray-700">Frame</h3>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              sectionsOpen.frame ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {sectionsOpen.frame && (
          <div className="p-4 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="frame-enabled"
                checked={style.frame?.enabled || false}
                onChange={(e) => handleFrameChange("enabled", e.target.checked)}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="frame-enabled"
                className="ml-2 block text-sm text-gray-700"
              >
                Enable Frame
              </label>
            </div>

            {style.frame?.enabled && (
              <>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Frame Pattern
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {["solid", "double", "dashed", "dotted", "gradient"].map(
                      (pattern) => (
                        <FramePatternPreview
                          key={pattern}
                          pattern={pattern}
                          color={style.frame?.color || "#000000"}
                          selected={style.frame?.pattern === pattern}
                          onClick={() => handleFrameChange("pattern", pattern)}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Frame Text
                  </label>
                  <input
                    type="text"
                    value={style.frame?.text || ""}
                    onChange={(e) => handleFrameChange("text", e.target.value)}
                    placeholder="Enter frame text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker
                    label="Frame Color"
                    color={style.frame?.color || "#000000"}
                    onChange={(color) => handleFrameChange("color", color)}
                  />
                  <ColorPicker
                    label="Text Color"
                    color={style.frame?.textColor || "#000000"}
                    onChange={(color) => handleFrameChange("textColor", color)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Font Family
                  </label>
                  <select
                    value={style.frame?.font || "system-ui"}
                    onChange={(e) => handleFrameChange("font", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="system-ui">System UI</option>
                    <option value="Inter">Inter</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const QRGenerator = ({ defaultType }) => {
  const [qrData, setQrData] = useState("");
  const [debouncedQrData, setDebouncedQrData] = useState("");
  const [qrType, setQrType] = useState(defaultType || "text");
  const [selectedPreset, setSelectedPreset] = useState("classic");
  const [qrStyle, setQrStyle] = useState(QRPresets[0].style);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({
    qrSettings: true,
    styleOptions: false,
    customOptions: false,
  });
  const qrRef = useRef(null);
  const qrCodeRef = useRef(null);
  const debounceTimeout = useRef(null);
  const downloadMenuRef = useRef(null);

  // Debounce the QR data updates
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Only generate QR code if data is not empty and has minimum length based on type
    const shouldGenerateQR = () => {
      switch (qrType) {
        case "url":
          return qrData.length >= 4; // At least "http"
        case "email":
          return qrData.includes("@");
        case "tel":
          return qrData.length >= 6; // Minimum phone number length
        case "wifi":
          return qrData.includes("WIFI:") && qrData.includes(";;");
        default:
          return qrData.length > 0;
      }
    };

    if (shouldGenerateQR()) {
      debounceTimeout.current = setTimeout(() => {
        setDebouncedQrData(qrData);
      }, 500); // 500ms delay
    } else {
      setDebouncedQrData("");
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [qrData, qrType]);

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.remove();
    }

    if (debouncedQrData) {
      const qr = new QRCodeStyling({
        width: 300,
        height: 300,
        data: debouncedQrData,
        margin: 10,
        qrOptions: {
          errorCorrectionLevel: "Q",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
        type: qrStyle.type || "square",
        dotsOptions: {
          type: qrStyle.dotsOptions?.type || "square",
          color: qrStyle.dotsOptions?.color || "#000000",
        },
        cornersSquareOptions: {
          type: qrStyle.cornerSquareOptions?.type || "square",
          color: qrStyle.cornerSquareOptions?.color || "#000000",
        },
        cornersDotOptions: {
          type: qrStyle.cornerDotOptions?.type || "square",
          color: qrStyle.cornerDotOptions?.color || "#000000",
        },
        backgroundOptions: {
          color: qrStyle.backgroundColor || "#FFFFFF",
        },
      });

      // Clear previous content
      while (qrRef.current.firstChild) {
        qrRef.current.removeChild(qrRef.current.firstChild);
      }

      // Create main container
      const container = document.createElement("div");
      container.className = "relative w-full aspect-square";
      qrRef.current.appendChild(container);

      // Create QR wrapper with frame if enabled
      const qrWrapper = document.createElement("div");
      qrWrapper.className = "w-full h-full flex items-center justify-center";

      if (qrStyle.frame?.enabled) {
        qrWrapper.style.padding = "24px";
        qrWrapper.style.border = `8px solid ${
          qrStyle.frame.color || "#000000"
        }`;
        qrWrapper.style.borderRadius = "16px";

        // Add frame text if provided
        if (qrStyle.frame.text) {
          const textElement = document.createElement("div");
          textElement.className =
            "absolute left-1/2 transform -translate-x-1/2 bottom-[-36px]";
          textElement.style.backgroundColor = qrStyle.frame.color || "#000000";
          textElement.style.color = qrStyle.frame.textColor || "#FFFFFF";
          textElement.style.padding = "8px 24px";
          textElement.style.borderRadius = "24px";
          textElement.style.fontSize = "16px";
          textElement.style.fontWeight = "500";
          textElement.style.whiteSpace = "nowrap";
          textElement.style.fontFamily = qrStyle.frame.font || "system-ui";
          textElement.textContent = qrStyle.frame.text;
          container.appendChild(textElement);
        }
      }

      container.appendChild(qrWrapper);
      qr.append(qrWrapper);
      qrCodeRef.current = qrWrapper.querySelector("canvas");
    }
  }, [debouncedQrData, qrStyle]);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(event.target)
      ) {
        setIsDownloadOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const downloadQR = (format = "png") => {
    if (!qrRef.current) return;

    const link = document.createElement("a");
    const filename = `qr-code-${qrType}`;

    if (format === "png") {
      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "fixed";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.width = "400px";
      tempContainer.style.height = "400px";
      tempContainer.style.backgroundColor = qrStyle.backgroundColor;
      tempContainer.style.padding = "20px";
      tempContainer.style.zIndex = "-1";

      // Clone the QR container and its contents
      const qrContainer = qrRef.current.cloneNode(true);
      qrContainer.style.width = "100%";
      qrContainer.style.height = "100%";
      qrContainer.style.opacity = "1";
      qrContainer.style.visibility = "visible";

      // Ensure all child elements are visible
      qrContainer.querySelectorAll("*").forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });

      tempContainer.appendChild(qrContainer);
      document.body.appendChild(tempContainer);

      // Add a small delay to ensure proper rendering
      setTimeout(() => {
        html2canvas(tempContainer, {
          backgroundColor: qrStyle.backgroundColor,
          scale: 2,
          logging: false,
          width: 400,
          height: 400,
          useCORS: true,
          allowTaint: true,
          onclone: (clonedDoc) => {
            const clonedContainer = clonedDoc.querySelector("div");
            if (clonedContainer) {
              clonedContainer.style.opacity = "1";
              clonedContainer.style.visibility = "visible";
              // Ensure all elements in the clone are visible
              clonedContainer.querySelectorAll("*").forEach((el) => {
                el.style.opacity = "1";
                el.style.visibility = "visible";
              });
            }
          },
        }).then((canvas) => {
          link.download = `${filename}.png`;
          link.href = canvas.toDataURL("image/png");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          document.body.removeChild(tempContainer);
        });
      }, 100); // Small delay to ensure rendering
    } else if (format === "svg") {
      const svgElement = qrRef.current.querySelector("svg");
      if (svgElement) {
        const svgContainer = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgContainer.setAttribute("width", "400");
        svgContainer.setAttribute("height", "400");
        svgContainer.setAttribute("viewBox", "0 0 400 400");

        // Create background
        const background = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        background.setAttribute("width", "100%");
        background.setAttribute("height", "100%");
        background.setAttribute("fill", qrStyle.backgroundColor);
        svgContainer.appendChild(background);

        // Create a group for the QR code and frame
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        group.setAttribute("transform", "translate(50, 50)");

        if (qrStyle.frame?.enabled) {
          const frameColor = qrStyle.frame.color || "#000000";

          // Add frame
          const frame = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          frame.setAttribute("width", "300");
          frame.setAttribute("height", "300");
          frame.setAttribute("fill", "none");
          frame.setAttribute("stroke", frameColor);
          frame.setAttribute("stroke-width", "16");
          frame.setAttribute("rx", "16");
          group.appendChild(frame);

          // Add frame text if present
          if (qrStyle.frame.text) {
            const textGroup = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g"
            );
            textGroup.setAttribute("transform", "translate(150, 340)");

            // Calculate text width for background pill
            const textWidth = qrStyle.frame.text.length * 10 + 40; // Approximate width based on text length
            const pillWidth = Math.max(textWidth, 120);
            const pillHeight = 36;

            // Add text background pill
            const textBg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            textBg.setAttribute("x", -pillWidth / 2);
            textBg.setAttribute("y", -pillHeight / 2);
            textBg.setAttribute("width", pillWidth);
            textBg.setAttribute("height", pillHeight);
            textBg.setAttribute("rx", pillHeight / 2);
            textBg.setAttribute("fill", frameColor);
            textGroup.appendChild(textBg);

            // Add text
            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", qrStyle.frame.textColor || "#FFFFFF");
            text.setAttribute("font-family", qrStyle.frame.font || "system-ui");
            text.setAttribute("font-size", "16");
            text.setAttribute("font-weight", "500");
            text.textContent = qrStyle.frame.text;
            textGroup.appendChild(text);
            group.appendChild(textGroup);
          }
        }

        // Add QR code
        const qrClone = svgElement.cloneNode(true);
        qrClone.setAttribute("width", "300");
        qrClone.setAttribute("height", "300");
        qrClone.setAttribute("x", "0");
        qrClone.setAttribute("y", "0");
        group.appendChild(qrClone);
        svgContainer.appendChild(group);

        const svgData = new XMLSerializer().serializeToString(svgContainer);
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        link.href = URL.createObjectURL(svgBlob);
        link.download = `${filename}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
    }
  };

  const printQR = () => {
    const printWindow = window.open("", "_blank");
    const qrCode = qrRef.current.cloneNode(true);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 20px;
              box-sizing: border-box;
              background-color: ${qrStyle.backgroundColor};
            }
            .qr-container {
              text-align: center;
              position: relative;
              width: 500px;
              padding: 20px;
            }
            .qr-code {
              width: 100%;
              position: relative;
            }
            .qr-info {
              font-family: system-ui, -apple-system, sans-serif;
              color: #374151;
              margin-top: 48px;
            }
            .frame-text {
              position: absolute;
              left: 50%;
              bottom: -36px;
              transform: translateX(-50%);
              background-color: ${qrStyle.frame?.color || "#000000"};
              color: ${qrStyle.frame?.textColor || "#FFFFFF"};
              padding: 8px 24px;
              border-radius: 24px;
              font-size: 16px;
              font-weight: 500;
              white-space: nowrap;
              font-family: ${qrStyle.frame?.font || "system-ui"};
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="qr-code">${qrCode.innerHTML}</div>
            <div class="qr-info">
              <p style="font-size: 18px; font-weight: 500; margin: 0;">Scan this QR code</p>
              ${
                qrType === "url"
                  ? `<p style="color: #6B7280; margin: 4px 0 0 0;">${qrData}</p>`
                  : ""
              }
            </div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const shareQR = async () => {
    if (qrCodeRef.current && navigator.share) {
      try {
        const blob = await new Promise((resolve) =>
          qrCodeRef.current.toBlob(resolve)
        );
        const file = new File([blob], `qr-code-${qrType}.png`, {
          type: "image/png",
        });
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR code!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handlePresetChange = (presetId) => {
    const preset = QRPresets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setQrStyle({
        ...preset.style,
        dotsOptions: { ...preset.style.dotsOptions },
        cornerSquareOptions: { ...preset.style.cornerSquareOptions },
        cornerDotOptions: { ...preset.style.cornerDotOptions },
        markerBorderOptions: preset.style.markerBorderOptions || {
          color: "#000000",
          width: 2,
          style: "solid",
        },
        markerCenterOptions: preset.style.markerCenterOptions || {
          color: "#000000",
          type: "square",
        },
      });

      // Force QR code update with new style
      if (qrCodeRef.current) {
        const qr = new QRCodeStyling({
          width: 300,
          height: 300,
          data: debouncedQrData,
          margin: 10,
          qrOptions: {
            errorCorrectionLevel: "Q",
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
          },
          ...preset.style,
          cornersSquareOptions: preset.style.cornerSquareOptions,
          cornersDotOptions: preset.style.cornerDotOptions,
          backgroundOptions: {
            color: preset.style.backgroundColor,
          },
        });

        // Clear previous content
        while (qrRef.current.firstChild) {
          qrRef.current.removeChild(qrRef.current.firstChild);
        }

        qr.append(qrRef.current);
        qrCodeRef.current = qrRef.current.querySelector("canvas");
      }
    }
  };

  const qrTypes = [
    {
      value: "text",
      label: "Text",
      icon: Type,
      component: TextForm,
    },
    {
      value: "url",
      label: "URL",
      icon: Globe,
      component: URLForm,
    },
    {
      value: "email",
      label: "Email",
      icon: Mail,
      component: EmailForm,
    },
    {
      value: "tel",
      label: "Phone",
      icon: Phone,
      component: PhoneForm,
    },
    {
      value: "sms",
      label: "SMS",
      icon: MessageSquare,
      component: SMSForm,
    },
    {
      value: "wifi",
      label: "WiFi",
      icon: Wifi,
      component: WiFiForm,
    },
  ];

  const selectedType = qrTypes.find((type) => type.value === qrType);
  const FormComponent = selectedType?.component;

  const toggleSection = (section) => {
    setSectionsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Settings (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* QR Code Settings Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection("qrSettings")}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                QR Code Settings
              </h2>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  sectionsOpen.qrSettings ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {sectionsOpen.qrSettings && (
              <div className="p-6 border-t space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {qrTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => {
                            setQrType(type.value);
                            setQrData("");
                          }}
                          className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            qrType === type.value
                              ? "border-blue-500 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-2" />
                          <span className="text-sm font-medium">
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {selectedType?.label} Details
                  </label>
                  {FormComponent && (
                    <FormComponent value={qrData} onChange={setQrData} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Style Options Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection("styleOptions")}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-blue-500" />
                Style Options
              </h2>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  sectionsOpen.styleOptions ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {sectionsOpen.styleOptions && (
              <div className="p-6 border-t space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Preset Styles
                  </h3>
                  <PresetGrid
                    presets={QRPresets}
                    selectedPreset={selectedPreset}
                    onSelect={handlePresetChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Custom Style Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <button
              onClick={() => toggleSection("customOptions")}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Custom Style Options
              </h2>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  sectionsOpen.customOptions ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {sectionsOpen.customOptions && (
              <div className="p-6 border-t">
                <CustomStyleForm style={qrStyle} onChange={setQrStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - QR Preview (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Generated QR Code
            </h2>
            <div
              className={`flex justify-center items-center bg-gray-50 rounded-lg p-6 ${
                debouncedQrData ? "border-2 border-dashed border-gray-200" : ""
              }`}
              style={{ backgroundColor: qrStyle.backgroundColor }}
            >
              <div ref={qrRef} className="w-full max-w-[300px]">
                {!debouncedQrData && (
                  <div className="flex flex-col items-center text-gray-400">
                    <QrCode className="w-16 h-16 mb-2" />
                    <p>Enter content to generate QR code</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-12">
              <div className="relative inline-block" ref={downloadMenuRef}>
                <button
                  onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                  disabled={!debouncedQrData}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span>Download</span>
                </button>
                {debouncedQrData && isDownloadOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button
                      onClick={() => {
                        downloadQR("png");
                        setIsDownloadOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Download as PNG
                    </button>
                    <button
                      onClick={() => {
                        downloadQR("svg");
                        setIsDownloadOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Download as SVG
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={shareQR}
                disabled={!debouncedQrData || !navigator.share}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
              <button
                onClick={printQR}
                disabled={!debouncedQrData}
                className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Printer className="w-5 h-5 mr-2" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PresetGrid = ({ presets, selectedPreset, onSelect }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSelect(preset.id)}
          className={`p-1.5 rounded-lg border transition-all ${
            selectedPreset === preset.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div
            className="w-full aspect-square rounded-md mb-1 overflow-hidden"
            style={{
              backgroundColor: preset.style.backgroundColor,
              maxWidth: "48px",
              margin: "0 auto",
            }}
          >
            <div className="w-full h-full grid grid-cols-3 gap-0.5 p-0.5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[1px]"
                  style={{
                    backgroundColor:
                      i < 3
                        ? preset.style.cornerSquareOptions.color
                        : i === 4
                        ? preset.style.cornerDotOptions.color
                        : preset.style.dotsOptions.color,
                    borderRadius:
                      preset.style.dotsOptions.type === "dots" ? "50%" : "1px",
                  }}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] font-medium text-gray-700 truncate block text-center">
            {preset.name}
          </span>
        </button>
      ))}
    </div>
  );
};

const QRTypeHero = ({ title, description, type }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const element = document.getElementById("generator");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create QR Code Now
            </button>
            <Link
              to="/"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View All Types
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const QRTypeRoute = ({ type, title, description }) => {
  const typeSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    applicationCategory: "UtilityApplication",
    description: description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={title}
        description={description}
        canonicalUrl={`/generate-free-qr-code-for-${type}`}
        schema={typeSchema}
      />
      <Navigation />
      <QRTypeHero title={title} description={description} type={type} />
      <main className="py-10" id="generator">
        <QRGenerator defaultType={type} />
      </main>
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

// Split existing sections into components
const Navigation = () => (
  <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <Link to="/" className="flex items-center">
          <QrCode className="w-8 h-8 text-blue-500 mr-3" />
          <div className="text-xl font-bold text-gray-800">
            QR Code Generator
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/generate-free-qr-code-for-url"
            className="text-gray-600 hover:text-blue-500"
          >
            URL QR Code
          </Link>
          <Link
            to="/generate-free-qr-code-for-text"
            className="text-gray-600 hover:text-blue-500"
          >
            Text QR Code
          </Link>
          <Link
            to="/generate-free-qr-code-for-wifi"
            className="text-gray-600 hover:text-blue-500"
          >
            WiFi QR Code
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-blue-500">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const MainHero = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Create Beautiful QR Codes in Seconds
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Generate customizable QR codes for URLs, text, WiFi, and more. No
          sign-up required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#generator"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create QR Code
          </a>
          <a
            href="#features"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Generator",
    applicationCategory: "UtilityApplication",
    description:
      "Free online QR code generator. Create custom QR codes for URLs, text, WiFi, and more with our easy-to-use tool.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Multiple QR code types support",
      "Customizable design options",
      "Free to use",
      "No registration required",
      "High-quality downloads in PNG and SVG formats",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Free QR Code Generator: Create Custom QR Codes Online"
        description="Generate custom QR codes for URLs, text, WiFi, and more. Free online QR code generator with advanced customization options. No sign-up required."
        canonicalUrl="/"
        schema={homeSchema}
      />
      <Navigation />
      <MainHero />
      <main className="py-10" id="generator">
        <QRGenerator />
      </main>
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/generate-free-qr-code-for-url"
          element={
            <QRTypeRoute
              type="url"
              title="Generate Free QR Code for URL"
              description="Create a custom QR code for your website or any URL. Customize colors, add frames, and download in multiple formats."
            />
          }
        />
        <Route
          path="/generate-free-qr-code-for-text"
          element={
            <QRTypeRoute
              type="text"
              title="Generate Free QR Code for Text"
              description="Convert any text into a QR code. Perfect for messages, quotes, or any text content you want to share."
            />
          }
        />
        <Route
          path="/generate-free-qr-code-for-email"
          element={
            <QRTypeRoute
              type="email"
              title="Generate Free QR Code for Email"
              description="Create a QR code that opens email composition with pre-filled recipient, subject, and body text."
            />
          }
        />
        <Route
          path="/generate-free-qr-code-for-phone"
          element={
            <QRTypeRoute
              type="tel"
              title="Generate Free QR Code for Phone Number"
              description="Generate a QR code that instantly dials your phone number when scanned."
            />
          }
        />
        <Route
          path="/generate-free-qr-code-for-sms"
          element={
            <QRTypeRoute
              type="sms"
              title="Generate Free QR Code for SMS"
              description="Create a QR code that opens SMS composition with pre-filled message and recipient."
            />
          }
        />
        <Route
          path="/generate-free-qr-code-for-wifi"
          element={
            <QRTypeRoute
              type="wifi"
              title="Generate Free QR Code for WiFi"
              description="Share your WiFi network details securely with a QR code. Instant connection when scanned."
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
